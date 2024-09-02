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
    link: "sleeping-equipment",
  },
  {
    id: 4,
    name: "Camping Furniture & Equipment",
    image: furniture,
    link: "camping-furniture",
  },
  {
    id: 5,
    name: "Camping Cooking Equipment",
    image: SurvivalTools,
    link: "cooking-equipment",
  },
  {
    id: 6,
    name: "Hydration and Food",
    image: SurvivalTools,
    link: "hydration-food",
  },
  {
    id: 7,
    name: "Outdoor Dining & Picnicware",
    image: SurvivalTools,
    link: "dining-picnicware",
  },
  {
    id: 8,
    name: "Camp Lighting",
    image: SurvivalTools,
    link: "camp-lighting",
  },
  {
    id: 9,
    name: "Camping Accessories",
    image: SurvivalTools,
    link: "camping-accessories",
  },
  {
    id: 10,
    name: "Outdoor Clothes",
    image: SurvivalTools,
    link: "outdoor-clothes",
  },
  {
    id: 11,
    name: "Camping Spare Parts & Care",
    image: SurvivalTools,
    link: "spare-parts-care",
  },
  {
    id: 12,
    name: "Camping Trends",
    image: SurvivalTools,
    link: "camping-trends",
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
