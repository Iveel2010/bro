import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const existingCategory = await prisma.category.findUnique({
      where: { name: body.name },
    });

    if (existingCategory) {
      return NextResponse.json(
        { message: `Category with name "${body.name}" already exists.` },
        { status: 400 }
      );
    }

    const category = await prisma.category.create({
      data: {
        name: body.name,
        subCategories: {
          create: body.subCategories.map((subCategory: any) => ({
            name: subCategory.name,
            subSubCategories: {
              create: subCategory.subSubCategories.map(
                (subSubCategory: any) => ({
                  name: subSubCategory.name,
                  chooses: {
                    create: subSubCategory.chooses.map((choose: any) => ({
                      name: choose.name,
                      options: {
                        create: choose.options.map((option: string) => ({
                          name: option,
                        })),
                      },
                    })),
                  },
                })
              ),
            },
          })),
        },
      },
    });

    return NextResponse.json({ category });
  } catch (error) {
    console.error("Error details:", error);
    return NextResponse.json(
      { message: "Error creating category", error: error.message },
      { status: 500 }
    );
  }
}
