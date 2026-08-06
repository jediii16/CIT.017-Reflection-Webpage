import { AnimatePresence, useReducedMotion } from "framer-motion";
import { easeCubicInOut } from "d3-ease";
import { geoDistance, geoGraticule10, geoPath } from "d3-geo";
import { BookOpen, ChevronDown, LockKeyhole, X } from "lucide-react";
import { feature, mesh } from "topojson-client";
import worldAtlas from "world-atlas/countries-110m.json";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { mapCities } from "../../data/mapCities";
import { publishedReflections, reflections } from "../../data/reflections";
import { useResponsiveCanvas } from "../../hooks/useResponsiveCanvas";
import {
  createMorphProjection,
  INITIAL_ROTATION,
  traceMorphBoundary,
} from "../../utils/projectionInterpolation";
import ExplorerControls from "./ExplorerControls";
import ReflectionPreviewCard from "./ReflectionPreviewCard";

const land = feature(worldAtlas, worldAtlas.objects.land);
const countries = feature(worldAtlas, worldAtlas.objects.countries).features;
const borders = mesh(
  worldAtlas,
  worldAtlas.objects.countries,
  (countryA, countryB) => countryA !== countryB,
);
const graticule = geoGraticule10();
const reflectionTerms = ["Midterms", "Finals"].map((term) => ({
  term,
  entries: reflections.filter((reflection) => reflection.term === term),
}));
const publishedCount = publishedReflections.length;
const upcomingCount = reflections.length - publishedCount;
const compactReflectionQuery = "(max-width: 700px), (max-width: 900px) and (max-height: 500px)";

function getReflectionPinOffset(reflection) {
  const coLocatedReflections = publishedReflections.filter(
    ({ coordinates }) =>
      coordinates.longitude === reflection.coordinates.longitude &&
      coordinates.latitude === reflection.coordinates.latitude,
  );
  const locationIndex = coLocatedReflections.findIndex(({ id }) => id === reflection.id);

  return [(locationIndex - (coLocatedReflections.length - 1) / 2) * 58, 0];
}

