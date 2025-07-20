"use client";

import React, { useEffect, useRef, useState } from "react";
import { Point } from "@/types/types";

const ICON_ROWS = 1000;
const ICON_COLS = 1000;
const MIN_ZOOM = 4;
const MAX_ZOOM = 40;

const ZoomPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [zoom, setZoom] = useState(64); // Each icon's side length in pixels
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

  const highlightPoints: Point[] = [{ row: 500, col: 500 }];

  // Resize canvas to screen
  useEffect(() => {
    const resize = () => {
      setCanvasSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Center on middle icon initially
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // White background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const radius = zoom / 2 - 1;

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
  }, [zoom, offset, canvasSize]);

  // Handle wheel zoom + scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomDelta = -Math.sign(e.deltaY) * 2;
      const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom + zoomDelta));
      if (newZoom === zoom) return;

      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const worldX = offset.x + mouseX;
      const worldY = offset.y + mouseY;

      const scale = newZoom / zoom;
      const newOffsetX = worldX - mouseX * scale;
      const newOffsetY = worldY - mouseY * scale;

      setZoom(newZoom);
      setOffset({ x: newOffsetX, y: newOffsetY });
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [zoom, offset]);

  // Handle drag-to-pan
  // useEffect(() => {
  //   const container = containerRef.current;
  //   if (!container) return;

  //   let isDragging = false;
  //   let startX = 0;
  //   let startY = 0;

  //   const handleDown = (e: MouseEvent) => {
  //     isDragging = true;
  //     startX = e.clientX;
  //     startY = e.clientY;
  //     container.style.cursor = "grabbing";
  //   };

  //   const handleMove = (e: MouseEvent) => {
  //     if (!isDragging) return;
  //     const dx = e.clientX - startX;
  //     const dy = e.clientY - startY;
  //     startX = e.clientX;
  //     startY = e.clientY;

  //     setOffset((prev) => ({
  //       x: prev.x - dx,
  //       y: prev.y - dy,
  //     }));
  //   };

  //   const handleUp = () => {
  //     isDragging = false;
  //     container.style.cursor = "default";
  //   };

  //   container.addEventListener("mousedown", handleDown);
  //   container.addEventListener("mousemove", handleMove);
  //   container.addEventListener("mouseup", handleUp);
  //   container.addEventListener("mouseleave", handleUp);

  //   return () => {
  //     container.removeEventListener("mousedown", handleDown);
  //     container.removeEventListener("mousemove", handleMove);
  //     container.removeEventListener("mouseup", handleUp);
  //     container.removeEventListener("mouseleave", handleUp);
  //   };
  // }, []);

  return (
    <main className="bg-white">
      <div
        ref={containerRef}
        className="fixed top-0 left-0 h-full w-full overflow-hidden"
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
              const scale = newZoom / zoom;
              setZoom(newZoom);
              setOffset((prev) => ({
                x: prev.x * scale,
                y: prev.y * scale,
              }));
            }}
          />
          <div className="text-center text-sm">Zoom: {zoom}px</div>
        </div>
      </div>
    </main>
  );
};

export default ZoomPage;
