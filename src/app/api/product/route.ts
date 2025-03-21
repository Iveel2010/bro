import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const product = await prisma.product.findMany();
  return NextResponse.json({ product });
};
