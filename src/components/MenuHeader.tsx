
import { Utensils, Clock, MapPin } from "lucide-react";

export const MenuHeader = () => {
  return (
    <header className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center items-center gap-3 mb-4">
          <Utensils className="w-8 h-8" />
          <h1 className="text-4xl md:text-5xl font-bold">Bistro Delux</h1>
        </div>
        <p className="text-xl md:text-2xl font-light mb-6">Exquisite Flavors, Unforgettable Experience</p>
        <div className="flex justify-center items-center gap-8 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Open 8 AM - 11 PM</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Downtown Location</span>
          </div>
        </div>
      </div>
    </header>
  );
};
