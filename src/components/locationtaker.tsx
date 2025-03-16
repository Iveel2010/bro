"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const locations = {
  Улаанбаатар: {
    Сүхбаатар: ["1-р хороолол", "11-р хороолол", "Бага тойруу"],
    Баянгол: ["3-р хороолол", "25-р хороолол"],
    Баянзүрх: ["13-р хороолол", "16-р хороолол"],
  },
};

export default function LocationSelector({ onSelect = () => {} }) {
  const [open, setOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [search, setSearch] = useState("");
  const [lastSelected, setLastSelected] = useState("");

  const handleSelect = (district, subDistrict) => {
    const fullLocation = `${selectedCity} - ${district} - ${subDistrict}`;
    setLastSelected(fullLocation);
    onSelect(fullLocation);
    setOpen(false);
    setSelectedCity(null);
    setSelectedDistrict(null);
    setSearch("");
  };

  const handleBack = () => {
    if (selectedDistrict) {
      setSelectedDistrict(null);
    } else if (selectedCity) {
      setSelectedCity(null);
    }
  };

  const filteredLocations = () => {
    if (!selectedCity) {
      return Object.keys(locations).filter((city) =>
        city.toLowerCase().includes(search.toLowerCase())
      );
    } else if (!selectedDistrict) {
      return Object.keys(locations[selectedCity] || {}).filter((district) =>
        district.toLowerCase().includes(search.toLowerCase())
      );
    } else {
      return locations[selectedCity][selectedDistrict].filter((subDistrict) =>
        subDistrict.toLowerCase().includes(search.toLowerCase())
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="min-w-[200px] bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-800"
        >
          {lastSelected || "Байршил сонгох"}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-md p-6 rounded-lg shadow-xl bg-white">
        <DialogTitle className="text-xl font-bold mb-4 text-blue-900">
          Байршил сонгох
        </DialogTitle>
        {selectedCity && (
          <div className="text-sm text-blue-600 mb-3">
            Сонгосон:{" "}
            <span className="font-medium text-blue-800">
              {selectedCity}
              {selectedDistrict && ` - ${selectedDistrict}`}
            </span>
          </div>
        )}
        <Input
          placeholder="Хот, дүүрэг, хороолол хайх..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 border-blue-300"
        />
        <ScrollArea className="h-80">
          {(selectedCity || selectedDistrict) && (
            <Button
              variant="outline"
              className="mb-3 w-full text-left text-sm px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
              onClick={handleBack}
            >
              ← Буцах
            </Button>
          )}
          {filteredLocations().map((item) => (
            <Button
              key={item}
              variant="ghost"
              className="w-full text-left p-3 text-blue-700 hover:bg-blue-50 hover:text-blue-900 rounded-lg transition-colors duration-200"
              onClick={() => {
                if (!selectedCity) {
                  setSelectedCity(item);
                } else if (!selectedDistrict) {
                  setSelectedDistrict(item);
                } else {
                  handleSelect(selectedDistrict, item);
                }
              }}
            >
              {item}
            </Button>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
