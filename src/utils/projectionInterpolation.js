import {
  geoNaturalEarth1Raw,
  geoOrthographicRaw,
  geoProjection,
} from "d3-geo";

const lerp = (start, end, amount) => start + (end - start) * amount;

export const INITIAL_ROTATION = [-122, -7, 0];

function getProjectionMetrics(width, height, reserveIndexSpace = false) {
  const compactScale = width < 720 && !reserveIndexSpace;
  const safeOffset = !reserveIndexSpace
    ? 0
    : width < 980
      ? Math.min(90, width * 0.12)
      : width < 1280
        ? 65
        : 45;

  return {
    globeCenter: [width / 2 + safeOffset, height / 2],
    mapCenter: [width / 2, height / 2],
    globeScale: Math.min(width * (compactScale ? 0.42 : 0.33), height * 0.43),
    mapScale: Math.min(width / 5.65, height / 3.05),
  };
}

function foldedOrthographicRaw(lambda, phi) {
  if (Math.abs(lambda) <= Math.PI / 2) {
    return geoOrthographicRaw(lambda, phi);
  }

  // Collapse the rear hemisphere onto the globe rim instead of clipping it.
  // As the raw projection interpolates, these coordinates unfold outward into
  // their Natural Earth positions without creating polygon closure bands.
  return [Math.sign(lambda) * Math.cos(phi), Math.sin(phi)];
}

export function createMorphProjection({
  width,
  height,
  progress,
  rotation,
  reserveIndexSpace = false,
}) {
  const morphProgress = Math.max(0, Math.min(1, progress));
  const raw = (lambda, phi) => {
    const globe = foldedOrthographicRaw(lambda, phi);
    const map = geoNaturalEarth1Raw(lambda, phi);

    return [
      lerp(globe[0], map[0], morphProgress),
      lerp(globe[1], map[1], morphProgress),
    ];
  };

  const { globeCenter, mapCenter, globeScale, mapScale } = getProjectionMetrics(
    width,
    height,
    reserveIndexSpace,
  );
  const center = [
    lerp(globeCenter[0], mapCenter[0], morphProgress),
    lerp(globeCenter[1], mapCenter[1], morphProgress),
  ];
  const activeRotation = rotation.map((value, index) =>
    lerp(value, 0, morphProgress),
  );

  const projection = geoProjection(raw)
    .translate(center)
    .scale(lerp(globeScale, mapScale, morphProgress))
    .rotate(activeRotation)
    .precision(0.35);

  projection.clipAngle(null);

  return projection;
}

export function traceMorphBoundary(
  context,
  { width, height, progress, reserveIndexSpace = false },
) {
  const morphProgress = Math.max(0, Math.min(1, progress));
  const { globeCenter, mapCenter, globeScale, mapScale } = getProjectionMetrics(
    width,
    height,
    reserveIndexSpace,
  );
  const mapProjection = geoProjection(geoNaturalEarth1Raw)
    .translate(mapCenter)
    .scale(mapScale)
    .rotate([0, 0, 0])
    .clipAngle(null)
    .precision(0.35);
  const edgeSteps = 64;
  const geographicBoundary = [];

  for (let step = 0; step <= edgeSteps; step += 1) {
    geographicBoundary.push([-180 + (360 * step) / edgeSteps, 89.999]);
  }
  for (let step = 1; step <= edgeSteps; step += 1) {
    geographicBoundary.push([180, 89.999 - (179.998 * step) / edgeSteps]);
  }
  for (let step = 1; step <= edgeSteps; step += 1) {
    geographicBoundary.push([180 - (360 * step) / edgeSteps, -89.999]);
  }
  for (let step = 1; step < edgeSteps; step += 1) {
    geographicBoundary.push([-180, -89.999 + (179.998 * step) / edgeSteps]);
  }

  context.beginPath();
  geographicBoundary.forEach((coordinate, index) => {
    const mapPoint = mapProjection(coordinate);
    const angle = Math.atan2(mapPoint[1] - mapCenter[1], mapPoint[0] - mapCenter[0]);
    const globePoint = [
      globeCenter[0] + Math.cos(angle) * globeScale,
      globeCenter[1] + Math.sin(angle) * globeScale,
    ];
    const point = [
      lerp(globePoint[0], mapPoint[0], morphProgress),
      lerp(globePoint[1], mapPoint[1], morphProgress),
    ];

    if (index === 0) context.moveTo(point[0], point[1]);
    else context.lineTo(point[0], point[1]);
  });
  context.closePath();
}
