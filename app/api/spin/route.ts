import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "pies.json");
const spinDataFilePath = path.join(process.cwd(), "data", "spins.json");

export async function POST(req: NextRequest) {
  try {
    const jsonData = fs.readFileSync(dataFilePath, "utf-8");
    const prizes = JSON.parse(jsonData);

    // Randomly pick a prize
    const randomIndex = Math.floor(Math.random() * prizes.length);
    // const selectedPrize = prizes[randomIndex];

    const data = await req.json();
    const spinData = fs.readFileSync(spinDataFilePath, "utf-8");
    let spins = JSON.parse(spinData);

    const newSpin = { ...data, imageName: `${data.imageName}${randomIndex}` };
    spins = spins ? [...spins, newSpin] : [newSpin];
    fs.writeFileSync(spinDataFilePath, JSON.stringify(spins, null, 2));

    return NextResponse.json({ prize: randomIndex });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to get prize." },
      { status: 500 }
    );
  }
}
