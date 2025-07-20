"use client";

import React, { useEffect, useRef } from "react";
import { IconArray, Point } from "@/types/types";

const IconArrayCanvas = ({
  iconArray,
  chunk,
  chunkHeight,
}: {
  iconArray: IconArray;
  chunk: number;
  chunkHeight: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Check if canvas is working properly
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Helper Function
    const isHighlighted = (
      row: number,
      col: number,
      list: Point[],
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
    const cellSize = 8;
    const paddingX = 40;
    const rows = Math.min(chunkHeight, iconArray.rows - chunk * chunkHeight);
    const cols = iconArray.cols;
    const highlightPoints = iconArray.highlightPoints;
    const radius = cellSize / 2 - 1;

    canvas.width = cols * cellSize + paddingX * 2;
    canvas.height = rows * cellSize;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cx = paddingX + col * cellSize + cellSize / 2;
        const cy = row * cellSize + cellSize / 2;

        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fillStyle = isHighlighted(row, col, highlightPoints)
          ? "red"
          : "black";
        ctx.fill();
      }
    }

    ctx.fillStyle = "black";
    ctx.font = "8px Arial";
    const text = `${((chunk * chunkHeight + rows) * cols).toLocaleString()}`;
    const textX = 0;
    const textY = canvas.height - 1;
    ctx.fillText(text, textX, textY);

    const lineLength = 8;
    ctx.beginPath();
    ctx.moveTo(textX + 35, textY - 3);
    ctx.lineTo(textX + 35 + lineLength, textY - 3);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
  }, []);

  return <canvas ref={canvasRef} className="block" />;
};

export default IconArrayCanvas;
