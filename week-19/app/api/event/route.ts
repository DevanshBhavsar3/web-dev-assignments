import prisma from "@/app/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function POST(req: NextRequest) {
  const requiredBody = z.object({
    title: z.string(),
    description: z.string(),
    date: z.string().date(),
    location: z.string(),
    createdById: z.string(),
  });

  const body = await req.json();
  const parsedBody = requiredBody.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json({ error: "Invalid event data." });
  }
  const { title, description, date, location, createdById } = parsedBody.data;

  try {
    await prisma.event.create({
      data: {
        title: title,
        description: description,
        date: new Date(date),
        location: location,
        createdById: createdById,
      },
    });
    return NextResponse.json({ message: "Event added." });
  } catch (e) {
    return NextResponse.json({ error: "Somthing went wrong." });
  }
}

export async function DELETE(req: NextRequest) {
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
    await prisma.event.delete({
      where: {
        id: eventId,
        createdById: userId,
      },
    });
    return NextResponse.json({ error: "Event deleted." });
  } catch (e) {
    return NextResponse.json({ error: "Event doesn't exist." });
  }
}
