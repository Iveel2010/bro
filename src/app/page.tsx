"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Category Data
const categoryData = [
  {
    name: "Үл хөдлөх",
  },
  {
    name: "Техник хэрэгсэл",
  },
  {
    name: "Тээврийн хэрэгсэл",
  },
  {
    name: "Ажил, Мэргэжил",
  },
  {
    name: "Хувцас, гоёл чимэглэл",
  },
  {
    name: "Спорт, фитнес",
  },
];

type Listings = {
  id: string;
  createdAt: string;
  description: string;
  images: string[];
  price: string;
  status: string;
  title: string;
  updatedAt: string;
  views: string;
};
export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [listings, setListings] = useState<Listings>([]);
  const listingsPerPage = 8;
  const getProduct = async () => {
    try {
      const resJSON = await fetch("/api/product", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await resJSON.json();

      console.log("Fetched Data:", data); // Debugging
      if (Array.isArray(data.product)) {
        setListings(data.product); // Ensure it's an array
      } else {
        console.log("shut"); // Prevent errors
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  // Pagination Logic
  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-6">
      {/* Navbar */}
      <div className="flex items-center justify-between py-4 mb-8 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800">Amarhan.mn</h1>
        <Button variant="outline" className="text-gray-700 hover:text-gray-900">
          <Menu className="w-6 h-6" />
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-4 mb-8">
        <Input
          placeholder="Юу хайж байна?"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          variant="default"
          className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Search className="w-5 h-5" />
        </Button>
      </div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap gap-4 mb-6"
      >
        {categoryData.map((category) => (
          <div key={category.name} className="relative">
            {/* Main Category Button */}
            <Button
              variant={selectedCategory === category.name ? "default" : "ghost"}
              onClick={() => {
                setSelectedCategory(
                  selectedCategory === category.name ? "" : category.name
                );
                setSelectedSubCategory("");
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 hover:bg-blue-50 hover:text-blue-700"
            >
              <span className="font-semibold">{category.name}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  selectedCategory === category.name ? "rotate-180" : ""
                }`}
              />
            </Button>

            {/* Subcategory Dropdown */}
            <AnimatePresence>
              {selectedCategory === category.name && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-12 left-0 bg-white shadow-lg rounded-lg p-4 w-64 z-10"
                >
                  <div className="flex flex-col gap-2">
                    {category.subCategories.map((subCategory) => (
                      <Button
                        key={subCategory.name}
                        variant={
                          selectedSubCategory === subCategory.name
                            ? "default"
                            : "ghost"
                        }
                        onClick={() =>
                          setSelectedSubCategory(
                            selectedSubCategory === subCategory.name
                              ? ""
                              : subCategory.name
                          )
                        }
                        className="w-full text-left px-4 py-2 rounded-lg transition-all duration-300 hover:bg-blue-50 hover:text-blue-700"
                      >
                        {subCategory.name}
                      </Button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </motion.div>

      {/* Listings */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        {selectedCategory || "Бүх зарууд"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {listings.map((item) => (
          <Card
            key={item.id}
            className="shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-transform transform hover:scale-105"
          >
            <Carousel className="w-full max-w-xs">
              <CarouselContent>
                {item.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={image}
                      alt={item.title}
                      className="w-full h-72 object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <CardContent className="p-4 bg-white">
              <h3 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.price}</p>
              <Button className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Дэлгэрэнгүй
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-8">
        {Array.from(
          { length: Math.ceil(listings.length / listingsPerPage) },
          (_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "default" : "ghost"}
              onClick={() => paginate(i + 1)}
              className="mx-1"
            >
              {i + 1}
            </Button>
          )
        )}
      </div>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t text-center text-gray-500">
        <p>© 2025 Amarhan.mn. Бүх эрх хуулиар хамгаалагдсан.</p>
      </footer>
    </div>
  );
}
