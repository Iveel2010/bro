import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const jwt_Secret_Code = process.env.JWT_SECRET_CODE;

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    console.log({
      email: body?.email,
      userName: body?.userName,
      password: body?.password,
    });

    const hashedPassword = await bcrypt.hash(body?.password, 10);

    const user = await prisma.user.create({
      data: {
        email: body?.email,
        userName: body?.userName,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      jwt_Secret_Code,
      { expiresIn: "72h" }
    );

    return NextResponse.json({ user, token });
  } catch (err) {
    return NextResponse.json(err);
  }
};
