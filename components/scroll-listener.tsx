// components/scroll-listener.tsx
"use client";

import { useEffect, useRef, useState } from "react";

const ScrollListener = ({
  targetId,
  showScrollbar = true,
}: {
  targetId: string;
  showScrollbar?: boolean;
}) => {
  const [progress, setProgress] = useState(0);
  const hasPosted = useRef(false);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    const handleScroll = () => {
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      const newProgress =
        scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      setProgress(newProgress);

      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
      if (atBottom && !hasPosted.current) {
        hasPosted.current = true;
        console.log("Sending 'scrollBottom' to parent window");
        window.parent.postMessage("scrollBottom", "*");
      }
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [targetId]);

  return showScrollbar ? (
    <div
      className="pointer-events-none fixed top-0 right-1 z-50 h-full w-1.5 bg-black/20"
      aria-hidden
    >
      <div
        className="w-full bg-blue-500 transition-all duration-75"
        style={{ height: `${progress}%` }}
      />
    </div>
  ) : null;
};

export default ScrollListener;
