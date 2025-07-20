import { cn } from "@/lib/utils";
import { IconArray } from "@/types/types";
import React from "react";
// import PointForm from "./PointForm";
import { Separator } from "../ui/separator";
import IconArrayCanvas from "../icon-array";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";
import Link from "next/link";
import { hashids } from "@/utils/hashId";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ZoomCanvas from "../zoom-canvas";

function SubPanel({
  className,
  iconArray,
}: {
  className?: string;
  iconArray: IconArray | null;
}) {
  if (!iconArray)
    return (
      <section className={cn("flex items-center justify-center", className)}>
        <p>Please Select an Icon Array to Get Started</p>
      </section>
    );

  const chunkHeight = 1000;
  const totalChunks = Math.ceil(iconArray.rows / chunkHeight);

  return (
    <section className={cn("flex flex-col gap-4", className)}>
      <Card className={cn("flex-row items-center gap-2 p-4")}>
        <h2 className="mr-4 text-xl font-semibold">{iconArray.name}</h2>
        <Badge>Rows: {iconArray.rows}</Badge>
        <Badge>Cols: {iconArray.cols}</Badge>
        <Badge>Remainder: {iconArray.remainder}</Badge>
        <Badge>Total: {iconArray.total}</Badge>
        <Badge>Highlight Count: {iconArray.highlightCount}</Badge>
        <Badge>Zoom: {iconArray.zoom ? "true" : "false"}</Badge>
        <div className="flex flex-1 justify-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`/view/${hashids.encode(iconArray.id)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="size-8">
                  <FontAwesomeIcon icon={faEye} />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>View Array in New Page</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </Card>
      <Separator />
      <Card className="flex flex-1 flex-col items-center overflow-auto bg-white py-0">
        {iconArray.zoom ? (
          <ZoomCanvas iconArray={iconArray} />
        ) : (
          Array.from({ length: totalChunks }).map((_, chunk) => (
            <IconArrayCanvas
              key={`${iconArray.id}-${chunk}`}
              iconArray={iconArray}
              chunk={chunk}
              chunkHeight={chunkHeight}
            />
          ))
        )}
      </Card>
    </section>
  );
}

export default SubPanel;
