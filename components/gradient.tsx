"use client";

import ScrollListener from "@/components/scroll-listener";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Gradient = () => {
  const params = useSearchParams();
  const columns = params.get("col") ? Number(params.get("col")) : 50;
  const rows = params.get("row") ? Number(params.get("row")) : 20000;

  const [height, setHeight] = useState(80000); // default height

  useEffect(() => {
    const updateHeight = () => {
      const width = window.innerWidth;
      const cellSize = width / columns;
      setHeight(cellSize * rows);
    };

    updateHeight(); // initial run
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <main className="flex justify-center bg-white px-4">
      <div
        className="hide-scrollbar h-[100vh] w-full overflow-auto bg-white"
        id="gradient-scroll-container"
      >
        <div
          style={{
            height: `${height}px`,
            width: "100%",
            background: `linear-gradient(to bottom, 
              red, 
              orange, 
              yellow, 
              green, 
              blue, 
              indigo, 
              violet
            )`,
          }}
        />
      </div>
      <ScrollListener targetId="gradient-scroll-container" />
    </main>
  );
};

export default Gradient;
