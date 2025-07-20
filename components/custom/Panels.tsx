"use client";

import React, { useState } from "react";
import MainPanel from "./MainPanel";
import { IconArray } from "@/types/types";
import SubPanel from "./SubPanel";
import { Separator } from "../ui/separator";
import { iconArrays } from "@/data/arrays";

// Note: Backend stuff commented out
function Panels() {
  // const [iconArrays, setIconArrays] = useState<IconArray[]>([]);
  const [selectedIconArray, setSelectedIconArray] = useState<IconArray | null>(
    null,
  );

  // useEffect(() => {
  //   console.log("Backend URL:", process.env.NEXT_PUBLIC_BACKEND_URL);
  //   fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/iconarray`)
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error(`HTTP error! Status: ${res.status}`);
  //       }
  //       return res.json();
  //     })
  //     .then((data: IconArray[]) => {
  //       setIconArrays(data);
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching icon arrays:", error);
  //     });
  // }, []);

  const handleSelectIconArray = (id: number) => {
    const found = iconArrays.find((item) => item.id === id);
    setSelectedIconArray(found ?? null);
  };

  return (
    <main className="flex h-[90vh] w-[100vw] justify-between gap-4 p-4">
      <MainPanel
        className="w-[20%]"
        iconArrays={iconArrays}
        onSelect={handleSelectIconArray}
        selectedIconArray={selectedIconArray}
      />
      <Separator orientation="vertical" />
      <SubPanel className="w-[78%]" iconArray={selectedIconArray} />
    </main>
  );
}

export default Panels;
