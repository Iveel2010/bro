"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Eye,
  Clock,
  Home,
  MapPin,
  Building,
  Layers,
  Bed,
  Bath,
  Ruler,
  Phone,
  Share2,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import Autoplay from "embla-carousel-autoplay";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

type Listing = {
  id: string;
  title: string;
  price: string;
  views: number;
  description: string;
  status: string;
  type: string;
  location: string;
  size: string;
  rooms: string;
  beds: string;
  baths: string;
  floor: string;
  features: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
  user: {
    userName: string;
    profileImg: string | null;
  };
};

export default function ListingDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [listing, setListing] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchListing() {
      try {
        const res = await fetch(`/api/post/${params.id}`);
        if (!res.ok) throw new Error("Failed to fetch listing");
        const data = await res.json();
        setListing(data);
      } catch (error) {
        console.error("Error fetching listing:", error);
        setError("Failed to load listing. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchListing();
  }, [params.id]);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Here you would typically make an API call to save favorites
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: listing?.title || "Үл хөдлөх зар",
          text: listing?.description || "",
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert("Холбоосыг хууллаа!");
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Skeleton className="h-96 w-full rounded-xl" />
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-20 w-full rounded-md" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl text-center">
        <div className="text-red-500 mb-4 text-lg">{error}</div>
        <Button onClick={() => router.push("/")} variant="outline">
          Буцах
        </Button>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl text-center">
        <div className="text-gray-700 mb-4 text-lg">Зар олдсонгүй</div>
        <Button onClick={() => router.push("/")} variant="outline">
          Буцах
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Button onClick={() => router.back()} variant="ghost" className="mb-6">
        ← Буцах
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <Carousel
            className="w-full rounded-xl overflow-hidden"
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnInteraction: false,
              }),
            ]}
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {listing.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-video">
                    <img
                      src={image}
                      alt={`${listing.title} - Зураг ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {listing.images.length > 1 && (
              <>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </>
            )}
          </Carousel>

          {/* Thumbnail Gallery */}
          {listing.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {listing.images.map((image, index) => (
                <button
                  key={index}
                  className="relative aspect-square rounded-md overflow-hidden"
                  onClick={() => router.push(`#image-${index}`)}
                >
                  <img
                    src={image}
                    alt={`${listing.title} - Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Listing Details */}
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {listing.title}
              </h1>
              <p className="text-gray-600 flex items-center mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                {listing.location}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full ${
                  isFavorite ? "text-red-500" : "text-gray-500"
                }`}
                onClick={handleFavorite}
                aria-label="Add to favorites"
              >
                <Heart
                  className="w-5 h-5"
                  fill={isFavorite ? "currentColor" : "none"}
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-500"
                onClick={handleShare}
                aria-label="Share"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-blue-600">
              {listing.price}
            </span>
            {listing.status && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {listing.status}
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 border-y">
            <div className="flex items-center space-x-2">
              <Home className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Төрөл</p>
                <p className="font-medium">
                  {propertyTypes.find((t) => t.value === listing.type)?.name ||
                    listing.type}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Layers className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Талбай</p>
                <p className="font-medium">{listing.size}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Bed className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Өрөө</p>
                <p className="font-medium">{listing.rooms}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Bed className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Унтлагын өрөө</p>
                <p className="font-medium">{listing.beds}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Bath className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Угаалгын өрөө</p>
                <p className="font-medium">{listing.baths}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Ruler className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Давхар</p>
                <p className="font-medium">{listing.floor}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Тайлбар</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {listing.description}
            </p>
          </div>

          {listing.features && listing.features.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3">
                Онцлог шинж чанарууд
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {listing.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  {listing.user.profileImg ? (
                    <img
                      src={listing.user.profileImg}
                      alt={listing.user.userName}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-xl">👤</span>
                  )}
                </div>
                <div>
                  <p className="font-medium">{listing.user.userName}</p>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {new Date(listing.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">
                <Phone className="w-4 h-4 mr-2" />
                Холбогдох
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Listings Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Үүнтэй төстэй зар</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* You would fetch similar listings here */}
          {/* For now, we'll show a placeholder */}
          <div className="text-center py-8 text-gray-500">
            Үүнтэй төстэй зар олдсонгүй
          </div>
        </div>
      </div>
    </div>
  );
}

const propertyTypes = [
  { name: "Орон сууц", value: "apartment", icon: <Home className="w-4 h-4" /> },
  { name: "Хувийн байшин", value: "house", icon: <Home className="w-4 h-4" /> },
  { name: "Газар", value: "land", icon: <MapPin className="w-4 h-4" /> },
  { name: "Оффис", value: "office", icon: <Building className="w-4 h-4" /> },
];
