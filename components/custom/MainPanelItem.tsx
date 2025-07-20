import React from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

function MainPanelItem({
  name,
  id,
  onClick,
  selected,
}: {
  name: string;
  id: string | number;
  onClick: () => void;
  selected: boolean;
}) {
  return (
    <Card
      className={cn(
        "cursor-pointer rounded-md p-3 transition-colors",
        "hover:bg-muted",
        selected && "bg-muted",
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between gap-4">
        <h1>{name}</h1>
        <Badge>{`ID: ${id}`}</Badge>
      </div>
    </Card>
  );
}

export default MainPanelItem;
