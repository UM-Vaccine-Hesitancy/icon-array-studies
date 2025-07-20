import { IconArray } from "@/types/types";
import React from "react";
import MainPanelItem from "./MainPanelItem";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { hashids } from "@/utils/hashId";
import { cn } from "@/lib/utils";

function MainPanel({
  iconArrays,
  onSelect,
  selectedIconArray,
  className,
}: {
  iconArrays: IconArray[];
  onSelect: (id: number) => void;
  selectedIconArray: IconArray | null;
  className?: string;
}) {
  return (
    <section className={cn("flex flex-col justify-between", className)}>
      <div className="flex flex-col gap-4">
        {iconArrays.map((arr, idx) => (
          <MainPanelItem
            key={`icon-array-${idx}`}
            name={arr.name}
            id={hashids.encode(arr.id)}
            onClick={() => onSelect(arr.id)}
            selected={selectedIconArray?.id === arr.id}
          />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <Separator />
        <div className="flex gap-4">
          <Input />
          <Button disabled>Create</Button>
        </div>
      </div>
    </section>
  );
}

export default MainPanel;
