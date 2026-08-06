"use client";

import { useEffect, useRef } from "react";

import {
  CONFIG,
  cameraPosition,
  detectTilesInRegions,
  filterUsableTiles,
  globalAngularVelocity,
  sampleCubeStates,
  uniqueRandomIndices,
} from "./hero-cube-motion";

const EDGE_COLORS = [
  0x60a5fa, 0x8b5cf6, 0x22d3ee, 0xa78bfa, 0x3b82f6, 0xc4b5fd,
];

export function HeroCubeAnimation() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    let cancelled = false;
    let cleanup = () => {};

    async function mount(stage: HTMLDivElement, canvas: HTMLCanvasElement) {
      try {
        const [THREE, { RoundedBoxGeometry }, atlas] = await Promise.all([
          import("three"),
          import("three/addons/geometries/RoundedBoxGeometry.js"),
          loadImage("/images/professions-atlas.webp"),
        ]);
        if (cancelled) return;

        const renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        });
        renderer.setClearColor(0x000000, 0);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.15;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
        const cameraRadius = 14.5;
        const root = new THREE.Group();
        root.rotation.set(0.28, -0.38, 0.08);
        scene.add(root);

        const atlasCanvas = document.createElement("canvas");
        atlasCanvas.width = atlas.naturalWidth;
        atlasCanvas.height = atlas.naturalHeight;
        const atlasContext = atlasCanvas.getContext("2d", {
          willReadFrequently: true,
        });
        if (!atlasContext) throw new Error("Canvas 2D unavailable");
        atlasContext.drawImage(atlas, 0, 0);
        const halfWidth = atlasCanvas.width / 2;
        const halfHeight = atlasCanvas.height / 2;
        const tiles = filterUsableTiles(
          detectTilesInRegions(
            atlasContext.getImageData(
              0,
              0,
              atlasCanvas.width,
              atlasCanvas.height,
            ).data,
            atlasCanvas.width,
            atlasCanvas.height,
            [
              { x: 0, y: 0, width: halfWidth, height: halfHeight },
              { x: halfWidth, y: 0, width: halfWidth, height: halfHeight },
              { x: 0, y: halfHeight, width: halfWidth, height: halfHeight },
              {
                x: halfWidth,
                y: halfHeight,
                width: halfWidth,
                height: halfHeight,
              },
            ],
            234,
          ),
        );
        const assignments = uniqueRandomIndices(tiles.length, 36);
        const geometries: import("three").BufferGeometry[] = [];
        const materials: import("three").Material[] = [];
        const textures: import("three").Texture[] = [];

        const bodyGeometry = new RoundedBoxGeometry(
          CONFIG.cubeSize,
          CONFIG.cubeSize,
          CONFIG.cubeSize,
          5,
          0.12,
        );
        const edgeGeometry = new THREE.EdgesGeometry(bodyGeometry, 25);
        geometries.push(bodyGeometry, edgeGeometry);

        const cubes = Array.from({ length: 6 }, (_, cubeIndex) => {
          const cube = new THREE.Group();
          const faceMaterials = Array.from({ length: 6 }, (_, faceIndex) => {
            const tile = tiles[assignments[cubeIndex * 6 + faceIndex]];
            const textureCanvas = document.createElement("canvas");
            textureCanvas.width = textureCanvas.height = 320;
            const context = textureCanvas.getContext("2d");
            if (!context) throw new Error("Texture canvas unavailable");
            const crop = Math.min(tile.width, tile.height) * 0.94;
            context.drawImage(
              atlas,
              tile.x + (tile.width - crop) / 2,
              tile.y + (tile.height - crop) / 2,
              crop,
              crop,
              0,
              0,
              320,
              320,
            );
            const texture = new THREE.CanvasTexture(textureCanvas);
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.anisotropy = Math.min(
              renderer.capabilities.getMaxAnisotropy(),
              8,
            );
            textures.push(texture);
            const material = new THREE.MeshPhysicalMaterial({
              map: texture,
              emissiveMap: texture,
              emissive: 0x93c5fd,
              emissiveIntensity: 0.09,
              metalness: 0.12,
              roughness: 0.34,
              clearcoat: 0.75,
              clearcoatRoughness: 0.18,
            });
            materials.push(material);
            return material;
          });
          cube.add(new THREE.Mesh(bodyGeometry, faceMaterials));
          const edgeMaterial = new THREE.LineBasicMaterial({
            color: EDGE_COLORS[cubeIndex],
            transparent: true,
            opacity: 0.72,
            blending: THREE.AdditiveBlending,
          });
          materials.push(edgeMaterial);
          cube.add(new THREE.LineSegments(edgeGeometry, edgeMaterial));
          root.add(cube);
          return cube;
        });

        scene.add(new THREE.HemisphereLight(0xbfd8ff, 0x080515, 2.2));
        (
          [
            [0x60a5fa, 18, [5, 6, 8]],
            [0x8b5cf6, 20, [-6, -2, 5]],
            [0x22d3ee, 13, [4, -5, 1]],
          ] as const
        ).forEach(([color, intensity, position]) => {
          const light = new THREE.PointLight(color, intensity, 20, 1.7);
          light.position.set(position[0], position[1], position[2]);
          scene.add(light);
        });

        const reducedMotion = matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        let animationFrame = 0;
        let elapsed = reducedMotion ? 2 : 0;
        let previousFrame = 0;
        let visible = true;
        let running = false;

        const renderFrame = (seconds: number, delta: number) => {
          sampleCubeStates(seconds).forEach((state, index) => {
            const cube = cubes[index];
            cube.position.set(...state.position);
            cube.rotation.set(0, 0, 0);
            cube.rotation[state.axis] = state.spin;
          });
          const velocity = globalAngularVelocity(seconds);
          root.rotation.x += velocity[0] * delta;
          root.rotation.y += velocity[1] * delta;
          root.rotation.z += velocity[2] * delta;
          camera.position.set(...cameraPosition(seconds, cameraRadius));
          camera.lookAt(0, 0, 0);
          renderer.render(scene, camera);
          stage.dataset.renderReady = "true";
        };

        const resize = () => {
          const { width, height } = stage.getBoundingClientRect();
          renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
          renderer.setSize(Math.max(width, 1), Math.max(height, 1), false);
          camera.aspect = Math.max(width, 1) / Math.max(height, 1);
          camera.updateProjectionMatrix();
          renderFrame(elapsed, 0);
        };
        const tick = (timestamp: number) => {
          if (!running) return;
          const delta = Math.min((timestamp - previousFrame) / 1000, 1 / 20);
          previousFrame = timestamp;
          elapsed += delta;
          renderFrame(elapsed, delta);
          animationFrame = requestAnimationFrame(tick);
        };
        const start = () => {
          if (reducedMotion || running || !visible || document.hidden) return;
          running = true;
          previousFrame = performance.now();
          animationFrame = requestAnimationFrame(tick);
        };
        const stop = () => {
          running = false;
          cancelAnimationFrame(animationFrame);
        };

        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(stage);
        const visibilityObserver = new IntersectionObserver(
          ([entry]) => {
            visible = entry.isIntersecting;
            if (visible) start();
            else stop();
          },
          { threshold: 0.05 },
        );
        visibilityObserver.observe(stage);
        const onVisibilityChange = () => (document.hidden ? stop() : start());
        document.addEventListener("visibilitychange", onVisibilityChange);
        resize();
        start();

        cleanup = () => {
          stop();
          resizeObserver.disconnect();
          visibilityObserver.disconnect();
          document.removeEventListener("visibilitychange", onVisibilityChange);
          textures.forEach((texture) => texture.dispose());
          materials.forEach((material) => material.dispose());
          geometries.forEach((geometry) => geometry.dispose());
          renderer.dispose();
        };
      } catch {
        stage.dataset.renderError = "true";
      }
    }

    void mount(stage, canvas);
    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className="hero-cube-stage"
      data-hero-cube-animation
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="hero-cube-canvas" />
    </div>
  );
}

function loadImage(source: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = source;
  });
}
