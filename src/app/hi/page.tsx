"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Category Data
const categoryData = [
  {
    name: "Үл хөдлөх",
    subCategories: [
      { name: "Үл хөдлөх зарна" },
      { name: "Үл хөдлөх түрээслүүлнэ" },
      { name: "Гараж зарна" },
      { name: "Оффис зарна" },
    ],
  },
  {
    name: "Техник хэрэгсэл",
    subCategories: [
      { name: "Утас" },
      { name: "Компьютер" },
      { name: "Гэр ахуйн техник" },
      { name: "Камер, зураг" },
    ],
  },
  {
    name: "Тээврийн хэрэгсэл",
    subCategories: [
      { name: "Автомашин" },
      { name: "Мотоцикл" },
      { name: "Дугуй" },
      { name: "Самолет" },
    ],
  },
  {
    name: "Ажил, Мэргэжил",
    subCategories: [
      { name: "Ажил хайх" },
      { name: "Ажилтан хайх" },
      { name: "Фриланс" },
    ],
  },
  {
    name: "Хувцас, гоёл чимэглэл",
    subCategories: [
      { name: "Эрэгтэй хувцас" },
      { name: "Эмэгтэй хувцас" },
      { name: "Гоёл чимэглэл" },
    ],
  },
  {
    name: "Спорт, фитнес",
    subCategories: [
      { name: "Фитнес тоног төхөөрөмж" },
      { name: "Дугуй, тээвэр" },
      { name: "Бусад" },
    ],
  },
];

// Listings Data
const listings = [
  {
    id: 1,
    title: "2 өрөө байр зарна",
    price: "180 сая ₮",
    image:
      "https://cdn1.unegui.mn/media/cache1/15/22/15227fac500cd64891d2f6e9f536bd1a.jpg",
    category: "Үл хөдлөх зарна",
  },
  {
    id: 2,
    title: "3 өрөө байр түрээслүүлнэ",
    price: "1.5 сая ₮/сар",
    image:
      "https://cdn1.unegui.mn/media/cache1/15/22/15227fac500cd64891d2f6e9f536bd1a.jpg",
    category: "Үл хөдлөх түрээслүүлнэ",
  },
  {
    id: 3,
    title: "Хувийн оффис зарна",
    price: "250 сая ₮",
    image:
      "https://cdn1.unegui.mn/media/cache1/27/fd/27fd7717c734d5a191a76b7dc2aeb0d6.jpg",
    category: "Үл хөдлөх зарна",
  },
  {
    id: 4,
    title: "Гараж түрээслүүлнэ",
    price: "500,000 ₮/сар",
    image: "https://www.metgar.ru/editor_images/4x6/4-6-5-mitten-sg-1.jpg",
    category: "Үл хөдлөх түрээслүүлнэ",
  },
  {
    id: 5,
    title: "iPhone 14 Pro Max зарна",
    price: "3,500,000 ₮",
    image:
      "https://alephksa.com/cdn/shop/files/iPhone_14_Pro_Max_Deep_Purple_PDP_Image_Position-1a_EN_2cc4a45e-68a5-4280-a1c6-61216aadc236.jpg?v=1688732636",
    category: "Утас",
  },
  {
    id: 6,
    title: "MacBook Pro 16 M2 зарна",
    price: "6,000,000 ₮",
    image:
      "https://www.cnet.com/a/img/resize/9624241ec6785ab68e2092e9656bc16c73d75cb1/hub/2023/01/21/ec79d7fc-9235-4830-8fc1-77db12800b97/apple-macbook-pro-16-2023-3214.jpg?auto=webp&fit=crop&height=1200&width=1200",
    category: "Компьютер",
  },
  {
    id: 7,
    title: "Toyota Prius 2020 зарна",
    price: "45,000,000 ₮",
    image:
      "https://media.ed.edmunds-media.com/toyota/prius-prime/2020/oem/2020_toyota_prius-prime_4dr-hatchback_limited_fq_oem_1_1600.jpg",
    category: "Автомашин",
  },
  {
    id: 8,
    title: "Хүүхдийн дугуй зарна",
    price: "150,000 ₮",
    image:
      "https://ubn.mn/storage/10.23/%D0%B7%D1%83%D1%80%D0%B0%D0%B311%20%2898%29.jpg",
    category: "Дугуй",
  },
  {
    id: 9,
    title: "Samsung Galaxy S23 Ultra зарна",
    price: "4,200,000 ₮",
    image: "https://m.media-amazon.com/images/I/71EYdOx09+L._AC_SL1500_.jpg",
    category: "Утас",
  },
  {
    id: 10,
    title: "Хувцасны шүүгээ зарна",
    price: "200,000 ₮",
    image:
      "https://mrp.market.mn/product_images/image/000/027/545/original.webp?1701412796",
    category: "Гэр ахуйн техник",
  },
  {
    id: 11,
    title: "Фитнес дугуй зарна",
    price: "1,200,000 ₮",
    image: "https://www.dhzfitness.com/uploads/X962-Spinning-Bike_3.jpg",
    category: "Спорт, фитнес",
  },
  {
    id: 12,
    title: "Алтан бөгж зарна",
    price: "1,500,000 ₮",
    image:
      "https://cdnp.cody.mn/spree/images/2830034/zoom/DSC03605_copy.jpg?1738167418",
    category: "Гоёл чимэглэл",
  },
];

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 8;

  // Filter Listings
  const filteredListings = listings.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? item.category.includes(selectedCategory)
      : true;
    const matchesSubCategory = selectedSubCategory
      ? item.category === selectedSubCategory
      : true;
    return matchesSearch && matchesCategory && matchesSubCategory;
  });

  // Pagination Logic
  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = filteredListings.slice(
    indexOfFirstListing,
    indexOfLastListing
  );

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
        {currentListings.map((item) => (
          <Card
            key={item.id}
            className="shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-transform transform hover:scale-105"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-72 object-cover"
            />
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
          { length: Math.ceil(filteredListings.length / listingsPerPage) },
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
