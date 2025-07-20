"use client";

import React, { useEffect, useRef, useState } from "react";
import { IconArray, Point } from "@/types/types";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Card } from "@/components/ui/card";

const RowCanvas = ({
  rowIndex,
  cols,
  cellSize,
  highlightPoints,
}: {
  rowIndex: number;
  cols: number;
  cellSize: number;
  highlightPoints: Point[];
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = cols * cellSize;
    canvas.height = cellSize;

    const radius = cellSize / 2 - 2;

    const highlightCols = new Set(
      highlightPoints.filter((p) => p.row === rowIndex).map((p) => p.col),
    );

    for (let col = 0; col < cols; col++) {
      const cx = col * cellSize + cellSize / 2;
      const cy = cellSize / 2;

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = highlightCols.has(col) ? "red" : "black";
      ctx.fill();
      ctx.strokeStyle = "#d1d5db";
      ctx.stroke();
    }
  }, [rowIndex, cols, cellSize, highlightPoints]);

  return <canvas ref={canvasRef} className="block" />;
};

const PreviewPage = () => {
  const iconArray: IconArray = {
    rows: 20000,
    cols: 50,
    id: 1,
    name: "Sample Icon Array",
    highlightCount: 1,
    remainder: 0,
    total: 0,
    highlightPoints: [],
  };
  const points: Point[] = [{ row: 0, col: 0 }];
  const parentRef = useRef<HTMLDivElement>(null);

  const [cellSize, setCellSize] = useState<number>(16);
  const [visibleIconIndex, setVisibleIconIndex] = useState<string>("");

  const rows = iconArray?.rows ?? 0;
  const cols = iconArray?.cols ?? 0;

  useEffect(() => {
    const maxWidth = window.innerWidth > 1440 ? 1440 : window.innerWidth;
    const newCellSize = Math.floor(
      Math.min((maxWidth - 40) / Math.max(cols, 1), 16),
    );
    setCellSize(newCellSize);
  }, [cols]);

  const rowVirtualizer = useVirtualizer({
    count: rows,
    getScrollElement: () => parentRef.current,
    estimateSize: () => cellSize,
    overscan: 100,
  });

  useEffect(() => {
    const virtualItems = rowVirtualizer.getVirtualItems();
    if (virtualItems.length > 0) {
      const firstRow = virtualItems[0].index;
      const lastRow = virtualItems[virtualItems.length - 1].index;
      const startIndex = firstRow * cols;
      const endIndex = (lastRow + 1) * cols - 1;
      setVisibleIconIndex(`${startIndex}–${endIndex}`);
    }
  }, [rowVirtualizer.getVirtualItems(), cols]);

  return (
    <main className="flex justify-center bg-white">
      <div className="flex max-h-[100dvh] w-full flex-col bg-white">
        {/* Visible icon indicator */}
        <div className="absolute top-2 right-8 z-10 w-64 rounded bg-black/70 p-2 text-center text-white shadow">
          Icon Array Scroll Progress: {visibleIconIndex}
        </div>

        <Card
          ref={parentRef}
          className="hide-scrollbar flex w-full flex-col items-center overflow-auto bg-white"
          style={{ position: "relative" }}
        >
          <div
            key={cellSize}
            style={{
              height: rowVirtualizer.getTotalSize(),
              width: cols * cellSize,
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              return (
                <div
                  key={virtualRow.key}
                  style={{
                    position: "absolute",
                    top: virtualRow.start,
                    left: 0,
                    width: "100%",
                    height: cellSize,
                  }}
                >
                  <RowCanvas
                    rowIndex={virtualRow.index}
                    cols={cols}
                    cellSize={cellSize}
                    highlightPoints={points}
                  />
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </main>
  );
};

export default PreviewPage;
