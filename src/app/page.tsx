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
} from "@/components/ui/carousel";

const categoryData = [
  "Үл хөдлөх",
  "Техник хэрэгсэл",
  "Тээврийн хэрэгсэл",
  "Ажил, Мэргэжил",
  "Хувцас, гоёл чимэглэл",
  "Спорт, фитнес",
];

type Listing = {
  id: string;
  title: string;
  price: string;
  images: string[];
};

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [listings, setListings] = useState<Listing[]>([]);
  const listingsPerPage = 8;

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/product");
        const data = await res.json();
        setListings(Array.isArray(data.product) ? data.product : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-6">
      {/* Navbar */}
      <div className="flex items-center justify-between py-4 mb-8 border-b">
        <h1 className="text-3xl font-bold">Amarhan.mn</h1>
        <Button variant="outline">
          <Menu className="w-6 h-6" />
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex gap-4 mb-8">
        <Input
          placeholder="Юу хайж байна?"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
          <Search className="w-5 h-5" />
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 mb-6">
        {categoryData.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "ghost"}
            onClick={() => setSelectedCategory(category)}
            className="px-6 py-3 rounded-lg"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Listings */}
      <h2 className="text-2xl font-semibold mb-4">
        {selectedCategory || "Бүх зарууд"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {listings.map((item) => (
          <Card
            key={item.id}
            className="shadow-lg rounded-lg hover:shadow-xl transition"
          >
            <Carousel className="w-full max-w-xs">
              <CarouselContent>
                {item.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={image}
                      alt={item.title}
                      className="w-full h-64 object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600">{item.price}</p>
              <Button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white">
                Дэлгэрэнгүй
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
