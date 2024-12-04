import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "pies.json");

export async function GET() {
  try {
    const jsonData = fs.readFileSync(dataFilePath, "utf-8");
    const data = JSON.parse(jsonData);
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to read data." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const newData = await req.json();

    if (!Array.isArray(newData)) {
      return NextResponse.json(
        { error: "Invalid data format. Must be an array." },
        { status: 400 }
      );
    }

    fs.writeFileSync(dataFilePath, JSON.stringify(newData, null, 2));
    return NextResponse.json({ message: "Data saved successfully." });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to save data." },
      { status: 500 }
    );
  }
}
