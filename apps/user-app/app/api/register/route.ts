import { NextRequest, NextResponse } from "next/server";
import prisma from "@repo/db/client";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest, res: NextResponse) {
  try {
    const reqBody = await request.json();
    const { name, email, password, phone } = reqBody;

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (user) {
      return NextResponse.json(
        { error: "user already exists, duh" },
        { status: 400 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        email,
        number: phone,
        name,
        password: hashedPassword,
        Balance: {
          create: {
            amount: 0,
            locked: 0,
          },
        },
      },
    });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      newUser,
    });
  } catch (error) {
    console.log(error);
  }
}
