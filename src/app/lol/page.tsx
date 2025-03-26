"use client";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LocationSelector from "@/components/locationtaker";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
const categories = [
  {
    name: "Үл хөдлөх",
    icon: "🏠",
    subcategories: [
      {
        name: "Үл хөдлөх зарна",
        subcategories: [
          {
            name: "Орон сууц зарна",
            chooses: [
              {
                choosesName: "Өрөөний тоо",
                choosesOptions: [
                  "1 өрөө",
                  "2 өрөө",
                  "3 өрөө",
                  "4 өрөө",
                  "5 өрөө",
                  "6+ өрөө",
                ],
              },
              {
                choosesName: "Байршил",
                choosesOptions: ["УБ", "Дархан", "Эрдэнэт", "Бусад"],
              },
              {
                choosesName: "Үнэ (сая ₮)",
                choosesOptions: ["50 хүртэл", "50-100", "100-200", "200+"],
              },
            ],
          },
          {
            name: "Монгол гэр зарна",
            chooses: [
              {
                choosesName: "Ханын тоо",
                choosesOptions: [
                  "4 ханатай",
                  "5 ханатай",
                  "6 ханатай",
                  "7+ ханатай",
                ],
              },
              {
                choosesName: "Үнэ (сая ₮)",
                choosesOptions: ["10 хүртэл", "10-20", "20-30", "30+"],
              },
            ],
          },
        ],
      },
      {
        name: "Үл хөдлөх түрээслүүлэх",
        subcategories: [
          {
            name: "Орон сууц түрээслүүлэх",
            chooses: [
              {
                choosesName: "Өрөөний тоо",
                choosesOptions: [
                  "1 өрөө",
                  "2 өрөө",
                  "3 өрөө",
                  "4 өрөө",
                  "5 өрөө",
                  "6+ өрөө",
                ],
              },
              {
                choosesName: "Байршил",
                choosesOptions: ["УБ", "Дархан", "Эрдэнэт", "Бусад"],
              },
              {
                choosesName: "Үнэ (сая ₮)",
                choosesOptions: ["50 хүртэл", "50-100", "100-200", "200+"],
              },
            ],
          },
          {
            name: "Монгол гэр түрээслүүлэх",
            chooses: [
              {
                choosesName: "Ханын тоо",
                choosesOptions: [
                  "4 ханатай",
                  "5 ханатай",
                  "6 ханатай",
                  "7+ ханатай",
                ],
              },
              {
                choosesName: "Үнэ (сая ₮)",
                choosesOptions: ["10 хүртэл", "10-20", "20-30", "30+"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Автомашин",
    icon: "🚗​",
    subcategories: [
      {
        name: "Автомашин зарна",
        subcategories: [
          {
            name: "Mercedes-Benz",
            chooses: [
              {
                choosesName: "Class",
                choosesOptions: [
                  "A-Class",
                  "B-Class",
                  "C-Class",
                  "CL-Class",
                  "CLA-Class",
                  "CLK-Class",
                  "CLS-Class",
                  "E-Class",
                  "G-Class",
                  "GL-Class",
                  "GLA-Class",
                  "GLK-Class",
                  "GLS",
                  "M-Class",
                  "R-Class",
                  "S-Class",
                  "SL-Class",
                  "SLK-Class",
                  "SLR McLaren",
                  "SLS AMG",
                  "Sprinter",
                  "Бусад",
                ],
              },
              {
                choosesName: "Дугаар Нөхцөл",
                choosesOptions: [
                  "Дугаар авсан",
                  "Дугаар аваагүй",
                  "00 гүйлттэй",
                ],
              },
              {
                choosesName: "Төрөл",
                choosesOptions: ["Жийп", "Суудлын тэрэг", "Гэр бүлийн"],
              },
              {
                choosesName: "Хаалга",
                choosesOptions: ["2", "3", "4", "5", "6"],
              },
              {
                choosesName: "Хүрд",
                choosesOptions: ["Зөв", "Буруу"],
              },
              {
                choosesName: "Хөтлөгч",
                choosesOptions: ["Урдаа FWD", "Хойноо RWD", "Бүх дугуй 4WD"],
              },
              {
                choosesName: "Үйлдвэрлэсэн он",
                choosesOptions: [
                  "2025",
                  "2024",
                  "2023",
                  "2022",
                  "2021",
                  "2020",
                  "2019",
                  "2018",
                  "2017",
                  "2016",
                  "2015",
                  "2014",
                  "2013",
                  "2012",
                  "2011",
                  "2010",
                  "2009",
                  "2008",
                  "2007",
                  "2006",
                  "2005",
                  "2004",
                  "2003",
                  "2002",
                  "2001",
                  "2000",
                  "1999",
                  "1998",
                  "1997",
                  "1996",
                  "1995",
                  "1994",
                  "1993",
                  "1992",
                  "1991",
                  "1990",
                  "1989",
                  "1988",
                  "1987",
                  "1986",
                  "1985",
                  "1984",
                  "1983",
                  "1982",
                  "1981",
                  "1980",
                ],
              },
              {
                choosesName: "Орж ирсэн он",
                choosesOptions: [
                  "2025",
                  "2024",
                  "2023",
                  "2022",
                  "2021",
                  "2020",
                  "2019",
                  "2018",
                  "2017",
                  "2016",
                  "2015",
                  "2014",
                  "2013",
                  "2012",
                  "2011",
                  "2010",
                  "2009",
                  "2008",
                  "2007",
                  "2006",
                  "2005",
                  "2004",
                  "2003",
                  "2002",
                  "2001",
                  "2000",
                  "1999",
                  "1998",
                  "1997",
                  "1996",
                  "1995",
                  "1994",
                  "1993",
                  "1992",
                  "1991",
                  "1990",
                  "1989",
                  "1988",
                  "1987",
                  "1986",
                  "1985",
                  "1984",
                  "1983",
                  "1982",
                  "1981",
                  "1980",
                ],
              },
              {
                choosesName: "Хөдөлгүүр",
                choosesOptions: [
                  "Бензин",
                  "Дизель",
                  "Газ",
                  "Хайбрид",
                  "Цахилгаан",
                ],
              },
            ],
          },
          {
            name: "Toyota",
            chooses: [
              {
                choosesName: "Машины нэр",
                choosesOptions: [
                  "4Runner",
                  "Allex",
                  "Allion",
                  "Alphard",
                  "Altezza",
                  "Aqua",
                  "Auris",
                  "Avensis",
                  "Avalon",
                  "Axio",
                  "bB",
                  "Belta",
                  "Brevis",
                  "bZ3",
                  "Caldina",
                  "Cami",
                  "Camry",
                  "Carina",
                  "Celica",
                  "Chaser",
                  "C-HR",
                  "Corolla cross",
                  "Corolla",
                  "Corona",
                  "Cressida",
                  "Cresta",
                  "Crown",
                  "Crown Kluger",
                  "Duet",
                  "Esquire",
                  "Estima",
                  "FJ Cruiser",
                  "Fielder",
                  "Fortuner",
                  "Funcargo",
                  "Gaia",
                  "Granvia",
                  "Harrier",
                  "Highlander",
                  "Hiace",
                  "Hilux",
                  "Ipsum",
                  "Isis",
                  "Ist",
                  "iQ",
                  "Kluger",
                  "Land Cruiser 70",
                  "Land Cruiser 77",
                  "Land Cruiser 80",
                  "Land Cruiser 100",
                  "Land Cruiser 105",
                  "Land Cruiser 200",
                  "Land Cruiser 300",
                  "Land cruiser Prado 70",
                  "Land cruiser Prado 90",
                  "Land cruiser Prado 95",
                  "Land cruiser Prado 120",
                  "Land cruiser Prado 150",
                  "Land cruiser Prado 250",
                  "Mark",
                  "Mega Cruiser",
                  "MR2",
                  "Nadia",
                  "Noah",
                  "Passo",
                  "Pickup",
                  "Platz",
                  "Premio",
                  "Previa",
                  "Prius 10, 11",
                  "Prius 20",
                  "Prius 30",
                  "Prius 35",
                  "Prius 40",
                  "Prius 41",
                  "Prius 50",
                  "Prius 51",
                  "Prius 60",
                  "Prius PRIME 52",
                  "Prius 55",
                  "Probox",
                  "Progres",
                  "Raum",
                  "Ractis",
                  "RAV4",
                  "Rumion",
                  "Runx",
                  "Rush",
                  "Sai",
                  "Sequoia",
                  "Sienna",
                  "Sienta",
                  "Spacio",
                  "Spade Porte",
                  "Sprinter",
                  "Succeed",
                  "Supra",
                  "Tacoma",
                  "Tercel",
                  "Townace",
                  "Tundra",
                  "Van",
                  "Vanguard",
                  "Vellfire",
                  "Venza",
                  "Verossa",
                  "Vista",
                  "Vitz",
                  "Voltz",
                  "Voxy",
                  "Wildlander",
                  "Will",
                  "Windom",
                  "Wish",
                  "Yaris",
                  "Бусад",
                ],
              },
              {
                choosesName: "Дугаар Нөхцөл",
                choosesOptions: [
                  "Дугаар авсан",
                  "Дугаар аваагүй",
                  "00 гүйлттэй",
                ],
              },
              {
                choosesName: "Төрөл",
                choosesOptions: ["Жийп", "Суудлын тэрэг", "Гэр бүлийн"],
              },
              {
                choosesName: "Хаалга",
                choosesOptions: ["2", "3", "4", "5", "6"],
              },
              {
                choosesName: "Хүрд",
                choosesOptions: ["Зөв", "Буруу"],
              },
              {
                choosesName: "Хөтлөгч",
                choosesOptions: ["Урдаа FWD", "Хойноо RWD", "Бүх дугуй 4WD"],
              },
              {
                choosesName: "Үйлдвэрлэсэн он",
                choosesOptions: [
                  "2025",
                  "2024",
                  "2023",
                  "2022",
                  "2021",
                  "2020",
                  "2019",
                  "2018",
                  "2017",
                  "2016",
                  "2015",
                  "2014",
                  "2013",
                  "2012",
                  "2011",
                  "2010",
                  "2009",
                  "2008",
                  "2007",
                  "2006",
                  "2005",
                  "2004",
                  "2003",
                  "2002",
                  "2001",
                  "2000",
                  "1999",
                  "1998",
                  "1997",
                  "1996",
                  "1995",
                  "1994",
                  "1993",
                  "1992",
                  "1991",
                  "1990",
                  "1989",
                  "1988",
                  "1987",
                  "1986",
                  "1985",
                  "1984",
                  "1983",
                  "1982",
                  "1981",
                  "1980",
                ],
              },
              {
                choosesName: "Орж ирсэн он",
                choosesOptions: [
                  "2025",
                  "2024",
                  "2023",
                  "2022",
                  "2021",
                  "2020",
                  "2019",
                  "2018",
                  "2017",
                  "2016",
                  "2015",
                  "2014",
                  "2013",
                  "2012",
                  "2011",
                  "2010",
                  "2009",
                  "2008",
                  "2007",
                  "2006",
                  "2005",
                  "2004",
                  "2003",
                  "2002",
                  "2001",
                  "2000",
                  "1999",
                  "1998",
                  "1997",
                  "1996",
                  "1995",
                  "1994",
                  "1993",
                  "1992",
                  "1991",
                  "1990",
                  "1989",
                  "1988",
                  "1987",
                  "1986",
                  "1985",
                  "1984",
                  "1983",
                  "1982",
                  "1981",
                  "1980",
                ],
              },
              {
                choosesName: "Хөдөлгүүр",
                choosesOptions: [
                  "Бензин",
                  "Дизель",
                  "Газ",
                  "Хайбрид",
                  "Цахилгаан",
                ],
              },
            ],
          },
          {
            name: "Tesla",
            chooses: [
              {
                choosesName: "Model",
                choosesOptions: ["Model S", "Model Y", "Бусад"],
              },
              {
                choosesName: "Дугаар Нөхцөл",
                choosesOptions: [
                  "Дугаар авсан",
                  "Дугаар аваагүй",
                  "00 гүйлттэй",
                ],
              },
              {
                choosesName: "Төрөл",
                choosesOptions: ["Жийп", "Суудлын тэрэг", "Гэр бүлийн"],
              },
              {
                choosesName: "Хаалга",
                choosesOptions: ["2", "3", "4", "5", "6"],
              },
              {
                choosesName: "Хүрд",
                choosesOptions: ["Зөв", "Буруу"],
              },
              {
                choosesName: "Хөтлөгч",
                choosesOptions: ["Урдаа FWD", "Хойноо RWD", "Бүх дугуй 4WD"],
              },
              {
                choosesName: "Үйлдвэрлэсэн он",
                choosesOptions: [
                  "2025",
                  "2024",
                  "2023",
                  "2022",
                  "2021",
                  "2020",
                  "2019",
                  "2018",
                  "2017",
                  "2016",
                  "2015",
                  "2014",
                  "2013",
                  "2012",
                  "2011",
                  "2010",
                  "2009",
                  "2008",
                  "2007",
                  "2006",
                  "2005",
                  "2004",
                  "2003",
                  "2002",
                  "2001",
                  "2000",
                  "1999",
                  "1998",
                  "1997",
                  "1996",
                  "1995",
                  "1994",
                  "1993",
                  "1992",
                  "1991",
                  "1990",
                  "1989",
                  "1988",
                  "1987",
                  "1986",
                  "1985",
                  "1984",
                  "1983",
                  "1982",
                  "1981",
                  "1980",
                ],
              },
              {
                choosesName: "Орж ирсэн он",
                choosesOptions: [
                  "2025",
                  "2024",
                  "2023",
                  "2022",
                  "2021",
                  "2020",
                  "2019",
                  "2018",
                  "2017",
                  "2016",
                  "2015",
                  "2014",
                  "2013",
                  "2012",
                  "2011",
                  "2010",
                  "2009",
                  "2008",
                  "2007",
                  "2006",
                  "2005",
                  "2004",
                  "2003",
                  "2002",
                  "2001",
                  "2000",
                  "1999",
                  "1998",
                  "1997",
                  "1996",
                  "1995",
                  "1994",
                  "1993",
                  "1992",
                  "1991",
                  "1990",
                  "1989",
                  "1988",
                  "1987",
                  "1986",
                  "1985",
                  "1984",
                  "1983",
                  "1982",
                  "1981",
                  "1980",
                ],
              },
              {
                choosesName: "Хөдөлгүүр",
                choosesOptions: [
                  "Бензин",
                  "Дизель",
                  "Газ",
                  "Хайбрид",
                  "Цахилгаан",
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Ачааны машин, автобус, хүнд механизм",
        subcategories: [
          {
            name: "Ачааны машин",
            chooses: [
              {
                choosesName: "Машины үйлвэр",
                choosesOptions: [
                  "DAF",
                  "Daewoo",
                  "Daihatsu",
                  "Dongfeng",
                  "FAW",
                  "Ford",
                  "Foton",
                  "Hino",
                  "Honda",
                  "Hyundai",
                  "Isuzu",
                  "Kamaz",
                  "Kia",
                  "Mazda",
                  "Mercedes-Benz",
                  "Mitsubishi",
                  "Nissan",
                  "North Benz",
                  "Renault",
                  "Ssangyong",
                  "Subaru",
                  "Suzuki",
                  "Toyota",
                  "Volkswagen",
                  "Volvo",
                  "ЗИЛ",
                  "Бусад",
                ],
              },
              {
                choosesName: "Дугаар Нөхцөл",
                choosesOptions: [
                  "Дугаар авсан",
                  "Дугаар аваагүй",
                  "00 гүйлттэй",
                ],
              },
              {
                choosesName: "Төрөл",
                choosesOptions: ["Жийп", "Суудлын тэрэг", "Гэр бүлийн"],
              },
              {
                choosesName: "Хаалга",
                choosesOptions: ["2", "3", "4", "5", "6"],
              },
              {
                choosesName: "Хүрд",
                choosesOptions: ["Зөв", "Буруу"],
              },
              {
                choosesName: "Хөтлөгч",
                choosesOptions: ["Урдаа FWD", "Хойноо RWD", "Бүх дугуй 4WD"],
              },
              {
                choosesName: "Үйлдвэрлэсэн он",
                choosesOptions: [
                  "2025",
                  "2024",
                  "2023",
                  "2022",
                  "2021",
                  "2020",
                  "2019",
                  "2018",
                  "2017",
                  "2016",
                  "2015",
                  "2014",
                  "2013",
                  "2012",
                  "2011",
                  "2010",
                  "2009",
                  "2008",
                  "2007",
                  "2006",
                  "2005",
                  "2004",
                  "2003",
                  "2002",
                  "2001",
                  "2000",
                  "1999",
                  "1998",
                  "1997",
                  "1996",
                  "1995",
                  "1994",
                  "1993",
                  "1992",
                  "1991",
                  "1990",
                  "1989",
                  "1988",
                  "1987",
                  "1986",
                  "1985",
                  "1984",
                  "1983",
                  "1982",
                  "1981",
                  "1980",
                ],
              },
              {
                choosesName: "Орж ирсэн он",
                choosesOptions: [
                  "2025",
                  "2024",
                  "2023",
                  "2022",
                  "2021",
                  "2020",
                  "2019",
                  "2018",
                  "2017",
                  "2016",
                  "2015",
                  "2014",
                  "2013",
                  "2012",
                  "2011",
                  "2010",
                  "2009",
                  "2008",
                  "2007",
                  "2006",
                  "2005",
                  "2004",
                  "2003",
                  "2002",
                  "2001",
                  "2000",
                  "1999",
                  "1998",
                  "1997",
                  "1996",
                  "1995",
                  "1994",
                  "1993",
                  "1992",
                  "1991",
                  "1990",
                  "1989",
                  "1988",
                  "1987",
                  "1986",
                  "1985",
                  "1984",
                  "1983",
                  "1982",
                  "1981",
                  "1980",
                ],
              },
              {
                choosesName: "Хөдөлгүүр",
                choosesOptions: [
                  "Бензин",
                  "Дизель",
                  "Газ",
                  "Хайбрид",
                  "Цахилгаан",
                ],
              },
            ],
          },
          {
            name: "Автобус",
            chooses: [
              {
                choosesName: "Машины үйлдвэр",
                choosesOptions: [
                  "Daewoo",
                  "Ford",
                  "Hyundai",
                  "Isuzu",
                  "Kia",
                  "Mazda",
                  "Mercedes-Benz",
                  "Mitsubishi",
                  "Nissan",
                  "Ssangyong",
                  "Toyota",
                  "Yutong",
                  "ПАЗ",
                  "Бусад",
                ],
              },
              {
                choosesName: "Дугаар Нөхцөл",
                choosesOptions: [
                  "Дугаар авсан",
                  "Дугаар аваагүй",
                  "00 гүйлттэй",
                ],
              },
              {
                choosesName: "Зориулалт",
                choosesOptions: [
                  "Микробус",
                  "Дунд Оврийн",
                  "Том Оврийн",
                  "Ачааны",
                  "Тусгай зориулалтын",
                ],
              },
              {
                choosesName: "Үйлдвэрлэсэн улс",
                choosesOptions: [
                  "Япон",
                  "Солонгос",
                  "Хятад",
                  "Орос",
                  "Европ",
                  "Америк",
                ],
              },
              {
                choosesName: "Хүрд",
                choosesOptions: ["Зөв", "Буруу"],
              },
              {
                choosesName: "Хөтлөгч",
                choosesOptions: ["Урдаа FWD", "Хойноо RWD", "Бүх дугуй 4WD"],
              },
              {
                choosesName: "Үйлдвэрлэсэн он",
                choosesOptions: [
                  "2025",
                  "2024",
                  "2023",
                  "2022",
                  "2021",
                  "2020",
                  "2019",
                  "2018",
                  "2017",
                  "2016",
                  "2015",
                  "2014",
                  "2013",
                  "2012",
                  "2011",
                  "2010",
                  "2009",
                  "2008",
                  "2007",
                  "2006",
                  "2005",
                  "2004",
                  "2003",
                  "2002",
                  "2001",
                  "2000",
                  "1999",
                  "1998",
                  "1997",
                  "1996",
                  "1995",
                  "1994",
                  "1993",
                  "1992",
                  "1991",
                  "1990",
                  "1989",
                  "1988",
                  "1987",
                  "1986",
                  "1985",
                  "1984",
                  "1983",
                  "1982",
                  "1981",
                  "1980",
                ],
              },
              {
                choosesName: "Орж ирсэн он",
                choosesOptions: [
                  "2025",
                  "2024",
                  "2023",
                  "2022",
                  "2021",
                  "2020",
                  "2019",
                  "2018",
                  "2017",
                  "2016",
                  "2015",
                  "2014",
                  "2013",
                  "2012",
                  "2011",
                  "2010",
                  "2009",
                  "2008",
                  "2007",
                  "2006",
                  "2005",
                  "2004",
                  "2003",
                  "2002",
                  "2001",
                  "2000",
                  "1999",
                  "1998",
                  "1997",
                  "1996",
                  "1995",
                  "1994",
                  "1993",
                  "1992",
                  "1991",
                  "1990",
                  "1989",
                  "1988",
                  "1987",
                  "1986",
                  "1985",
                  "1984",
                  "1983",
                  "1982",
                  "1981",
                  "1980",
                ],
              },
              {
                choosesName: "Хөдөлгүүр",
                choosesOptions: [
                  "Бензин",
                  "Дизель",
                  "Газ",
                  "Хайбрид",
                  "Цахилгаан",
                ],
              },
            ],
          },
          {
            name: "Хүнд механизм",
            chooses: [
              {
                choosesName: "Үйлдвэрын нэр",
                choosesOptions: [
                  "Atlas Copco",
                  "Belarus",
                  "Bobcat",
                  "Caterpillar",
                  "Daewoo",
                  "DAF",
                  "Dayun",
                  "Dongfeng",
                  "Doosan",
                  "FAW",
                  "Foton",
                  "Hino",
                  "Hitachi",
                  "Howo",
                  "Hyundai",
                  "Isuzu",
                  "John Deere",
                  "Kamaz",
                  "Kia",
                  "Komatsu",
                  "KRAZ",
                  "Liebherr",
                  "Liugong",
                  "MAN",
                  "MAZ",
                  "Mazda",
                  "Mercedes-Benz",
                  "Mitsubishi",
                  "Nissan",
                  "North Benz",
                  "Reddot",
                  "Renault",
                  "Samsung",
                  "Sany",
                  "Scania",
                  "SDLG",
                  "SEM",
                  "Shacman",
                  "Sinotruk",
                  "Ssangyong",
                  "Sumitomo",
                  "Toyota",
                  "TYM",
                  "Volvo",
                  "XCMG",
                  "XGMA",
                  "Xiajin",
                  "Yugong",
                  "ZIL",
                  "Zoomlion",
                  "Zega",
                  "Бусад",
                ],
              },
              {
                choosesName: "Дугаар Нөхцөл",
                choosesOptions: [
                  "Дугаар авсан",
                  "Дугаар аваагүй",
                  "00 гүйлттэй",
                ],
              },
              {
                choosesName: "Зориулалт",
                choosesOptions: [
                  "Бобкат",
                  "По",
                  "Миксер",
                  "Цемент шахагч",
                  "Чирэгч",
                  "Өөрөө буулгагч",
                  "Цистерн",
                  "Комбайн",
                  "Трактор",
                  "Грейдер",
                  "Ковш",
                  "Бульдозер",
                  "Кран",
                  "Экскаватор",
                  "Чулуу бутлагч",
                  "Асфальт дэвсэгч",
                  "Индүү",
                  "Өрөм",
                  "Бусад",
                ],
              },
              {
                choosesName: "Хөтлөгч",
                choosesOptions: ["Урдаа FWD", "Хойноо RWD", "Бүх дугуй 4WD"],
              },
              {
                choosesName: "Үйлдвэрлэсэн он",
                choosesOptions: [
                  "2025",
                  "2024",
                  "2023",
                  "2022",
                  "2021",
                  "2020",
                  "2019",
                  "2018",
                  "2017",
                  "2016",
                  "2015",
                  "2014",
                  "2013",
                  "2012",
                  "2011",
                  "2010",
                  "2009",
                  "2008",
                  "2007",
                  "2006",
                  "2005",
                  "2004",
                  "2003",
                  "2002",
                  "2001",
                  "2000",
                  "1999",
                  "1998",
                  "1997",
                  "1996",
                  "1995",
                  "1994",
                  "1993",
                  "1992",
                  "1991",
                  "1990",
                  "1989",
                  "1988",
                  "1987",
                  "1986",
                  "1985",
                  "1984",
                  "1983",
                  "1982",
                  "1981",
                  "1980",
                ],
              },
              {
                choosesName: "Орж ирсэн он",
                choosesOptions: [
                  "2025",
                  "2024",
                  "2023",
                  "2022",
                  "2021",
                  "2020",
                  "2019",
                  "2018",
                  "2017",
                  "2016",
                  "2015",
                  "2014",
                  "2013",
                  "2012",
                  "2011",
                  "2010",
                  "2009",
                  "2008",
                  "2007",
                  "2006",
                  "2005",
                  "2004",
                  "2003",
                  "2002",
                  "2001",
                  "2000",
                  "1999",
                  "1998",
                  "1997",
                  "1996",
                  "1995",
                  "1994",
                  "1993",
                  "1992",
                  "1991",
                  "1990",
                  "1989",
                  "1988",
                  "1987",
                  "1986",
                  "1985",
                  "1984",
                  "1983",
                  "1982",
                  "1981",
                  "1980",
                ],
              },
              {
                choosesName: "Хөдөлгүүр",
                choosesOptions: [
                  "Бензин",
                  "Дизель",
                  "Газ",
                  "Хайбрид",
                  "Цахилгаан",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

const CategorySelector = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedSubSubcategory, setSelectedSubSubcategory] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [images, setImages] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [selectedAvailability, setSelectedAvailability] = useState(null);
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  const handleImageUpload = (e) => {
    s;
    if (images.length >= 12) return;
    const files = Array.from(e.target.files).slice(0, 12 - images.length);
    setImages([...images, ...files]);
  };

  return (
    <Card className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl text-gray-900 font-semibold">
          Ангилал сонгох
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-3 h-12">
            Үндсэн ангилал
          </h2>
          <div className="space-y-3">
            {categories.map((category) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant={
                    selectedCategory === category ? "secondary" : "ghost"
                  }
                  className="w-full flex justify-between items-center rounded-lg py-2 px-4 hover:bg-gray-100 transition-all"
                  onClick={() => {
                    setSelectedCategory(category);
                    setSelectedSubcategory(null);
                    setSelectedSubSubcategory(null);
                    setExpanded(!expanded);
                  }}
                >
                  <span className="flex items-center space-x-2 text-gray-800">
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      expanded ? "rotate-90" : "rotate-0"
                    }`}
                  />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        <Separator className="md:hidden" />

        <div>
          {selectedCategory ? (
            <>
              <h2 className="text-lg font-medium text-gray-900 mb-3 h-12">
                {selectedCategory.name} - Дэд ангилал
              </h2>
              <div className="space-y-3">
                {selectedCategory.subcategories.map((sub) => (
                  <motion.div
                    key={sub.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      variant={
                        selectedSubcategory === sub ? "secondary" : "ghost"
                      }
                      className="w-full rounded-lg py-2 px-4 hover:bg-gray-100 transition-all"
                      onClick={() => {
                        setSelectedSubcategory(sub);
                        setSelectedSubSubcategory(null);
                      }}
                    >
                      {sub.name}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-center">Ангилал сонгоно уу</p>
          )}
        </div>

        <Separator className="md:hidden" />

        <div>
          {selectedSubcategory ? (
            <>
              <h2 className="text-lg font-medium text-gray-900 mb-3 h-12">
                {selectedSubcategory.name} - Жижиг ангилал
              </h2>
              <div className="space-y-3">
                {selectedSubcategory.subcategories?.map((sub) => (
                  <motion.div
                    key={sub.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      variant={
                        selectedSubSubcategory === sub ? "secondary" : "ghost"
                      }
                      className="w-full rounded-lg py-2 px-4 hover:bg-gray-100 transition-all"
                      onClick={() => setSelectedSubSubcategory(sub)}
                    >
                      {sub.name}
                    </Button>
                  </motion.div>
                )) || (
                  <p className="text-gray-500 text-center">
                    Дэд ангилал байхгүй
                  </p>
                )}
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-center">Дэд ангилал сонгоно уу</p>
          )}
        </div>
      </CardContent>

      <AnimatePresence>
        {selectedSubSubcategory?.chooses && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-gray-50 rounded-lg mt-4"
          >
            <h2 className="text-lg font-medium mb-3 text-gray-900">
              {selectedSubSubcategory.name} - Сонголт
            </h2>
            <LocationSelector />
            <div>
              <div>Зарын гарчиг</div>
              <Input />
            </div>
            {selectedSubSubcategory.chooses.map((choose, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="mb-4"
              >
                <p className="text-gray-700 font-medium mb-2">
                  {choose.choosesName}
                </p>
                <Select>
                  <SelectTrigger className="w-full rounded-lg">
                    <SelectValue
                      placeholder={`Сонгох: ${choose.choosesName}`}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {choose.choosesOptions.map((option, i) => (
                      <SelectItem key={i} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>
            ))}

            <CardContent className="space-y-6">
              <Input
                placeholder="Барааны нэр (Iphone X, Ноолууран цамц гэх мэт)"
                className="border-gray-300 focus:ring-2 focus:ring-blue-400"
              />

              <ToggleGroup type="single" className="flex gap-3">
                {["new", "like-new", "used"].map((value) => (
                  <ToggleGroupItem
                    key={value}
                    value={value}
                    onClick={() => setSelectedCondition(value)}
                    className={`px-6 py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      selectedCondition === value
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white"
                    }`}
                  >
                    {value === "new"
                      ? "Шинэ"
                      : value === "like-new"
                      ? "Шинэвтэр"
                      : "Хуучин"}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>

              <div className="flex items-center gap-3">
                <Input
                  placeholder="Үнэ (₮)"
                  type="number"
                  className="flex-1 border-gray-300 focus:ring-2 focus:ring-blue-400"
                />
                <Checkbox id="negotiable" className="border-gray-300" />
                <label htmlFor="negotiable" className="text-gray-700">
                  Үнэ тохиролцоно
                </label>
              </div>

              <div>
                <p className="text-gray-700">
                  Барааны зураг (Доод тал нь 12 зураг оруулах боломжтой)
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  id="file-upload"
                  onChange={handleImageUpload}
                />
                <label
                  htmlFor="file-upload"
                  className="flex items-center gap-2 cursor-pointer p-3 border border-gray-300 rounded-lg mt-2 bg-gray-50 hover:bg-blue-400 hover:text-white transition"
                >
                  <Upload size={20} /> Зураг нэмэх
                </label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {images.map((img, index) => (
                    <Dialog key={index}>
                      <DialogTrigger asChild>
                        <img
                          src={URL.createObjectURL(img)}
                          alt="uploaded"
                          className="w-20 h-20 object-cover rounded-lg shadow-sm cursor-pointer"
                          onClick={() =>
                            setSelectedImage(URL.createObjectURL(img))
                          }
                        />
                      </DialogTrigger>
                      <DialogContent className="p-0 max-w-2xl bg-opacity-0 border-none">
                        <DialogTitle className="text-white">
                          Зургийн дэлгэрэнгүй
                        </DialogTitle>{" "}
                        <img
                          src={selectedImage}
                          alt="preview"
                          className="w-full h-auto "
                        />
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </div>

              <Textarea
                placeholder="Барааны дэлгэрэнгүй мэдээлэл"
                className="border-gray-300 focus:ring-2 focus:ring-blue-400"
              />
              <Input
                placeholder="Youtube видео линк"
                className="border-gray-300 focus:ring-2 focus:ring-blue-400"
              />

              <ToggleGroup type="single" className="flex gap-3">
                {["free", "paid", "none"].map((value) => (
                  <ToggleGroupItem
                    key={value}
                    value={value}
                    onClick={() => setSelectedDelivery(value)}
                    className={`px-6 py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      selectedDelivery === value
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white"
                    }`}
                  >
                    {value === "free"
                      ? "Үнэгүй хүргэлттэй"
                      : value === "paid"
                      ? "Төлбөртэй хүргэлттэй"
                      : "Хүргэлтгүй"}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>

              <Input
                placeholder="Борлуулагчийн нэр"
                className="border-gray-300 focus:ring-2 focus:ring-blue-400"
              />
              <Input
                placeholder="Имэйл хаяг"
                type="email"
                className="border-gray-300 focus:ring-2 focus:ring-blue-400"
              />
              <Input
                placeholder="Утасны дугаар"
                type="tel"
                className="border-gray-300 focus:ring-2 focus:ring-blue-400"
              />

              <Button
                className={`w-full py-3 rounded-lg transition ${
                  isClicked
                    ? "bg-green-500 text-white"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
                onClick={() => setIsClicked(true)}
              >
                Нийтлэх
              </Button>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default CategorySelector;
