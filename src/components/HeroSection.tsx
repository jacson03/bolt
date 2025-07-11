import { Search } from "lucide-react";
import heroImage from "@/assets/food-hero-bg.jpg";

interface HeroSectionProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const HeroSection = ({ searchTerm, onSearchChange }: HeroSectionProps) => {
  return (
    <div 
      className="relative h-80 bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Fresh Restaurant Menu
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Delicious dishes prepared fresh daily and delivered to your table
        </p>
        <div className="flex justify-center">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search for dishes..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};