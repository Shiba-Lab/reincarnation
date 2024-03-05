import { NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest) => {
  console.log(`[Shutter] Shutter was pressed ${18.556}`);

  return NextResponse.json(
    {
      message: `Shutter was pressed ${18.556}`,
    },
    { status: 200 },
  );
};
