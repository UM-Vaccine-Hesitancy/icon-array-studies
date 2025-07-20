import React from "react";
import { iconArrays } from "@/data/arrays";
import IconArrayCanvas from "@/components/icon-array";
import { hashids } from "@/utils/hashId";
import ZoomCanvas from "@/components/zoom-canvas";
import ScrollListener from "@/components/scroll-listener";

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

  const chunkHeight = 1000;
  const totalChunks = Math.ceil(arrayData.rows / chunkHeight);

  return (
    <main
      className="hide-scrollbar flex h-[100dvh] flex-col items-center overflow-auto bg-white"
      id="scrollable"
    >
      {!arrayData.zoom && <ScrollListener targetId="scrollable" />}
      {arrayData.zoom ? (
        <ZoomCanvas iconArray={arrayData} />
      ) : (
        Array.from({ length: totalChunks }).map((_, chunk) => (
          <IconArrayCanvas
            key={`${arrayData.id}-${chunk}`}
            iconArray={arrayData}
            chunk={chunk}
            chunkHeight={chunkHeight}
          />
        ))
      )}
    </main>
  );
};

export default ViewPage;
