"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu } from "lucide-react";
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

// Define types
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

// Categories data
const categories: Category[] = [
  {
    name: "Үл хөдлөх",
    icon: "🏠",
    subCategories: ["Үл хөдлөх зарна", "Газар", "Оффис"],
  },
  {
    name: "Техник хэрэгсэл",
    icon: "💻",
    subCategories: ["Компьютер", "Гар утас", "Техник"],
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
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300); // Debounce search term
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch listings
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

  // Filter listings
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

  // Handle category selection
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    setSelectedSubCategory(null); // Reset sub-category when category changes
  };

  // Handle sub-category selection
  const handleSubCategoryClick = (subCategory: string) => {
    setSelectedSubCategory(
      subCategory === selectedSubCategory ? null : subCategory
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Navbar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between py-4 mb-8 border-b"
      >
        <h1 className="text-3xl font-bold">Amarhan.mn</h1>
        <Button variant="outline" aria-label="Menu">
          <Menu className="w-6 h-6" />
        </Button>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <Input
          placeholder="Жишээ нь: Машин, Оффис, Гар утас..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          aria-label="Search"
        />
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-6"
      >
        <h2 className="text-xl font-semibold mb-2">Категори</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          {/* "Бүх зарууд" Button */}
          <Button
            variant={!selectedCategory ? "default" : "ghost"}
            onClick={resetFilters}
            className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm border hover:bg-gray-100 transition-colors"
            aria-label="Show all listings"
          >
            <span className="text-lg">📦</span>
            <span className="text-sm font-medium">Бүх зарууд</span>
          </Button>

          {/* Category Buttons */}
          {categories.map((category) => (
            <DropdownMenu key={category.name}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={
                    selectedCategory === category.name ? "default" : "ghost"
                  }
                  className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm border hover:bg-gray-100 transition-colors"
                  onClick={() => handleCategoryClick(category.name)}
                  aria-label={`Select ${category.name}`}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span className="text-sm font-medium">{category.name}</span>
                </Button>
              </DropdownMenuTrigger>
              {selectedCategory === category.name && (
                <DropdownMenuContent>
                  {category.subCategories.map((subCategory) => (
                    <DropdownMenuItem
                      key={subCategory}
                      onClick={() => handleSubCategoryClick(subCategory)}
                      aria-label={`Select ${subCategory}`}
                      className={
                        selectedSubCategory === subCategory ? "bg-blue-50" : ""
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

      {/* Listings */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-2xl font-semibold mb-4"
      >
        {selectedCategory || "Бүх зарууд"}
      </motion.h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredListings.map((item) => (
            <Card
              key={item.id}
              className="shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative w-full h-56 bg-gray-100">
                <Carousel className="absolute w-full h-full">
                  <CarouselContent>
                    {item.images.map((image, index) => (
                      <CarouselItem key={index} className="w-full h-full">
                        <img
                          src={image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
              <CardContent className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-semibold truncate">{item.title}</h3>
                <p className="text-gray-500 text-sm truncate">
                  {item.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-bold">{item.price}</span>
                  <Button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                    Дэлгэрэнгүй
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      )}
    </div>
  );
}
