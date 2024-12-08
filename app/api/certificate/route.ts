import { NextRequest, NextResponse } from "next/server";
import { createCanvas, loadImage, registerFont } from "canvas";
import path from "path";


export async function GET(req: NextRequest) {
  try {
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
    const fontPath = path.join(process.cwd(), "app/fonts/PottaOne-Regular.ttf"); // Adjust the path if needed
    registerFont(fontPath, { family: "CanvasFont" });

    // Load the image from the 'public/images' folder
    const imagePath = path.join(process.cwd(), "public", `${imageName}.png`);

    const image = await loadImage(imagePath);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");

    // Draw the image onto the canvas
    ctx.drawImage(image, 0, 0, image.width, image.height);

    // Configure text properties
    ctx.font = "150px CanvasFont"; // Use your custom font
    ctx.fillStyle = "black"; // Text color
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Draw the text in the center of the image
    ctx.fillText(nickname, image.width / 2, image.height / 2 - 100);

    // Stream the modified image back
    const buffer = canvas.toBuffer("image/png");
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "max-age",
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to load image." },
      { status: 500 }
    );
  }
}
