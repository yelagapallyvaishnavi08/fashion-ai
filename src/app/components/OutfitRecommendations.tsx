import { useState } from "react";
import { useLocation } from "react-router";
import { motion } from "motion/react";
import { Heart, Share2, Sparkles, Info } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Outfit {
  id: number;
  title: string;
  description: string;
  image: string;
  items: string[];
  occasion: string;
  season: string;
  styleMatch: number;
}

export function OutfitRecommendations() {
  const location = useLocation();
  const preferences = location.state?.preferences;

  const [likedOutfits, setLikedOutfits] = useState<Set<number>>(new Set());
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);

  // Mock outfit recommendations based on preferences
  const outfits: Outfit[] = [
    {
      id: 1,
      title: "Summer Casual Chic",
      description: "Perfect for weekend brunches and casual outings. Light, breezy, and effortlessly stylish.",
      image: "https://images.unsplash.com/photo-1688115907791-9b7f33db4ec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBjYXN1YWwlMjBvdXRmaXR8ZW58MXx8fHwxNzcxNDI1ODI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      items: ["White linen shirt", "Light blue jeans", "Tan sandals", "Straw bag"],
      occasion: "Casual Outings",
      season: "Summer",
      styleMatch: 95,
    },
    {
      id: 2,
      title: "Winter Elegance",
      description: "Stay warm and sophisticated with this layered look perfect for cold weather.",
      image: "https://images.unsplash.com/photo-1768134152610-27355e256513?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBjb2F0JTIwZmFzaGlvbnxlbnwxfHx8fDE3NzE0MDM2MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      items: ["Wool coat", "Cashmere sweater", "Tailored trousers", "Leather boots"],
      occasion: "Work",
      season: "Winter",
      styleMatch: 92,
    },
    {
      id: 3,
      title: "Evening Glamour",
      description: "Make a statement at any formal event with this stunning ensemble.",
      image: "https://images.unsplash.com/photo-1547697933-66bcb20f114a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVuaW5nJTIwZHJlc3MlMjBlbGVnYW50fGVufDF8fHx8MTc3MTQyNTgyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      items: ["Silk evening dress", "Statement earrings", "Clutch bag", "Heeled sandals"],
      occasion: "Formal Events",
      season: "All Seasons",
      styleMatch: 98,
    },
    {
      id: 4,
      title: "Urban Street Style",
      description: "Edgy and comfortable for everyday wear with a modern twist.",
      image: "https://images.unsplash.com/photo-1639602182178-2dc689354103?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW5pbSUyMGplYW5zJTIwb3V0Zml0fGVufDF8fHx8MTc3MTQyNTgyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      items: ["Denim jacket", "Graphic tee", "Skinny jeans", "Sneakers"],
      occasion: "Casual Outings",
      season: "Spring/Fall",
      styleMatch: 90,
    },
    {
      id: 5,
      title: "Minimalist Modern",
      description: "Clean lines and neutral tones for a sophisticated, timeless look.",
      image: "https://images.unsplash.com/photo-1763609973444-9a1d47045a33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMGxvb2t8ZW58MXx8fHwxNzcxNDI1ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      items: ["Black turtleneck", "Wide-leg trousers", "Minimalist watch", "Leather loafers"],
      occasion: "Work",
      season: "All Seasons",
      styleMatch: 94,
    },
    {
      id: 6,
      title: "Vibrant Spring",
      description: "Embrace the season with bright colors and playful patterns.",
      image: "https://images.unsplash.com/photo-1649956555380-50061b2e3c86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHNwcmluZyUyMG91dGZpdHxlbnwxfHx8fDE3NzE0MjU4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      items: ["Floral blouse", "Midi skirt", "Ballet flats", "Crossbody bag"],
      occasion: "Date Night",
      season: "Spring",
      styleMatch: 88,
    },
  ];

  const toggleLike = (id: number) => {
    const newLiked = new Set(likedOutfits);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
    }
    setLikedOutfits(newLiked);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-4">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="text-purple-700 font-medium">AI-Powered Recommendations</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Your Perfect Outfits
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {preferences
              ? "Based on your style preferences, we've curated these personalized recommendations just for you."
              : "Discover outfit combinations tailored to your unique style and preferences."}
          </p>
        </motion.div>

        {/* Outfits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {outfits.map((outfit, index) => (
            <motion.div
              key={outfit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative group">
                <ImageWithFallback
                  src={outfit.image}
                  alt={outfit.title}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Quick Actions */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => toggleLike(outfit.id)}
                    className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                      likedOutfits.has(outfit.id)
                        ? "bg-red-500 text-white"
                        : "bg-white/90 text-gray-700 hover:bg-white"
                    }`}
                  >
                    <Heart
                      className="w-5 h-5"
                      fill={likedOutfits.has(outfit.id) ? "currentColor" : "none"}
                    />
                  </button>
                  <button className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white transition-all">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Style Match Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-medium backdrop-blur-sm">
                  {outfit.styleMatch}% Match
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{outfit.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{outfit.description}</p>

                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs">
                    {outfit.occasion}
                  </span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                    {outfit.season}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedOutfit(outfit)}
                  className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Info className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Outfit Details Modal */}
      {selectedOutfit && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedOutfit(null)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl"
          >
            <div className="relative">
              <ImageWithFallback
                src={selectedOutfit.image}
                alt={selectedOutfit.title}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setSelectedOutfit(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
              >
                ×
              </button>
            </div>

            <div className="p-8">
              <h2 className="text-3xl font-bold mb-2">{selectedOutfit.title}</h2>
              <p className="text-gray-600 mb-6">{selectedOutfit.description}</p>

              <h3 className="font-semibold mb-3">Outfit Items:</h3>
              <ul className="space-y-2 mb-6">
                {selectedOutfit.items.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium hover:shadow-lg transition-all">
                  Add to Wardrobe
                </button>
                <button
                  onClick={() => toggleLike(selectedOutfit.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    likedOutfits.has(selectedOutfit.id)
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Heart
                    className="w-5 h-5"
                    fill={likedOutfits.has(selectedOutfit.id) ? "currentColor" : "none"}
                  />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
