import assert from "node:assert/strict";
import test from "node:test";
import {
  CONFIG,
  cameraPosition,
  filterUsableTiles,
  globalAngularVelocity,
  sampleCubeStates,
  sampleMotion,
  uniqueRandomIndices,
} from "../src/features/hero/hero-cube-motion.ts";

const near = (actual, expected, epsilon = 1e-9) =>
  assert.ok(Math.abs(actual - expected) <= epsilon, `${actual} != ${expected}`);

test("six cubes share safe synchronized translation endpoints", () => {
  near(sampleMotion(0).distance, CONFIG.maxDistance);
  near(sampleMotion(CONFIG.cycleDuration / 2).distance, CONFIG.minDistance);

  const radius = (CONFIG.cubeSize * Math.sqrt(3)) / 2;
  for (let step = 0; step <= 240; step += 1) {
    const states = sampleCubeStates((step / 240) * CONFIG.cycleDuration);
    for (let first = 0; first < states.length; first += 1) {
      for (let second = first + 1; second < states.length; second += 1) {
        const delta = states[first].position.map(
          (value, axis) => value - states[second].position[axis],
        );
        assert.ok(Math.hypot(...delta) > radius * 2 + CONFIG.safetyGap);
      }
    }
  }
});

test("paired half-cycles add opposite quarter-turns", () => {
  const start = sampleCubeStates(0);
  const half = sampleCubeStates(CONFIG.cycleDuration / 2);
  for (let index = 0; index < 6; index += 2) {
    near(half[index].spin - start[index].spin, Math.PI / 2);
    near(half[index + 1].spin - start[index + 1].spin, -Math.PI / 2);
  }
});

test("camera radius stays fixed while assembly velocity changes smoothly", () => {
  const radius = 15.25;
  let previous = globalAngularVelocity(0);
  for (let step = 1; step <= 180; step += 1) {
    near(Math.hypot(...cameraPosition(step / 10, radius)), radius, 1e-8);
    const current = globalAngularVelocity(step / 60);
    current.forEach((value, axis) => {
      assert.ok(value > 0);
      assert.ok(Math.abs(value - previous[axis]) < 0.002);
    });
    previous = current;
  }
});

test("all 36 cube faces receive distinct atlas entries", () => {
  let seed = 19;
  const random = () => ((seed = (seed * 48271) % 2147483647) - 1) / 2147483646;
  const selection = uniqueRandomIndices(73, 36, random);
  assert.equal(selection.length, 36);
  assert.equal(new Set(selection).size, 36);
  assert.ok(selection.every((index) => index >= 0 && index < 73));
});

test("atlas selection excludes narrow and oversized crops", () => {
  const tiles = [
    { x: 0, y: 0, width: 47, height: 172 },
    { x: 0, y: 0, width: 361, height: 302 },
    { x: 0, y: 0, width: 126, height: 172 },
    { x: 0, y: 0, width: 184, height: 134 },
  ];

  assert.deepEqual(filterUsableTiles(tiles), tiles.slice(2));
});
