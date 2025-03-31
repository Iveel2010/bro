import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Validate ID
    if (!id) {
      return NextResponse.json(
        { error: "ID parameter is required" },
        { status: 400 }
      );
    }

    // Find the listing with related data
    const listing = await prisma.listing.findUnique({
      where: { id },
      include: {
        images: true,
        user: {
          select: {
            id: true,
            name: true,
            phone: true,
            email: true,
          },
        },
      },
    });

    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    // Increment view count
    await prisma.listing.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    // Format the response
    const response = {
      id: listing.id,
      title: listing.title,
      price: listing.price,
      views: listing.views + 1, // Reflect the incremented value
      description: listing.description,
      status: listing.status,
      images: listing.images.map((img) => img.url),
      type: listing.type,
      location: listing.location,
      size: listing.size,
      rooms: listing.rooms,
      beds: listing.beds,
      baths: listing.baths,
      floor: listing.floor,
      features: listing.features,
      createdAt: listing.createdAt.toISOString(),
      updatedAt: listing.updatedAt.toISOString(),
      contact: {
        name: listing.user.name,
        phone: listing.user.phone,
        email: listing.user.email,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching listing:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
