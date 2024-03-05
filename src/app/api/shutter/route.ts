import { NextResponse } from "next/server";

export const GET = () => {
  return NextResponse.json(
    {
      message: `Shutter was pressed ${18.556}`,
    },
    { status: 200 },
  );
};
