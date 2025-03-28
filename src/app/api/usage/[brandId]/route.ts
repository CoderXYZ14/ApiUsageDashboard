import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import { mockData } from "@/constants/mockData";
import { BrandData } from "@/types/brand";

export async function GET(
  request: Request,
  { params }: { params: { brandId: string } }
) {
  await dbConnect();

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Not authenticated",
        },
        { status: 401 }
      );
    }

    const { brandId } = await params;

    if (brandId !== session.user.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized access",
        },
        { status: 403 }
      );
    }

    // Get brand data from mock data
    const brandData = mockData[brandId];

    if (!brandData) {
      return NextResponse.json(
        {
          success: false,
          message: "No usage data found for this brand",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Brand usage data fetched successfully",
        data: brandData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching brand usage data:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching usage data",
      },
      { status: 500 }
    );
  }
}
