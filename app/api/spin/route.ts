import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "pies.json");

export async function POST(req: NextRequest) {
  try {
    const jsonData = fs.readFileSync(dataFilePath, "utf-8");
    const prizes = JSON.parse(jsonData);

    // Randomly pick a prize
    const randomIndex = Math.floor(Math.random() * prizes.length);
    // const selectedPrize = prizes[randomIndex];

    return NextResponse.json({ prize: randomIndex });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to get prize." },
      { status: 500 }
    );
  }
}
