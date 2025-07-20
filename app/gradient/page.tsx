import ScrollListener from "@/components/scroll-listener";
import React from "react";

const GradientPage = () => {
  const height = 80008;

  return (
    <main className="flex justify-center bg-white">
      <div
        className="hide-scrollbar h-[100vh] w-[888px] overflow-auto bg-white"
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

export default GradientPage;
