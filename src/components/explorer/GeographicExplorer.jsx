import { AnimatePresence } from "framer-motion";
import { easeCubicInOut } from "d3-ease";
import { geoDistance, geoGraticule10, geoPath } from "d3-geo";
import { feature, mesh } from "topojson-client";
import worldAtlas from "world-atlas/countries-110m.json";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { publishedReflections } from "../../data/reflections";
import { useResponsiveCanvas } from "../../hooks/useResponsiveCanvas";
import {
  createMorphProjection,
  INITIAL_ROTATION,
  traceMorphBoundary,
} from "../../utils/projectionInterpolation";
import ExplorerControls from "./ExplorerControls";
import ReflectionPreviewCard from "./ReflectionPreviewCard";

const land = feature(worldAtlas, worldAtlas.objects.land);
const borders = mesh(
  worldAtlas,
  worldAtlas.objects.countries,
  (countryA, countryB) => countryA !== countryB,
);
const graticule = geoGraticule10();

export default function GeographicExplorer() {
  const { containerRef, canvasRef, size } = useResponsiveCanvas();
  const [progress, setProgress] = useState(0);
  const [rotation, setRotation] = useState(INITIAL_ROTATION);
  const [animating, setAnimating] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [selectedReflection, setSelectedReflection] = useState(null);
  const animationFrame = useRef(null);
  const drag = useRef(null);

  const projection = useMemo(
    () => createMorphProjection({ ...size, progress, rotation }),
    [size, progress, rotation],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    const path = geoPath(projection, context);

    context.clearRect(0, 0, size.width, size.height);
    context.fillStyle = "#090b10";
    context.fillRect(0, 0, size.width, size.height);

    context.save();
    traceMorphBoundary(context, { ...size, progress });
    context.fillStyle = "#0f131b";
    context.fill();
    context.clip();

    context.beginPath();
    path(graticule);
    context.strokeStyle = "rgba(171, 181, 198, 0.19)";
    context.lineWidth = size.width < 600 ? 0.65 : 0.8;
    context.stroke();

    context.beginPath();
    path(land);
    context.fillStyle = "#dedfdc";
    context.fill();
    context.strokeStyle = "#f6f3ea";
    context.lineWidth = 0.75;
    context.stroke();

    context.beginPath();
    path(borders);
    context.strokeStyle = "rgba(7, 10, 16, 0.68)";
    context.lineWidth = size.width < 600 ? 0.45 : 0.65;
    context.stroke();
    context.restore();

    traceMorphBoundary(context, { ...size, progress });
    context.strokeStyle = "#f7f1e5";
    context.lineWidth = size.width < 600 ? 1.8 : 2.5;
    context.stroke();
  }, [canvasRef, progress, projection, size]);

  useEffect(
    () => () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    },
    [],
  );

  const animateValue = useCallback((from, to, duration, onUpdate, onDone) => {
    const startedAt = performance.now();
    const tick = (now) => {
      const amount = Math.min(1, (now - startedAt) / duration);
      onUpdate(from + (to - from) * easeCubicInOut(amount));
      if (amount < 1) {
        animationFrame.current = requestAnimationFrame(tick);
      } else {
        animationFrame.current = null;
        onDone?.();
      }
    };
    animationFrame.current = requestAnimationFrame(tick);
  }, []);

  const toggleProjection = () => {
    if (animating) return;
    const target = progress < 0.5 ? 1 : 0;
    setInteracted(true);
    setAnimating(true);
    setSelectedReflection(null);
    animateValue(progress, target, 1800, setProgress, () => {
      setProgress(target);
      setAnimating(false);
    });
  };

  const resetRotation = () => {
    if (animating) return;
    setInteracted(true);
    const start = [...rotation];
    const startProgress = progress;
    setAnimating(true);
    animateValue(0, 1, startProgress > 0.001 ? 1150 : 650, (amount) => {
      setProgress(startProgress * (1 - amount));
      setRotation(
        start.map(
          (value, index) =>
            value + (INITIAL_ROTATION[index] - value) * amount,
        ),
      );
    }, () => {
      setProgress(0);
      setRotation(INITIAL_ROTATION);
      setAnimating(false);
    });
  };

  const startDrag = (event) => {
    if (animating || progress > 0.001) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = {
      x: event.clientX,
      y: event.clientY,
      rotation: [...rotation],
    };
    setInteracted(true);
  };

  const moveDrag = (event) => {
    if (!drag.current) return;
    const dx = event.clientX - drag.current.x;
    const dy = event.clientY - drag.current.y;
    setRotation([
      drag.current.rotation[0] + dx * 0.28,
      Math.max(-65, Math.min(65, drag.current.rotation[1] - dy * 0.22)),
      0,
    ]);
  };

  const endDrag = () => {
    drag.current = null;
  };

  const rotateWithKeyboard = (event) => {
    if (animating || progress > 0.001) return;
    const steps = {
      ArrowLeft: [-8, 0],
      ArrowRight: [8, 0],
      ArrowUp: [0, 6],
      ArrowDown: [0, -6],
    };
    const step = steps[event.key];
    if (!step) return;
    event.preventDefault();
    setInteracted(true);
    setRotation(([longitude, latitude]) => [
      longitude + step[0],
      Math.max(-65, Math.min(65, latitude + step[1])),
      0,
    ]);
  };

  const focusReflection = () => {
    if (animating) return;
    const reflection = publishedReflections[0];
    if (!reflection) return;

    setInteracted(true);

    if (progress > 0.9999) {
      setSelectedReflection(reflection);
      return;
    }

    const targetLongitude = -reflection.coordinates.longitude;
    const nearestTargetLongitude =
      targetLongitude +
      Math.round((rotation[0] - targetLongitude) / 360) * 360;
    const targetRotation = [
      nearestTargetLongitude,
      -reflection.coordinates.latitude,
      0,
    ];
    const startRotation = [...rotation];

    setSelectedReflection(null);
    setAnimating(true);
    animateValue(0, 1, 750, (amount) => {
      setRotation(
        startRotation.map(
          (value, index) =>
            value + (targetRotation[index] - value) * amount,
        ),
      );
    }, () => {
      setRotation(targetRotation);
      setAnimating(false);
      setSelectedReflection(reflection);
    });
  };

  const isMap = progress > 0.9999;
  const center = [-rotation[0], -rotation[1]];

  return (
    <section className="explorer-shell" aria-label="Interactive globe and world map">
      <div className="map-frame" ref={containerRef}>
        <button
          className="map-reflection-shortcut"
          type="button"
          onClick={focusReflection}
          disabled={animating}
          aria-label="Locate Reflection 1 on the globe or map"
        >
          <span>REFLECTION</span>
          <strong>1</strong>
        </button>
        <canvas
          ref={canvasRef}
          className="world-canvas"
          aria-label={`${isMap ? "Flat world map" : "Rotatable world globe"} showing reflection locations`}
          onContextMenu={(event) => event.preventDefault()}
        />

        {!isMap && !animating && (
          <div
            className="globe-hit-area"
            style={{
              left: projection.translate()[0],
              top: projection.translate()[1],
              width: projection.scale() * 2,
              height: projection.scale() * 2,
            }}
            role="application"
            tabIndex="0"
            aria-label="Drag the globe to rotate it. Use arrow keys for keyboard rotation."
            onPointerDown={startDrag}
            onPointerMove={moveDrag}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onKeyDown={rotateWithKeyboard}
          />
        )}

        <div className="pin-layer">
          {publishedReflections.map((reflection) => {
            const coordinates = [
              reflection.coordinates.longitude,
              reflection.coordinates.latitude,
            ];
            const point = projection(coordinates);
            const distance = geoDistance(coordinates, center);
            const visible = isMap || distance <= Math.PI / 2 + progress * Math.PI / 2;
            if (!point || !visible) return null;
            const selected = selectedReflection?.id === reflection.id;
            return (
              <button
                key={reflection.id}
                className={`map-pin ${selected ? "selected" : ""}`}
                style={{ left: point[0], top: point[1] }}
                onClick={() => setSelectedReflection(reflection)}
                aria-label={`Open Reflection ${reflection.reflectionNumber}: ${reflection.title}`}
                disabled={animating}
              >
                <span className="pin-pulse" />
                <span className="pin-marker"><span>{reflection.reflectionNumber}</span></span>
                <span className="pin-caption">REFLECTION {reflection.reflectionNumber}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {selectedReflection && (
            <ReflectionPreviewCard
              reflection={selectedReflection}
              onClose={() => setSelectedReflection(null)}
            />
          )}
        </AnimatePresence>

        {!interacted && !isMap && (
          <span className="drag-hint" aria-hidden="true">DRAG TO ROTATE</span>
        )}

        <ExplorerControls
          mode={isMap ? "map" : "globe"}
          animating={animating}
          onToggle={toggleProjection}
          onReset={resetRotation}
        />
      </div>
    </section>
  );
}
