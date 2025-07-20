"use client";

import React, { useEffect, useRef, useState } from "react";
import { IconArray, Point } from "@/types/types";

const ZoomCanvas = ({ iconArray }: { iconArray: IconArray }) => {
  const ICON_ROWS = iconArray.rows;
  const ICON_COLS = iconArray.cols;
  const highlightPoints: Point[] = iconArray.highlightPoints;
  const MIN_ZOOM = 1;
  const MAX_ZOOM = 64;

  // Canvas Logic
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [zoom, setZoom] = useState(64); // Each icon's side length in pixels
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

  // Resize canvas to parent container
  useEffect(() => {
    const resize = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      setCanvasSize({
        width: rect.width,
        height: rect.height,
      });
    };

    resize();

    // Optional: Resize on window resize (to account for layout changes)
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Center on middle icon initially and when zoom changes
  useEffect(() => {
    setOffset({
      x: (ICON_COLS * zoom) / 2 - canvasSize.width / 2,
      y: (ICON_ROWS * zoom) / 2 - canvasSize.height / 2,
    });
  }, [zoom, canvasSize.width, canvasSize.height]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    const radius =
      (zoom / 2) * 0.05 >= 0.075 ? (zoom / 2) * 0.95 : zoom / 2 - 0.075;

    const startCol = Math.floor(offset.x / zoom);
    const endCol = Math.min(
      Math.ceil((offset.x + canvas.width) / zoom),
      ICON_COLS,
    );

    const startRow = Math.floor(offset.y / zoom);
    const endRow = Math.min(
      Math.ceil((offset.y + canvas.height) / zoom),
      ICON_ROWS,
    );

    for (let row = startRow; row < endRow; row++) {
      if (row < 0 || row >= ICON_ROWS) continue;

      for (let col = startCol; col < endCol; col++) {
        if (col < 0 || col >= ICON_COLS) continue;

        const x = col * zoom - offset.x + zoom / 2;
        const y = row * zoom - offset.y + zoom / 2;

        const isHighlighted = highlightPoints.some(
          (p) => p.row === row && p.col === col,
        );

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = isHighlighted ? "red" : "black";
        ctx.fill();
      }
    }
  };

  useEffect(() => {
    drawCanvas();
  }, [offset, canvasSize]);

  // Handle wheel zoom + scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomDelta = -Math.sign(e.deltaY);
      const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom + zoomDelta));
      if (newZoom === zoom) return;

      setZoom(newZoom);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [zoom, offset]);

  // Zoom completion marker
  const hasPostedRef = useRef(false);
  useEffect(() => {
    if (zoom <= MIN_ZOOM && !hasPostedRef.current) {
      hasPostedRef.current = true;
      console.log("Sending 'zoomComplete' to parent window");
      window.parent.postMessage("zoomComplete", "*");
    }
  }, [zoom]);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden bg-white"
    >
      <canvas ref={canvasRef} style={{ display: "block" }} />

      <div className="absolute top-2 left-2 rounded bg-white/90 p-2 shadow">
        <input
          type="range"
          min={MIN_ZOOM}
          max={MAX_ZOOM}
          step={1}
          value={zoom}
          onChange={(e) => {
            const newZoom = Number(e.target.value);
            setZoom(newZoom);
          }}
        />
        <div className="text-center text-sm text-black/90">
          Zoom: {Number(zoom.toFixed(1))}px
        </div>
      </div>
    </div>
  );
};

export default ZoomCanvas;
