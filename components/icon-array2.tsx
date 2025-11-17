"use client";

import React, { useEffect, useRef, useState } from "react";
import { IconArray, Point } from "@/types/types";

const IconArrayCanvasV2 = ({
  iconArray,
  chunk,
  chunkHeight,
}: {
  iconArray: IconArray;
  chunk: number;
  chunkHeight: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasWidth, setCanvasWidth] = useState<number>(0);

  useEffect(() => {
    // Recompute canvas width on resize
    const updateWidth = () => {
      setCanvasWidth(window.innerWidth - 40);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    // Check if canvas is working properly
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (canvasWidth <= 40) return;

    // Helper Function
    const isHighlighted = (
      row: number,
      col: number,
      list: Point[]
    ): boolean => {
      for (let idx = 0; idx < list.length; idx++)
        if (
          list[idx].row === chunk * chunkHeight + row &&
          list[idx].col === col
        )
          return true;
      return false;
    };

    // Draw Icon Array
    const cols = iconArray.cols;
    console.log("Canvas Width:", canvasWidth);
    const cellSize = canvasWidth / cols;
    console.log("Cell Size:", cellSize);
    const radius = cellSize / 2 - cellSize * 0.15;

    const rows = Math.min(chunkHeight, iconArray.rows - chunk * chunkHeight);
    const highlightPoints = iconArray.highlightPoints;

    canvas.width = cols * cellSize;
    canvas.height = rows * cellSize;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cx = col * cellSize + cellSize / 2;
        const cy = row * cellSize + cellSize / 2;

        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fillStyle = isHighlighted(row, col, highlightPoints)
          ? "red"
          : "black";
        ctx.fill();
      }
    }
  }, [canvasWidth]);

  return <canvas ref={canvasRef} className="block" />;
};

export default IconArrayCanvasV2;
