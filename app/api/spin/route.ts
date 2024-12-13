import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/supabase'

const dataFilePath = path.join(process.cwd(), "data", "pies.json");
const supabase = createClient('https://fokvqixmjzqavisdeqim.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZva3ZxaXhtanpxYXZpc2RlcWltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwOTc0MDYsImV4cCI6MjA0OTY3MzQwNn0.-sJ66UjMKpTsq4vxTeZouc_qG_hFXUA-QVx7KYhjjBM');

export async function POST(req: NextRequest) {
  try {
    const jsonData = fs.readFileSync(dataFilePath, "utf-8");
    const prizes = JSON.parse(jsonData);

    // Randomly pick a prize
    const randomIndex = Math.floor(Math.random() * prizes.length);
    // const selectedPrize = prizes[randomIndex];

    const data = await req.json();

    const { error } = await supabase
      .from('spins')
      .insert({ ...data, imageName: `${data.imageName}${randomIndex}` })
      
    console.log(error);

    return NextResponse.json({ prize: randomIndex });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to get prize." },
      { status: 500 }
    );
  }
}
