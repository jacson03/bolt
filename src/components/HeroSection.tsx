import { Search } from "lucide-react";
import heroImage from "@/assets/food-hero-bg.jpg";
interface HeroSectionProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}
export const HeroSection = ({
  searchTerm,
  onSearchChange
}: HeroSectionProps) => {
  return <div className="relative h-96 bg-cover bg-center flex items-center justify-center overflow-hidden" style={{
    backgroundImage: `url(${heroImage})`
  }}>
      <div className="absolute inset-0 bg-gradient-to-b from-luxury/70 via-luxury/50 to-luxury/80"></div>
      <div className="absolute inset-0 bg-premium-glow"></div>
      <div className="relative z-10 text-center text-foreground px-6">
        
        
        <div className="flex justify-center">
          <div className="relative max-w-lg w-full">
            <div className="absolute inset-0 bg-gold-gradient rounded-2xl blur-sm opacity-30 animate-glow"></div>
            <div className="relative bg-card/20 backdrop-blur-xl border border-gold/30 rounded-2xl p-1 shadow-luxury">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold/70 h-6 w-6" />
              <input type="text" placeholder="Search our culinary treasures..." value={searchTerm} onChange={e => onSearchChange(e.target.value)} className="w-full pl-12 pr-6 py-4 rounded-xl bg-card/40 backdrop-blur-sm text-foreground placeholder-muted-foreground border-0 focus:outline-none focus:ring-2 focus:ring-gold/50 font-inter text-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>;
};