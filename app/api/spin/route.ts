import { NextRequest, NextResponse } from "next/server";
import { createCanvas, loadImage, registerFont } from "canvas";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "pies.json");

export async function GET(req: NextRequest) {
  try {
    const jsonData = fs.readFileSync(dataFilePath, "utf-8");
    const prizes = JSON.parse(jsonData);

    // Randomly pick a prize
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const selectedPrize = prizes[randomIndex];

    const { searchParams } = new URL(req.url);
    const imageName = searchParams.get("imageName"); // Get the image name from query params
    const nickname = searchParams.get("nickname"); // Get the image name from query params
  
    if (!imageName) {
      return NextResponse.json(
        { error: "Image name is required" },
        { status: 400 }
      );
    }
  
    if (!nickname) {
      return NextResponse.json(
        { error: "Nickname is required" },
        { status: 400 }
      );
    }
  
    // Register your custom font
    const fontPath = path.join(process.cwd(), "app/fonts/Hagrid-Regular-trial.ttf"); // Adjust the path if needed
    registerFont(fontPath, { family: "Hagrid" });

    // Load the image from the 'public/images' folder
    const imagePath = path.join(process.cwd(), "public", `${imageName}${randomIndex + 1}.png`);

    const image = await loadImage(imagePath);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");

    // Draw the image onto the canvas
    ctx.drawImage(image, 0, 0, image.width, image.height);

    // Configure text properties
    ctx.font = "120px Hagrid"; // Use your custom font
    ctx.fillStyle = "black"; // Text color
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Draw the text in the center of the image
    ctx.fillText(nickname, image.width / 2, image.height / 2 - 100);
    console.log("🚀 ~ GET ~ image.width / 2:", image.width / 2)

    // Stream the modified image back
    const buffer = canvas.toBuffer("image/png");
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to save data." },
      { status: 500 }
    );
  }
}
