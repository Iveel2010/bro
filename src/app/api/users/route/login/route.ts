import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

const jwt_Secret_Code = process.env.JWT_SECRET_CODE;

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return new Response(JSON.stringify({ message: "Invalid credentials" }), {
        status: 401,
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    const token = sign({ userId: user.id }, jwt_Secret_Code, {
      expiresIn: "24h",
    });

    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error logging in" }), {
      status: 500,
    });
  }
}
