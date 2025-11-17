// app/gradient/page.tsx
import { Suspense } from "react";
import Gradient from "@/components/gradient";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Gradient />
    </Suspense>
  );
}
