// components/PieChart.tsx
import React from "react";
import Image from "next/image";

// Define the data type
interface PieChartData {
  label: string;
  value: number;
  img: string;
}

// Define props type
interface PieChartProps {
  data: PieChartData[];
}

const PieChart: React.FC<PieChartProps> = ({}) => {
	let currentRotation = 0;
	const spinSpeed = 10;

  const spin = () => {
    const wheel = document.getElementById("wheel");
    const spinningInterval = setInterval(() => {
      currentRotation = (currentRotation + spinSpeed) % 360;
      console.log("🚀 ~ spinningInterval ~ currentRotation:", currentRotation);
      wheel!.style.transform = `rotate(${currentRotation}deg)`;
      console.log(
        "🚀 ~ spinningInterval ~ wheel!.style.transform:",
        wheel!.style.transform
      );
    }, 20);

    setTimeout(() => {
      clearInterval(spinningInterval);
    }, 10000);
  };

  return (
    <div className="absolute left-1/4 top-1/2 -translate-y-1/2 -translate-x-1/2">
      <Image
        id="wheel"
        className="aspect-square !max-w-[600px]"
        aria-hidden
        src="/wheel.png"
        alt="Nagakawa"
        width={1000}
        height={0}
        priority
        onClick={() => spin()}
      />
      <Image
        className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
        aria-hidden
        src="/wheel_logo.png"
        alt="Nagakawa"
        width={159}
        height={0}
        priority
        onClick={() => spin()}
      />
    </div>
  );
};

export default PieChart;
