// app/video/page.tsx

import { Suspense } from "react";
import VideoViewer from "@/components/video";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <VideoViewer />
    </Suspense>
  );
}
