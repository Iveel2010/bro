"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Menu,
  Heart,
  Eye,
  Clock,
  Home,
  MapPin,
  Building,
  Layers,
  Plus,
  MessageCircle,
  Filter,
  X,
} from "lucide-react";
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
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamically import the map component to avoid SSR issues
const MapWithNoSSR = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

type Listing = {
  id: string;
  title: string;
  price: string;
  views: string;
  description: string;
  status: string;
  images: string[];
  type: string;
  location: string;
  size: string;
  rooms: string;
  createdAt: string;
  updatedAt: string;
  lat?: number;
  lng?: number;
  userId: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
};

const propertyTypes = [
  { name: "Орон сууц", value: "apartment", icon: <Home className="w-4 h-4" /> },
  { name: "Хувийн байшин", value: "house", icon: <Home className="w-4 h-4" /> },
  { name: "Газар", value: "land", icon: <MapPin className="w-4 h-4" /> },
  { name: "Оффис", value: "office", icon: <Building className="w-4 h-4" /> },
];

export default function RealEstatePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [roomCount, setRoomCount] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showListingForm, setShowListingForm] = useState(false);
  const [newListing, setNewListing] = useState<Partial<Listing>>({
    title: "",
    price: "",
    description: "",
    type: "apartment",
    location: "",
    size: "",
    rooms: "",
    images: [],
  });
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, string[]>>({});
  const [newMessage, setNewMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }

    fetchListings();
  }, []);

  useEffect(() => {
    fetchListings();
  }, [selectedType, debouncedSearchTerm]);

  const fetchListings = async () => {
    try {
      setIsLoading(true);
      let url = "/api/post";
      const params = new URLSearchParams();

      if (selectedType) params.append("type", selectedType);
      if (searchTerm) params.append("search", searchTerm);

      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      setListings(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load listings. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

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
    const matchesType = selectedType ? listing.type === selectedType : true;
    const matchesSearch =
      listing.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      listing.description
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase()) ||
      listing.location
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase());
    const matchesPrice =
      parseInt(listing.price.replace(/\D/g, "")) >= priceRange[0] &&
      parseInt(listing.price.replace(/\D/g, "")) <= priceRange[1];
    const matchesRooms = roomCount ? listing.rooms === roomCount : true;

    return matchesType && matchesSearch && matchesPrice && matchesRooms;
  });

  const handleTypeClick = (type: string) => {
    setSelectedType(type === selectedType ? null : type);
  };

  const resetFilters = () => {
    setSelectedType(null);
    setSearchTerm("");
    setPriceRange([0, 1000000]);
    setRoomCount(null);
    setShowFilters(false);
  };

  const handleLogin = () => {
    // In a real app, this would be a proper auth flow
    const mockUser = {
      id: "user123",
      name: "Бат",
      email: "bataa@example.com",
      phone: "99119911",
    };
    localStorage.setItem("user", JSON.stringify(mockUser));
    setCurrentUser(mockUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  const handleCreateListing = async () => {
    try {
      const listingToCreate = {
        ...newListing,
        lat: selectedLocation?.lat,
        lng: selectedLocation?.lng,
        userId: currentUser?.id,
      };

      const res = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listingToCreate),
      });

      if (!res.ok) throw new Error("Failed to create listing");

      const createdListing = await res.json();
      setListings([createdListing, ...listings]);
      setShowListingForm(false);
      setNewListing({
        title: "",
        price: "",
        description: "",
        type: "apartment",
        location: "",
        size: "",
        rooms: "",
        images: [],
      });
      setSelectedLocation(null);
    } catch (error) {
      console.error("Error creating listing:", error);
      setError("Failed to create listing. Please try again.");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const imageUrls = files.map((file) => URL.createObjectURL(file));
      setNewListing((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...imageUrls],
      }));
    }
  };

  const startChat = (listingId: string) => {
    setActiveChat(listingId);
    if (!messages[listingId]) {
      setMessages((prev) => ({ ...prev, [listingId]: [] }));
    }
  };

  const sendMessage = () => {
    if (newMessage.trim() && activeChat) {
      setMessages((prev) => ({
        ...prev,
        [activeChat]: [...(prev[activeChat] || []), newMessage],
      }));
      setNewMessage("");
    }
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
        <h1 className="text-3xl font-bold text-blue-600">Үл Хөдлөх Зар</h1>
        <div className="flex items-center gap-4">
          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <span className="hidden sm:inline">{currentUser.name}</span>
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full">
                    {currentUser.name.charAt(0)}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setShowListingForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Зар нэмэх
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  <Heart className="w-4 h-4 mr-2" />
                  Хадгалсан зар
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <X className="w-4 h-4 mr-2" />
                  Гарах
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={handleLogin}>Нэвтрэх</Button>
          )}
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="w-5 h-5" />
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
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Хайх... Жишээ нь: Хан-Уул дүүрэг, 3 өрөө байр"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              aria-label="Search"
            />
          </div>
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant={showFilters ? "default" : "outline"}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Шүүлтүүр</span>
          </Button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="mt-4 p-4 bg-gray-50 rounded-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Үнэ</h3>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([
                        parseInt(e.target.value) || 0,
                        priceRange[1],
                      ])
                    }
                    placeholder="Min"
                  />
                  <span>-</span>
                  <Input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([
                        priceRange[0],
                        parseInt(e.target.value) || 1000000,
                      ])
                    }
                    placeholder="Max"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Өрөөний тоо</h3>
                <div className="flex gap-2">
                  {["1", "2", "3", "4", "5+"].map((count) => (
                    <Button
                      key={count}
                      variant={roomCount === count ? "default" : "outline"}
                      onClick={() =>
                        setRoomCount(roomCount === count ? null : count)
                      }
                      className="px-3 py-1"
                    >
                      {count}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex items-end">
                <Button
                  onClick={resetFilters}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Шүүлтүүрийг арилгах
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Property Type Filter */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-6"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Өмчийн төрөл
        </h2>
        <div className="flex flex-wrap gap-3 mb-4">
          <Button
            variant={!selectedType ? "default" : "outline"}
            onClick={resetFilters}
            className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm"
            aria-label="Show all listings"
          >
            <span className="text-lg">🏠</span>
            <span className="text-sm font-medium">Бүх зар</span>
          </Button>

          {propertyTypes.map((type) => (
            <Button
              key={type.value}
              variant={selectedType === type.value ? "default" : "outline"}
              className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm"
              onClick={() => handleTypeClick(type.value)}
              aria-label={`Select ${type.name}`}
            >
              {type.icon}
              <span className="text-sm font-medium">{type.name}</span>
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Create Listing Modal */}
      {showListingForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Шинэ зар нэмэх</h2>
              <Button
                variant="ghost"
                onClick={() => setShowListingForm(false)}
                size="icon"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Гарчиг</label>
                <Input
                  value={newListing.title}
                  onChange={(e) =>
                    setNewListing({ ...newListing, title: e.target.value })
                  }
                  placeholder="Зарны гарчиг"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Үнэ</label>
                  <Input
                    value={newListing.price}
                    onChange={(e) =>
                      setNewListing({ ...newListing, price: e.target.value })
                    }
                    placeholder="Үнэ"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Төрөл
                  </label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full">
                        {
                          propertyTypes.find((t) => t.value === newListing.type)
                            ?.name
                        }
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {propertyTypes.map((type) => (
                        <DropdownMenuItem
                          key={type.value}
                          onClick={() =>
                            setNewListing({ ...newListing, type: type.value })
                          }
                        >
                          {type.icon}
                          <span className="ml-2">{type.name}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Хэмжээ (м²)
                  </label>
                  <Input
                    value={newListing.size}
                    onChange={(e) =>
                      setNewListing({ ...newListing, size: e.target.value })
                    }
                    placeholder="Хэмжээ"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Өрөөний тоо
                  </label>
                  <Input
                    value={newListing.rooms}
                    onChange={(e) =>
                      setNewListing({ ...newListing, rooms: e.target.value })
                    }
                    placeholder="Өрөөний тоо"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Байршил
                </label>
                <Input
                  value={newListing.location}
                  onChange={(e) =>
                    setNewListing({ ...newListing, location: e.target.value })
                  }
                  placeholder="Байршил"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Байршлыг газраас сонгох
                </label>
                <div className="h-64 rounded-lg overflow-hidden">
                  <MapWithNoSSR
                    onLocationSelect={(lat, lng) =>
                      setSelectedLocation({ lat, lng })
                    }
                  />
                </div>
                {selectedLocation && (
                  <p className="text-sm text-gray-500 mt-2">
                    Сонгосон байршил: {selectedLocation.lat.toFixed(4)},{" "}
                    {selectedLocation.lng.toFixed(4)}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Тайлбар
                </label>
                <textarea
                  value={newListing.description}
                  onChange={(e) =>
                    setNewListing({
                      ...newListing,
                      description: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-2 min-h-[100px]"
                  placeholder="Дэлгэрэнгүй тайлбар"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Зураг</label>
                <input
                  type="file"
                  multiple
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {newListing.images?.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Preview ${idx}`}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowListingForm(false)}
                >
                  Цуцлах
                </Button>
                <Button onClick={handleCreateListing}>Зар нийтлэх</Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Chat Modal */}
      {activeChat && (
        <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
          <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-medium">Чат</h3>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-blue-700"
              onClick={() => setActiveChat(null)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="p-3 h-64 overflow-y-auto">
            {messages[activeChat]?.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 p-2 rounded-lg ${
                  idx % 2 === 0
                    ? "bg-blue-100 text-blue-900"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                {msg}
              </div>
            ))}
          </div>
          <div className="p-3 border-t flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Мессеж бичих..."
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button onClick={sendMessage}>
              <MessageCircle className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Listings Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-bold text-gray-800"
          >
            {selectedType
              ? propertyTypes.find((t) => t.value === selectedType)?.name
              : "Бүх үл хөдлөх зар"}
          </motion.h2>

          {filteredListings.length > 0 && (
            <div className="text-sm text-gray-500">
              {filteredListings.length} үр дүн олдлоо
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
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

                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="line-clamp-1">{item.location}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center">
                      <Layers className="w-4 h-4 mr-1 text-gray-500" />
                      <span>{item.size}</span>
                    </div>
                    <div className="flex items-center">
                      <Home className="w-4 h-4 mr-1 text-gray-500" />
                      <span>{item.rooms}</span>
                    </div>
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
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => startChat(item.id)}
                        className="text-gray-500 hover:text-blue-500"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => router.push(`/hi/${item.id}`)}
                        variant="outline"
                        className="border-blue-500 text-blue-600 hover:bg-blue-50"
                      >
                        Дэлгэрэнгүй
                      </Button>
                    </div>
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
