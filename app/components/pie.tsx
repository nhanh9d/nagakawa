// components/PieChart.tsx
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

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

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const ref = useRef<SVGSVGElement | null>(null);
  const [spinning, setSpinning] = useState(false); // Spin state
  const [rotation, setRotation] = useState(0); // Current rotation
  const [prize, setPrize] = useState<string | null>(null); // Selected prize

  const spin = async () => {
    if (spinning) return; // Prevent multiple spins
    setSpinning(true);

    const response = await fetch("/api/spin", { method: "POST" });
    const result = await response.json();

    const prizeIndex = result.index;
    const slices = data.length;
    const anglePerSlice = 360 / slices;

    // Calculate rotation angle to land on the prize
    const randomTurns = 3; // Additional full rotations for a smoother spin
    const finalAngle =
      randomTurns * 360 +
      anglePerSlice * (slices - prizeIndex - 1) +
      anglePerSlice / 2; // Offset to center on the slice

    setRotation((prev) => prev + finalAngle); // Increment rotation
    setPrize(result.prize); // Store the prize

		console.log(prize);
  };

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove(); // Clear previous renders

    const width = 500;
    const height = 500;
    const radius = Math.min(width, height) / 2;

    svg.attr("width", width).attr("height", height);

    const pie = d3.pie<PieChartData>().value(() => 1);

    const arc = d3
      .arc<d3.PieArcDatum<PieChartData>>()
      .innerRadius(0)
      .outerRadius(radius);

    const imageArc = d3
      .arc<d3.PieArcDatum<PieChartData>>()
      .innerRadius(radius * 0.75) // Position images near the border
      .outerRadius(radius * 0.75);

    const wrapper = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const wheel = wrapper
      .append("g")
      .attr("class", "rotating-group")
      .attr("style", `transform: rotate(${rotation}deg)`);

    // Add slices
    wheel
      .selectAll("path")
      .data(pie(data))
      .join("path")
      .attr("d", arc)
      .attr("fill", (d, i) => (i % 2 === 0 ? "#FFFFFF" : "#046B38")) // Alternating colors
      .attr("stroke", "#046B38") // Border color
      .attr("stroke-width", 0);

    // Add images along the radius and align with the centerline of each slice
    wheel
      .selectAll("image")
      .data(pie(data))
      .join("image")
      .attr("xlink:href", (d) => d.data.img)
      .attr("width", 40) // Fixed width
      .attr("height", 40) // Fixed height
      .attr("transform", (d) => {
        const [x, y] = imageArc.centroid(d); // Use imageArc for consistent positioning
        return `translate(${x - 20}, ${y - 20})`; // Offset by half the image size to center it
      });

    // Add text radiating outward
    wheel
      .selectAll("text")
      .data(pie(data))
      .join("text")
      .attr("transform", (d) => {
        const angle = (d.startAngle + d.endAngle) / 2; // Middle angle of the slice
        const x = Math.cos(angle) * radius * 0.5; // Position text closer to the center
        const y = Math.sin(angle) * radius * 0.5; // Position text closer to the center
        const rotate = (angle * 180) / Math.PI; // Convert to degrees and adjust by 90
        return `translate(${x}, ${y}) rotate(${rotate + 90})`;
      })
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .attr("fill", (d, i) => (i % 2 === 0 ? "#D54754" : "#FFFFFF")) // Alternating colors
      .text((d) => d.data.label)
      .each(function (d) {
        // Wrap text along the radius
        const words = d.data.label.split("#");
        const text = d3.select(this);
        text.text(null);
        words.forEach((word, i) => {
          text
            .append("tspan")
            .text(word)
            .attr("x", 0)
            .attr("dy", i === 0 ? "0.8em" : "1em");
        });
      });

    wrapper
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 30)
      .attr("fill", "#333")
      .style("cursor", "pointer")
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .on("click", () => spin());
  }, [data, rotation]);

  return <svg ref={ref}></svg>;
};

export default PieChart;