export default function GeographicExplorer() {
  const { containerRef, canvasRef, size } = useResponsiveCanvas();
  const [progress, setProgress] = useState(0);
  const [rotation, setRotation] = useState(INITIAL_ROTATION);
  const [animating, setAnimating] = useState(false);
  const [projectionTransitioning, setProjectionTransitioning] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [selectedReflection, setSelectedReflection] = useState(null);
  const [hoveredPlace, setHoveredPlace] = useState(null);
  const [reflectionIndexOpen, setReflectionIndexOpen] = useState(false);
  const [compactReflectionIndex, setCompactReflectionIndex] = useState(() =>
    typeof window !== "undefined" && window.matchMedia(compactReflectionQuery).matches,
  );
  const [webThread, setWebThread] = useState(null);
  const reduceMotion = useReducedMotion();
  const animationFrame = useRef(null);
  const projectionPulseStartedAt = useRef(null);
  const parallaxFrame = useRef(null);
  const parallaxPoint = useRef(null);
  const drag = useRef(null);
  const countryPickerCanvas = useRef(null);

  const projection = useMemo(
    () => createMorphProjection({
      ...size,
      progress,
      rotation,
      reserveIndexSpace: !compactReflectionIndex,
    }),
    [compactReflectionIndex, size, progress, rotation],
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
    traceMorphBoundary(context, {
      ...size,
      progress,
      reserveIndexSpace: !compactReflectionIndex,
    });
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

    traceMorphBoundary(context, {
      ...size,
      progress,
      reserveIndexSpace: !compactReflectionIndex,
    });
    context.strokeStyle = "#f7f1e5";
    context.lineWidth = size.width < 600 ? 1.8 : 2.5;
    context.stroke();

    if (projectionTransitioning && !reduceMotion) {
      const pulseStartedAt = projectionPulseStartedAt.current ?? performance.now();
      const elapsed = performance.now() - pulseStartedAt;
      const pulseDuration = 1050;
      const projectionCenter = projection.translate();
      const boundaryOptions = {
        ...size,
        progress,
        reserveIndexSpace: !compactReflectionIndex,
      };

      [
        { color: "rgba(226, 51, 53, .2)", shadow: "rgba(226, 51, 53, .42)", offset: -4 },
        { color: "rgba(83, 146, 235, .22)", shadow: "rgba(83, 146, 235, .46)", offset: 4 },
      ].forEach(({ color, shadow, offset }) => {
        context.save();
        traceMorphBoundary(context, boundaryOptions);
        context.strokeStyle = color;
        context.lineWidth = size.width < 600 ? 2.2 : 3;
        context.shadowColor = shadow;
        context.shadowBlur = size.width < 600 ? 8 : 13;
        context.shadowOffsetX = offset;
        context.stroke();
        context.restore();
      });

      [
        { delay: 0, color: "rgba(226, 51, 53, .9)", shadow: "rgba(226, 51, 53, .62)" },
        { delay: 420, color: "rgba(83, 146, 235, .92)", shadow: "rgba(83, 146, 235, .66)" },
      ].forEach(({ delay, color, shadow }) => {
        const pulseElapsed = elapsed - delay;
        if (pulseElapsed < 0) return;
        const phase = (pulseElapsed % pulseDuration) / pulseDuration;
        const expansion = 0.96 + phase * 0.2;
        const opacity = Math.sin(Math.PI * phase) * 0.72;

        context.save();
        context.translate(projectionCenter[0], projectionCenter[1]);
        context.scale(expansion, expansion);
        context.translate(-projectionCenter[0], -projectionCenter[1]);
        traceMorphBoundary(context, boundaryOptions);
        context.globalAlpha = opacity;
        context.strokeStyle = color;
        context.lineWidth = Math.max(1, (size.width < 600 ? 2.2 : 3) - phase * 1.2);
        context.shadowColor = shadow;
        context.shadowBlur = size.width < 600 ? 8 : 14;
        context.stroke();
        context.restore();
      });
    }

    if (animating) return;

    if (!countryPickerCanvas.current) {
      countryPickerCanvas.current = document.createElement("canvas");
    }
    const pickerCanvas = countryPickerCanvas.current;
    if (pickerCanvas.width !== size.width || pickerCanvas.height !== size.height) {
      pickerCanvas.width = size.width;
      pickerCanvas.height = size.height;
    }
    const pickerContext = pickerCanvas.getContext("2d", { willReadFrequently: true });
    const pickerPath = geoPath(projection, pickerContext);
    pickerContext.clearRect(0, 0, size.width, size.height);
    pickerContext.save();
    traceMorphBoundary(pickerContext, {
      ...size,
      progress,
      reserveIndexSpace: !compactReflectionIndex,
    });
    pickerContext.clip();
    countries.forEach((country, index) => {
      const colorCode = index + 1;
      pickerContext.beginPath();
      pickerPath(country);
      pickerContext.fillStyle = `rgb(${(colorCode >> 16) & 255}, ${(colorCode >> 8) & 255}, ${colorCode & 255})`;
      pickerContext.fill();
    });
    pickerContext.restore();
  }, [
    animating,
    canvasRef,
    compactReflectionIndex,
    progress,
    projection,
    projectionTransitioning,
    reduceMotion,
    size,
  ]);

  useEffect(
    () => () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
      if (parallaxFrame.current) cancelAnimationFrame(parallaxFrame.current);
    },
    [],
  );

  useEffect(() => {
    if (!selectedReflection) {
      setWebThread(null);
      return undefined;
    }

    const updateThread = window.requestAnimationFrame(() => {
      const frame = containerRef.current;
      const card = frame?.querySelector(".reflection-card");
      const projectedPoint = projection([
        selectedReflection.coordinates.longitude,
        selectedReflection.coordinates.latitude,
      ]);
      const pinOffset = getReflectionPinOffset(selectedReflection);
      const pinPoint = projectedPoint && [
        projectedPoint[0] + pinOffset[0],
        projectedPoint[1] + pinOffset[1],
      ];
      if (!frame || !card || !pinPoint) return;

      const frameBounds = frame.getBoundingClientRect();
      const cardBounds = card.getBoundingClientRect();
      const cardLeft = cardBounds.left - frameBounds.left;
      const cardRight = cardBounds.right - frameBounds.left;
      const cardTop = cardBounds.top - frameBounds.top;
      const cardBottom = cardBounds.bottom - frameBounds.top;
      let targetX = Math.max(cardLeft + 18, Math.min(pinPoint[0], cardRight - 18));
      let targetY = Math.max(cardTop + 18, Math.min(pinPoint[1], cardBottom - 18));

      if (
        pinPoint[0] >= cardLeft && pinPoint[0] <= cardRight &&
        pinPoint[1] >= cardTop && pinPoint[1] <= cardBottom
      ) {
        targetX = cardRight - 24;
        targetY = cardTop + 24;
      }

      const deltaX = targetX - pinPoint[0];
      const deltaY = targetY - pinPoint[1];
      setWebThread({
        left: pinPoint[0],
        top: pinPoint[1],
        width: Math.hypot(deltaX, deltaY),
        angle: Math.atan2(deltaY, deltaX) * (180 / Math.PI),
      });
    });

    return () => window.cancelAnimationFrame(updateThread);
  }, [containerRef, projection, selectedReflection, size]);

  useEffect(() => {
    if (!reflectionIndexOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setReflectionIndexOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [reflectionIndexOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(compactReflectionQuery);
    const updateLayout = (event) => {
      setCompactReflectionIndex(event.matches);
      if (!event.matches) setReflectionIndexOpen(false);
    };

    mediaQuery.addEventListener("change", updateLayout);
    return () => mediaQuery.removeEventListener("change", updateLayout);
  }, []);

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
    setProjectionTransitioning(true);
    projectionPulseStartedAt.current = performance.now();
    setSelectedReflection(null);
    setHoveredPlace(null);
    animateValue(progress, target, 1800, setProgress, () => {
      setProgress(target);
      setAnimating(false);
      setProjectionTransitioning(false);
      projectionPulseStartedAt.current = null;
    });
  };

  const resetRotation = () => {
    if (animating) return;
    setInteracted(true);
    const start = [...rotation];
    const startProgress = progress;
    setHoveredPlace(null);
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
    setDragging(true);
    setInteracted(true);
    setHoveredPlace(null);
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
    setDragging(false);
  };

  const updateWebParallax = (event) => {
    if (reduceMotion || compactReflectionIndex || event.pointerType === "touch") return;
    parallaxPoint.current = { x: event.clientX, y: event.clientY };
    if (parallaxFrame.current) return;

    parallaxFrame.current = window.requestAnimationFrame(() => {
      const frame = containerRef.current;
      const landing = frame?.closest(".minimal-landing");
      if (!frame || !landing || !parallaxPoint.current) {
        parallaxFrame.current = null;
        return;
      }

      const bounds = frame.getBoundingClientRect();
      const horizontal = (parallaxPoint.current.x - bounds.left) / bounds.width - 0.5;
      const vertical = (parallaxPoint.current.y - bounds.top) / bounds.height - 0.5;
      landing.style.setProperty("--web-shift-x", `${horizontal * 10}px`);
      landing.style.setProperty("--web-shift-y", `${vertical * 8}px`);
      landing.style.setProperty("--web-shift-x-inverse", `${horizontal * -6.5}px`);
      landing.style.setProperty("--web-shift-y-inverse", `${vertical * -5.2}px`);
      parallaxFrame.current = null;
    });
  };

  const resetWebParallax = () => {
    const landing = containerRef.current?.closest(".minimal-landing");
    landing?.style.setProperty("--web-shift-x", "0px");
    landing?.style.setProperty("--web-shift-y", "0px");
    landing?.style.setProperty("--web-shift-x-inverse", "0px");
    landing?.style.setProperty("--web-shift-y-inverse", "0px");
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

  const focusReflection = (reflection = publishedReflections[0]) => {
    if (animating) return;
    if (!reflection) return;

    setReflectionIndexOpen(false);
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
    setHoveredPlace(null);
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

  const clearHoveredPlace = () => {
    setHoveredPlace(null);
  };

  const handlePlaceHover = (event) => {
    if (animating || drag.current || !countryPickerCanvas.current) {
      clearHoveredPlace();
      return;
    }

    if (
      event.target.closest?.(
        ".explorer-controls, .map-reflection-toggle, .map-reflection-backdrop, .map-reflection-index, .map-pin, .reflection-card",
      )
    ) {
      clearHoveredPlace();
      return;
    }

    const frame = containerRef.current;
    if (!frame) return;
    const bounds = frame.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    if (x < 0 || y < 0 || x >= size.width || y >= size.height) {
      clearHoveredPlace();
      return;
    }

    const geographicCenter = [-rotation[0], -rotation[1]];
    let closestCity = null;
    let closestDistance = size.width < 600 ? 20 : 16;

    mapCities.forEach((city) => {
      const visible =
        progress > 0.9999 ||
        geoDistance(city.coordinates, geographicCenter) <=
          Math.PI / 2 + progress * Math.PI / 2;
      if (!visible) return;
      const point = projection(city.coordinates);
      if (!point) return;
      const distance = Math.hypot(point[0] - x, point[1] - y);
      if (distance < closestDistance) {
        closestCity = city;
        closestDistance = distance;
      }
    });

    const position = {
      x,
      y,
      alignRight: x > size.width - 210,
      placeBelow: y < 82,
    };

    if (closestCity) {
      setHoveredPlace({
        ...position,
        key: `city-${closestCity.name}`,
        kind: "CITY",
        name: closestCity.name,
        detail: closestCity.country,
      });
      return;
    }

    const pickerContext = countryPickerCanvas.current.getContext("2d", {
      willReadFrequently: true,
    });
    const pixel = pickerContext.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
    if (pixel[3] < 240) {
      clearHoveredPlace();
      return;
    }
    const colorCode = (pixel[0] << 16) | (pixel[1] << 8) | pixel[2];
    const country = countries[colorCode - 1];
    const countryName = country?.properties?.name;
    if (!countryName) {
      clearHoveredPlace();
      return;
    }

    setHoveredPlace({
      ...position,
      key: `country-${countryName}`,
      kind: "COUNTRY",
      name: countryName,
      detail: null,
    });
  };

  const isMap = progress > 0.9999;
  const center = [-rotation[0], -rotation[1]];

  return (
    <section className="explorer-shell" aria-label="Interactive globe and world map">
      <div
        className="map-frame"
        ref={containerRef}
        onPointerMove={(event) => {
          updateWebParallax(event);
          handlePlaceHover(event);
        }}
        onPointerLeave={() => {
          resetWebParallax();
          clearHoveredPlace();
        }}
      >
        <button
          className="map-reflection-toggle"
          type="button"
          aria-controls="map-reflection-index"
          aria-expanded={reflectionIndexOpen}
          onClick={() => setReflectionIndexOpen((open) => !open)}
        >
          <BookOpen size={18} aria-hidden="true" />
          <span>
            <strong>Reflections</strong>
            <small>{publishedCount} published · {upcomingCount} upcoming</small>
          </span>
          <ChevronDown size={18} aria-hidden="true" />
        </button>

        {reflectionIndexOpen && (
          <button
            className="map-reflection-backdrop"
            type="button"
            onClick={() => setReflectionIndexOpen(false)}
            aria-label="Close reflections and return to map"
          />
        )}

        <nav
          id="map-reflection-index"
          className={`map-reflection-index ${reflectionIndexOpen ? "open" : ""}`}
          aria-label="Reflections by term"
        >
          <header className="map-reflection-index-header">
            <span>
              <small>Course journal</small>
              <strong>Reflections</strong>
              <em>{publishedCount} published · {upcomingCount} upcoming</em>
            </span>
            <button
              className="map-reflection-close"
              type="button"
              onClick={() => setReflectionIndexOpen(false)}
              aria-label="Close reflection index"
            >
              <X size={18} />
            </button>
          </header>

          <div className="map-reflection-groups">
            {reflectionTerms.map(({ term, entries }, termIndex) => (
              <section className="map-reflection-group" key={term}>
                <span className="map-reflection-term">{term}</span>
                <div className="map-reflection-items">
                  {entries.map((reflection, entryIndex) => {
                    const available = reflection.status === "published";

                    return (
                      <button
                        className={`map-reflection-item ${available ? "available" : "unavailable"}`}
                        type="button"
                        key={reflection.id}
                        style={{ "--entry-delay": `${70 + (termIndex * 4 + entryIndex) * 34}ms` }}
                        onClick={() => focusReflection(reflection)}
                        disabled={!available || animating}
                        aria-label={
                          available
                            ? `Locate ${term} Reflection ${reflection.reflectionNumber} on the globe or map`
                            : `${term} Reflection ${reflection.reflectionNumber} is currently unavailable`
                        }
                      >
                        <span>Reflection</span>
                        <strong>{reflection.reflectionNumber}</strong>
                        {!available && <LockKeyhole size={13} aria-hidden="true" />}
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </nav>
        <canvas
          ref={canvasRef}
          className="world-canvas"
          aria-label={`${isMap ? "Flat world map" : "Rotatable world globe"} showing reflection locations`}
          onContextMenu={(event) => event.preventDefault()}
        />

        {progress < 0.001 && (
          <span
            className={`globe-rim-light ${dragging ? "active" : ""}`}
            style={{
              left: projection.translate()[0],
              top: projection.translate()[1],
              width: projection.scale() * 2 + 12,
              height: projection.scale() * 2 + 12,
            }}
            aria-hidden="true"
          />
        )}

        {hoveredPlace && (
          <div
            className={`map-place-tooltip ${hoveredPlace.alignRight ? "align-right" : ""} ${hoveredPlace.placeBelow ? "place-below" : ""}`}
            style={{ left: hoveredPlace.x, top: hoveredPlace.y }}
            role="tooltip"
          >
            <small>{hoveredPlace.kind}</small>
            <strong>{hoveredPlace.name}</strong>
            {hoveredPlace.detail && <span>{hoveredPlace.detail}</span>}
          </div>
        )}

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
            const pinOffset = getReflectionPinOffset(reflection);
            const distance = geoDistance(coordinates, center);
            const visible = isMap || distance <= Math.PI / 2 + progress * Math.PI / 2;
            if (!point || !visible) return null;
            const selected = selectedReflection?.id === reflection.id;
            return (
              <button
                key={reflection.id}
                className={`map-pin ${selected ? "selected" : ""}`}
                style={{ left: point[0] + pinOffset[0], top: point[1] + pinOffset[1] }}
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

        {webThread && !reduceMotion && (
          <span
            className="reflection-web-thread"
            style={{
              left: webThread.left,
              top: webThread.top,
              width: webThread.width,
              transform: `rotate(${webThread.angle}deg)`,
            }}
            aria-hidden="true"
          />
        )}

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
