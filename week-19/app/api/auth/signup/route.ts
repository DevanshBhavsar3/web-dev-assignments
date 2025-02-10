import prisma from "@/app/lib/prismadb";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function POST(req: NextRequest) {
  const requiredBody = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
  });
  const body = await req.json();
  const parsedBody = requiredBody.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json({ error: "Please provide valid credentials." });
  }

  try {
    await prisma.user.create({
      data: {
        username: parsedBody.data.username,
        email: parsedBody.data.email,
        password: parsedBody.data.password,
      },
    });

    return NextResponse.json({ message: "Signed up." });
  } catch (e) {
    return NextResponse.json({ error: "Email already exists." });
  }
}
