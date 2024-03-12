import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  await prisma.uploadedMovie.create({
    data: {
      url: "test",
    },
  });

  const shutterMovie = await prisma.uploadedMovie.findFirst({
    orderBy: {
      shutteredAt: { sort: "desc", nulls: "first" },
    },
  });

  if (!shutterMovie) {
    return NextResponse.json(
      {
        message: "No movie was shuttered",
      },
      { status: 400 },
    );
  }

  const shutteredMovie = await prisma.uploadedMovie.update({
    where: {
      id: shutterMovie.id,
    },
    data: {
      shutteredAt: new Date(),
    },
  });

  if (!shutteredMovie || !shutteredMovie.shutteredAt) {
    return NextResponse.json(
      {
        message: "Failed to update shutteredAt",
      },
      { status: 500 },
    );
  }

  if (!shutteredMovie.startedAt) {
    return NextResponse.json(
      {
        message: "Broken record: startedAt is not set",
      },
      { status: 500 },
    );
  }

  const duration =
    shutteredMovie.shutteredAt.getSeconds() -
    shutteredMovie.startedAt.getSeconds();

  const message = `Shutter was pressed ${duration} sec from beginning}`;

  console.log(message);
  return NextResponse.json(
    {
      message,
    },
    { status: 200 },
  );
};
