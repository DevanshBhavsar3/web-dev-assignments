import prisma from "@/app/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, email, password } = await req.json();

  const result = await prisma.user.create({
    data: {
      username,
      email,
      password,
    },
  });

  console.log(result);
  return NextResponse.json({ message: "Signed up." });
}
