import { NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";

// const dataFilePath = path.join(process.cwd(), "data", "pies.json");

export async function POST() {
  try {
    const prizes = [
      "Gift Voucher 5%",
      "Gift Voucher 10%",
      "100,000 VND",
      "Better Luck Next Time",
      "Gift Voucher 20%",
      "Gift Voucher 50%",
    ];

    // Randomly pick a prize
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const selectedPrize = prizes[randomIndex];

    return NextResponse.json({ prize: selectedPrize, index: randomIndex });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to save data." },
      { status: 500 }
    );
  }
}
