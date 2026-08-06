export const CONFIG = Object.freeze({
  cubeSize: 1.3,
  minDistance: 1.9,
  maxDistance: 3.45,
  safetyGap: 0.08,
  cycleDuration: 6,
  cameraSegmentDuration: 3,
});

type Axis = "x" | "y" | "z";
type Vec3 = [number, number, number];
export type Tile = { x: number; y: number; width: number; height: number };
export type Region = Tile;

const TAU = Math.PI * 2;
const AXES: Axis[] = ["x", "y", "z"];

export function sampleMotion(seconds: number, speed = 1) {
  const elapsed = seconds * speed;
  const wave = 0.5 + 0.5 * Math.cos((TAU * elapsed) / CONFIG.cycleDuration);
  return {
    distance:
      CONFIG.minDistance + (CONFIG.maxDistance - CONFIG.minDistance) * wave,
    turnProgress: elapsed / (CONFIG.cycleDuration / 2),
  };
}

export function sampleCubeStates(seconds: number, speed = 1) {
  const motion = sampleMotion(seconds, speed);
  return AXES.flatMap((axis, axisIndex) =>
    ([1, -1] as const).map((direction) => {
      const position: Vec3 = [0, 0, 0];
      position[axisIndex] = motion.distance * direction;
      return {
        axis,
        position,
        spin: motion.turnProgress * (Math.PI / 2) * direction,
      };
    }),
  );
}

export function globalAngularVelocity(seconds: number, speed = 1): Vec3 {
  return [
    0.105 + 0.035 * Math.sin(seconds * 0.41 + 0.2),
    0.09 + 0.03 * Math.sin(seconds * 0.31 + 2.1),
    0.075 + 0.025 * Math.sin(seconds * 0.23 + 4.4),
  ].map((value) => value * speed) as Vec3;
}

function hash(index: number) {
  const value = Math.sin((index + 17.31) * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function cameraWaypoint(index: number): Vec3 {
  const azimuth = index * 1.12 + (hash(index) - 0.5) * 0.72;
  const elevation = 0.22 + (hash(index + 91) - 0.5) * 0.7;
  const horizontal = Math.cos(elevation);
  return [
    horizontal * Math.cos(azimuth),
    Math.sin(elevation),
    horizontal * Math.sin(azimuth),
  ];
}

export function cameraPosition(seconds: number, radius: number): Vec3 {
  const segment = Math.floor(seconds / CONFIG.cameraSegmentDuration);
  const t = seconds / CONFIG.cameraSegmentDuration - segment;
  const points = [-1, 0, 1, 2].map((offset) =>
    cameraWaypoint(segment + offset),
  );
  const position = [0, 1, 2].map(
    (axis) =>
      0.5 *
      (2 * points[1][axis] +
        (-points[0][axis] + points[2][axis]) * t +
        (2 * points[0][axis] -
          5 * points[1][axis] +
          4 * points[2][axis] -
          points[3][axis]) *
          t ** 2 +
        (-points[0][axis] +
          3 * points[1][axis] -
          3 * points[2][axis] +
          points[3][axis]) *
          t ** 3),
  ) as Vec3;
  const length = Math.hypot(...position);
  return position.map((value) => (value / length) * radius) as Vec3;
}

const isWhite = (
  pixels: Uint8ClampedArray,
  offset: number,
  threshold: number,
) =>
  pixels[offset] >= threshold &&
  pixels[offset + 1] >= threshold &&
  pixels[offset + 2] >= threshold;

function contentRuns(separators: boolean[], origin: number, minSize: number) {
  const runs: [number, number][] = [];
  let start = -1;
  for (let index = 0; index <= separators.length; index += 1) {
    if (index < separators.length && !separators[index]) {
      if (start < 0) start = index;
    } else if (start >= 0) {
      if (index - start >= minSize) runs.push([origin + start, origin + index]);
      start = -1;
    }
  }
  return runs;
}

export function detectTiles(
  pixels: Uint8ClampedArray,
  imageWidth: number,
  imageHeight: number,
  region: Region = { x: 0, y: 0, width: imageWidth, height: imageHeight },
  threshold = 242,
  whiteRatio = 0.94,
  minSize = 36,
) {
  const horizontal = Array.from({ length: region.height }, (_, row) => {
    let white = 0;
    for (let x = region.x; x < region.x + region.width; x += 1) {
      if (isWhite(pixels, ((region.y + row) * imageWidth + x) * 4, threshold))
        white += 1;
    }
    return white / region.width >= whiteRatio;
  });
  return contentRuns(horizontal, region.y, minSize).flatMap(([top, bottom]) => {
    const vertical = Array.from({ length: region.width }, (_, column) => {
      let white = 0;
      for (let y = top; y < bottom; y += 1) {
        if (
          isWhite(pixels, (y * imageWidth + region.x + column) * 4, threshold)
        )
          white += 1;
      }
      return white / (bottom - top) >= whiteRatio;
    });
    return contentRuns(vertical, region.x, minSize).map(([left, right]) => ({
      x: left,
      y: top,
      width: right - left,
      height: bottom - top,
    }));
  });
}

export function detectTilesInRegions(
  pixels: Uint8ClampedArray,
  imageWidth: number,
  imageHeight: number,
  regions: Region[],
  threshold = 242,
) {
  return regions.flatMap((region) =>
    detectTiles(pixels, imageWidth, imageHeight, region, threshold),
  );
}

export function filterUsableTiles(tiles: Tile[]) {
  return tiles.filter(({ width, height }) => {
    const shortSide = Math.min(width, height);
    const longSide = Math.max(width, height);
    return shortSide >= 100 && longSide <= 260 && shortSide / longSide >= 0.7;
  });
}

export function uniqueRandomIndices(
  total: number,
  count: number,
  random = Math.random,
) {
  if (count > total)
    throw new RangeError("count exceeds available illustrations");
  const indices = Array.from({ length: total }, (_, index) => index);
  for (let index = indices.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1));
    [indices[index], indices[swap]] = [indices[swap], indices[index]];
  }
  return indices.slice(0, count);
}
