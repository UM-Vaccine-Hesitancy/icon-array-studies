import React from "react";
import { iconArrays } from "@/data/arrays";
import IconArrayCanvas from "@/components/icon-array";
import { hashids } from "@/utils/hashId";
import ZoomCanvas from "@/components/zoom-canvas";
import ScrollListener from "@/components/scroll-listener";
import IconArrayCanvasV2 from "@/components/icon-array2";

// For static website build
export async function generateStaticParams() {
  // Return array of all possible params { arrayId: 'value' }
  return iconArrays.map((iconArray) => ({
    arrayId: hashids.encode(iconArray.id),
  }));
}

const ViewPage = async ({
  params,
}: {
  params: Promise<{ arrayId: string }>;
}) => {
  const { arrayId } = await params;
  const arrayIdNum = Number(hashids.decode(arrayId).toString());

  const arrayData = iconArrays.find((iconArray) => iconArray.id === arrayIdNum);

  if (!arrayData)
    return (
      <main className="flex justify-center bg-white">
        <div>Error: Icon Array Not found</div>
      </main>
    );

  const useVersion2 = arrayData.version && arrayData.version === 2;
  const chunkHeight = 1000;
  const totalChunks = Math.ceil(arrayData.rows / chunkHeight);

  const RenderCanvas = () => {
    if (arrayData.zoom) return <ZoomCanvas iconArray={arrayData} />;

    const CanvasComp = useVersion2 ? IconArrayCanvasV2 : IconArrayCanvas;
    return (
      <div className="px-4">
        {Array.from({ length: totalChunks }).map((_, chunk) => (
          <CanvasComp
            key={`${arrayData.id}-${chunk}`}
            iconArray={arrayData}
            chunk={chunk}
            chunkHeight={chunkHeight}
          />
        ))}
      </div>
    );
  };

  return (
    <main
      className="hide-scrollbar flex h-[100dvh] flex-col items-center overflow-auto bg-white"
      id="scrollable"
    >
      {!arrayData.zoom && <ScrollListener targetId="scrollable" />}
      {<RenderCanvas />}
    </main>
  );
};

export default ViewPage;
