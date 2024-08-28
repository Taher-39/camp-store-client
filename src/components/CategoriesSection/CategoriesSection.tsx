import { Link } from "react-router-dom";
import campingGear from "@/assets/Categories/campingGear.avif";
import OutdoorClothing from "@/assets/Categories/OutdoorClothing.avif";
import SurvivalTools from "@/assets/Categories/survivalImg.jpg";
import furniture from "@/assets/Categories/camping furniture.avif";
import campBed from "@/assets/Categories/campBed.avif";

const categories = [
  {
    id: 1,
    name: "Camping Tents",
    image: campingGear,
    link: "camping-gear",
  },
  {
    id: 2,
    name: "Camping Shelters and Tarps",
    image: OutdoorClothing,
    link: "outdoor-clothing",
  },
  {
    id: 3,
    name: "Sleeping Equipment",
    image: campBed,
    link: "survival-tools",
  },
  {
    id: 4,
    name: "Camping Furniture & Equipment",
    image: furniture,
    link: "survival-tools",
  },
  {
    id: 5,
    name: "Camping Cooking Equipment",
    image: SurvivalTools,
    link: "survival-tools",
  },
  {
    id: 6,
    name: "Hydration and Food",
    image: SurvivalTools,
    link: "survival-tools",
  },
  {
    id: 7,
    name: "Outdoor Dining & Picnicware",
    image: SurvivalTools,
    link: "survival-tools",
  },
  {
    id: 8,
    name: "Camp Lighting",
    image: SurvivalTools,
    link: "survival-tools",
  },
  {
    id: 9,
    name: "Camping Accessories",
    image: SurvivalTools,
    link: "survival-tools",
  },
  {
    id: 10,
    name: "Outdoor Clothes",
    image: SurvivalTools,
    link: "survival-tools",
  },
  {
    id: 11,
    name: "Camping Spare Parts & Care",
    image: SurvivalTools,
    link: "survival-tools",
  },
  {
    id: 12,
    name: "Camping Trends",
    image: SurvivalTools,
    link: "survival-tools",
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Get everything you <span style={{ color: "#4952b2" }}>need</span>
        </h2>
        <div className="overflow-x-auto flex space-x-6 py-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.link}`}
              className="flex-shrink-0 bg-white p-4 rounded-lg shadow-md flex flex-col items-center transition-transform transform hover:scale-105 w-40"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-36 object-cover mb-4 rounded-lg"
              />
              <h3 className="mt-2 text-center text-black font-medium">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
