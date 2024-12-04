"use client";

import Image from "next/image";
import PieChart from "./components/pie";
import { useState, useEffect } from "react";

interface PieChartData {
  label: string;
  value: number;
  img: string;
}

export default function Home() {
  const [data, setData] = useState<PieChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/data");
      const jsonData = await response.json();
      setData(jsonData);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="bg-[url('/bg_mobile.png')] md:bg-[url('/bg_desktop.png')] bg-cover bg-no-repeat bg-center w-screen h-screen">
        <div>
          <Image
            className="hidden md:block fixed left-1/2 -translate-x-1/2 !max-w-full !h-auto z-10"
            aria-hidden
            src="/logo.png"
            alt="Nagakawa"
            width={398}
            height={0}
            priority
          />
          <Image
            className="hidden md:block fixed left-1/2 -translate-x-1/2 !max-w-full !h-auto z-0"
            aria-hidden
            src="/bg_logo.png"
            alt="Nagakawa"
            width={648}
            height={0}
          />
          <h1 className="hidden">Nagakawa</h1>
        </div>
        <div className="main flex h-full items-center justify-center">
          <PieChart data={data} />
        </div>
      </div>
    </>
  );
}
