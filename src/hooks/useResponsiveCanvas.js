import { useEffect, useRef, useState } from "react";

export function useResponsiveCanvas() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [size, setSize] = useState({ width: 900, height: 600 });

  useEffect(() => {
    if (!containerRef.current) return undefined;

    const updateSize = (entry) => {
      const width = Math.max(280, Math.round(entry.contentRect.width));
      const fallbackHeight = Math.min(680, Math.max(width * 0.58, 430));
      const height = Math.max(
        320,
        Math.round(entry.contentRect.height || fallbackHeight),
      );
      setSize((currentSize) => (
        currentSize.width === width && currentSize.height === height
          ? currentSize
          : { width, height }
      ));
    };

    const observer = new ResizeObserver(([entry]) => updateSize(entry));
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(size.width * ratio);
    canvas.height = Math.round(size.height * ratio);
    // Let CSS size the canvas to its container. Fixed inline pixel dimensions
    // made the initial 900px canvas widen the entire page on phones before the
    // ResizeObserver could correct it.
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    const context = canvas.getContext("2d");
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }, [size]);

  return { containerRef, canvasRef, size };
}
