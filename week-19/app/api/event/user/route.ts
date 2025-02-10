import prisma from "@/app/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function POST(req: NextRequest) {
  const requiredBody = z.object({
    userId: z.string(),
  });

  const body = await req.json();
  console.log(body);
  const parsedBody = requiredBody.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json({ error: "Invalid user id ." });
  }
  const { userId } = parsedBody.data;

  try {
    const events = await prisma.user.findMany({
      where: {
        id: userId,
      },
      include: {
        events: true,
      },
    });

    return NextResponse.json(events);
  } catch (e) {
    return NextResponse.json({ error: "Can't get events" });
  }
}

export async function PUT(req: NextRequest) {
  const requiredBody = z.object({
    userId: z.string(),
    eventId: z.string(),
  });

  const body = await req.json();
  const parsedBody = requiredBody.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json({ error: "Invalid data." });
  }
  const { userId, eventId } = parsedBody.data;

  try {
    const bookedEvents = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        events: true,
      },
    });

    if (bookedEvents?.events.find((e) => e.id === eventId)) {
      return NextResponse.json({ message: "Event already booked." });
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        events: {
          connect: {
            id: eventId,
          },
        },
      },
      include: {
        events: true,
      },
    });

    return NextResponse.json({ message: "Event booked." });
  } catch (e) {
    return NextResponse.json({ error: "Can't book event." });
  }
}
