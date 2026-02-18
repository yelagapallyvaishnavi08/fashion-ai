import { useState, useRef } from "react";
import { motion } from "motion/react";
import { Upload, Image as ImageIcon, Sparkles, Shirt, Palette, Tag } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface AnalysisResult {
  colors: string[];
  style: string;
  items: string[];
  suggestions: string[];
  occasions: string[];
}

export function ImageAnalysis() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis with a delay
    setTimeout(() => {
      setAnalysisResult({
        colors: ["Navy Blue", "White", "Beige", "Black"],
        style: "Smart Casual",
        items: ["Button-down shirt", "Chino pants", "Leather belt", "Dress shoes"],
        suggestions: [
          "Try pairing with a blazer for a more formal look",
          "Add a pop of color with a pocket square",
          "Consider rolling up sleeves for a relaxed vibe",
          "Swap dress shoes for loafers for weekend wear",
        ],
        occasions: ["Work", "Business Meeting", "Casual Dinner", "Date Night"],
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-4">
            <ImageIcon className="w-5 h-5 text-blue-600" />
            <span className="text-blue-700 font-medium">AI Image Analysis</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Analyze Your Style
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload a photo and let our AI analyze your outfit, identify items, and provide personalized styling recommendations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="bg-white rounded-3xl shadow-lg p-8 h-full"
            >
              {!selectedImage ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-3 border-dashed border-gray-300 rounded-2xl p-12 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all h-full flex flex-col items-center justify-center"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-6">
                    <Upload className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Upload Your Image</h3>
                  <p className="text-gray-600 mb-6">
                    Drag and drop an image here, or click to browse
                  </p>
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-medium hover:shadow-lg transition-all">
                    Choose File
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden">
                    <img
                      src={selectedImage}
                      alt="Uploaded outfit"
                      className="w-full h-96 object-cover"
                    />
                    {isAnalyzing && (
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"
                          />
                          <p className="text-white font-medium">Analyzing your style...</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      setAnalysisResult(null);
                    }}
                    className="w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                  >
                    Upload Different Image
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Analysis Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {analysisResult ? (
              <div className="space-y-6">
                {/* Colors Detected */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Palette className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold">Colors Detected</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {analysisResult.colors.map((color, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full border border-purple-200"
                      >
                        <span className="font-medium text-purple-700">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Style Classification */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <Tag className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold">Style Classification</h3>
                  </div>
                  <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-medium">
                    {analysisResult.style}
                  </div>
                </div>

                {/* Items Identified */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                      <Shirt className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold">Items Identified</h3>
                  </div>
                  <ul className="space-y-2">
                    {analysisResult.items.map((item, index) => (
                      <li key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-pink-500 rounded-full" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* AI Suggestions */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold">AI Styling Suggestions</h3>
                  </div>
                  <ul className="space-y-3">
                    {analysisResult.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-indigo-600 text-sm font-medium">
                            {index + 1}
                          </span>
                        </div>
                        <span className="text-gray-700">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Suitable Occasions */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Suitable Occasions</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.occasions.map((occasion, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full text-gray-700 font-medium"
                      >
                        {occasion}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-lg p-12 h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ImageIcon className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 text-gray-400">
                    No Analysis Yet
                  </h3>
                  <p className="text-gray-500">
                    Upload an image to see AI-powered style analysis
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
