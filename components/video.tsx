"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay /*, faRotateRight*/ } from "@fortawesome/free-solid-svg-icons";

const VideoViewer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const searchParams = useSearchParams();

  const [hasStarted, setHasStarted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    const speedParam = searchParams.get("speed");
    const playbackRate = speedParam ? parseFloat(speedParam) : 1;

    if (videoRef.current && !isNaN(playbackRate)) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [searchParams]);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setHasStarted(true);
      setHasEnded(false);
    }
  };

  // const handleReplay = () => {
  //   if (videoRef.current) {
  //     videoRef.current.currentTime = 0;
  //     videoRef.current.play();
  //     setHasEnded(false);
  //   }
  // };

  // useEffect(() => {
  //   const video = videoRef.current;
  //   if (!video) return;

  //   const handleEnded = () => setHasEnded(true);
  //   video.addEventListener("ended", handleEnded);
  //   return () => video.removeEventListener("ended", handleEnded);
  // }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setHasEnded(true);
      console.log("Video ended, sending message to parent.");
      window.parent.postMessage("videoEnded", "*");
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, []);

  const basePath =
    process.env.NODE_ENV === "production" ? "/icon-array-studies" : "";

  const version = searchParams.get("version");
  const isScroll = searchParams.has("scroll");
  let videoFile = version === "2" ? "zoom-2.mp4" : "zoom.mp4";
  videoFile = isScroll ? "scroll.mp4" : videoFile;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <video
        ref={videoRef}
        src={`${basePath}/${videoFile}`}
        playsInline
        controls={false}
        className="absolute inset-0 h-full w-full object-contain"
      />

      {!hasStarted && !hasEnded && (
        <button
          onClick={handlePlay}
          className="z-10 size-16 rounded-full bg-black/80 text-lg shadow transition hover:bg-black/90"
        >
          <FontAwesomeIcon icon={faPlay} />
        </button>
      )}

      {/*hasEnded && (
        <button
          onClick={handleReplay}
          className="z-10 size-16 rounded-full bg-black/80 text-lg shadow transition hover:bg-black/90"
        >
          <FontAwesomeIcon icon={faRotateRight} />
        </button>
      )*/}
    </div>
  );
};

export default VideoViewer;
