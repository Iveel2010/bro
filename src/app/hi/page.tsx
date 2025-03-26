"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, Heart, Eye, Clock } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import { useDebounce } from "use-debounce";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import Autoplay from "embla-carousel-autoplay";

type Listing = {
  id: string;
  title: string;
  price: string;
  views: string;
  description: string;
  status: string;
  images: string[];
  category: string;
  subCategory: string;
  subSubCategory: string;
  createdAt: string;
  updatedAt: string;
};

type Category = {
  name: string;
  icon: string;
  subCategories: string[];
};

const categories: Category[] = [
  {
    name: "Үл хөдлөх",
    icon: "🏠",
    subCategories: ["Үл хөдлөх зарна", "Газар", "Оффис"],
  },
  {
    name: "Техник хэрэгсэл",
    icon: "💻",
    subCategories: ["Компьютер", "Гар утас"],
  },
  {
    name: "Тээврийн хэрэгсэл",
    icon: "🚗",
    subCategories: ["Машин", "Мотоцикл", "Велосипед"],
  },
  { name: "Ажил, Мэргэжил", icon: "💼", subCategories: ["Ажил", "Мэргэжил"] },
  {
    name: "Хувцас, гоёл чимэглэл",
    icon: "👗",
    subCategories: ["Эмэгтэй хувцас", "Эрэгтэй хувцас", "Гоёл чимэглэл"],
  },
  {
    name: "Спорт, фитнес",
    icon: "🏋️",
    subCategories: [
      "Дасгалын хэрэгсэл",
      "Спортын хувцас",
      "Фитнес тоног төхөөрөмж",
    ],
  },
];

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/post");
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setListings(Array.isArray(data.posts) ? data.posts : []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load listings. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const toggleFavorite = (listingId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(listingId)) {
        newFavorites.delete(listingId);
      } else {
        newFavorites.add(listingId);
      }
      return newFavorites;
    });
  };

  const filteredListings = listings.filter((listing) => {
    return (
      (selectedCategory ? listing.category === selectedCategory : true) &&
      (selectedSubCategory
        ? listing.subCategory === selectedSubCategory
        : true) &&
      (listing.title
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase()) ||
        listing.description
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase()))
    );
  });

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    setSelectedSubCategory(null);
  };

  const handleSubCategoryClick = (subCategory: string) => {
    setSelectedSubCategory(
      subCategory === selectedSubCategory ? null : subCategory
    );
  };

  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setSearchTerm("");
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Navbar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between py-4 mb-8 border-b"
      >
        <h1 className="text-3xl font-bold text-blue-600">Amarhan.mn</h1>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Menu">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Жишээ нь: Машин, Оффис, Гар утас..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            aria-label="Search"
          />
        </div>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-6"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Категори</h2>
        <div className="flex flex-wrap gap-3 mb-4">
          <Button
            variant={!selectedCategory ? "default" : "outline"}
            onClick={resetFilters}
            className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm"
            aria-label="Show all listings"
          >
            <span className="text-lg">📦</span>
            <span className="text-sm font-medium">Бүх зарууд</span>
          </Button>

          {categories.map((category) => (
            <DropdownMenu key={category.name}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={
                    selectedCategory === category.name ? "default" : "outline"
                  }
                  className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm"
                  onClick={() => handleCategoryClick(category.name)}
                  aria-label={`Select ${category.name}`}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span className="text-sm font-medium">{category.name}</span>
                </Button>
              </DropdownMenuTrigger>
              {selectedCategory === category.name && (
                <DropdownMenuContent className="min-w-[200px]">
                  {category.subCategories.map((subCategory) => (
                    <DropdownMenuItem
                      key={subCategory}
                      onClick={() => handleSubCategoryClick(subCategory)}
                      aria-label={`Select ${subCategory}`}
                      className={
                        selectedSubCategory === subCategory
                          ? "bg-blue-50 text-blue-600"
                          : ""
                      }
                    >
                      {subCategory}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          ))}
        </div>
      </motion.div>

      {/* Listings Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-bold text-gray-800"
          >
            {selectedCategory || "Бүх зарууд"}
            {selectedSubCategory && (
              <span className="text-blue-600"> › {selectedSubCategory}</span>
            )}
          </motion.h2>

          {filteredListings.length > 0 && (
            <div className="text-sm text-gray-500">
              {filteredListings.length} үр дүн олдлоо
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full rounded-t-lg" />
                <CardContent className="p-4 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex justify-between items-center pt-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-9 w-24 rounded-md" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-red-500 mb-4 text-lg">{error}</div>
            <Button onClick={() => window.location.reload()} variant="outline">
              Дахин оролдох
            </Button>
          </div>
        ) : filteredListings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <Search className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              Илэрц олдсонгүй
            </h3>
            <p className="text-gray-500 mb-6 max-w-md">
              Хайлттай тохирох зар олдсонгүй. Өөр хайлт хийж үзэх эсвэл
              шүүлтүүрээ өөрчлөх үү?
            </p>
            <Button
              onClick={resetFilters}
              variant="outline"
              className="flex items-center gap-2"
            >
              Шүүлтүүрийг арилгах
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filteredListings.map((item) => (
              <Card
                key={item.id}
                className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 rounded-xl hover:border-blue-200"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className={`absolute top-2 right-2 z-10 rounded-full bg-white/80 hover:bg-white transition-colors shadow-sm ${
                    favorites.has(item.id)
                      ? "text-red-500"
                      : "text-gray-500 hover:text-red-500"
                  }`}
                  aria-label="Add to favorites"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item.id);
                  }}
                >
                  <Heart
                    className="w-4 h-4"
                    fill={favorites.has(item.id) ? "currentColor" : "none"}
                  />
                </Button>

                <div className="relative w-full aspect-square bg-gray-100 rounded-t-xl overflow-hidden">
                  <Carousel
                    className="w-full h-full"
                    plugins={[
                      Autoplay({
                        delay: 5000,
                        stopOnInteraction: false,
                      }),
                    ]}
                    opts={{
                      loop: true,
                      align: "start",
                    }}
                  >
                    <CarouselContent>
                      {item.images.map((image, index) => (
                        <CarouselItem key={index} className="w-full h-full">
                          <img
                            src={image}
                            alt={item.title}
                            className="w-full h-full object-fill transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>

                    {item.images.length > 1 && (
                      <>
                        <CarouselPrevious className="left-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white" />
                        <CarouselNext className="right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white" />
                      </>
                    )}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                      {item.images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-2 rounded-full transition-all ${
                            idx === 0 ? "bg-white" : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </Carousel>

                  {item.status && (
                    <Badge
                      variant="secondary"
                      className="absolute top-2 left-2 bg-white text-gray-800 border border-gray-300"
                    >
                      {item.status}
                    </Badge>
                  )}
                </div>

                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold line-clamp-2">
                      {item.title}
                    </h3>
                  </div>

                  <div className="flex items-center text-sm text-gray-500 space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-500 space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>{item.views} үзсэн</span>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-blue-600 font-bold text-lg">
                      {item.price}
                    </span>
                    <Button
                      variant="outline"
                      className="border-blue-500 text-blue-600 hover:bg-blue-50"
                    >
                      Дэлгэрэнгүй
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
