import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Brand from "@/model/Brand";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { name, email, password } = await request.json();

    const existingBrand = await Brand.findOne({ email });

    if (existingBrand) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already registered",
        },
        { status: 400 }
      );
    }

    const newBrand = await Brand.create({
      name,
      email,
      password,
    });

    if (!newBrand) {
      return NextResponse.json(
        {
          success: false,
          message: "Error creating brand account",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Brand account created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in brand signup:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error creating brand account",
      },
      { status: 500 }
    );
  }
}
