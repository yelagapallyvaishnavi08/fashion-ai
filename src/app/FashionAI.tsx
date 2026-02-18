import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Camera,
  Upload,
  Sparkles,
  User,
  Palette,
  Shirt,
  TrendingUp,
  ShoppingBag,
  CheckCircle,
  Eye,
  Calendar,
  DollarSign,
  Star,
  MessageCircle,
  Zap,
  Award,
  BookOpen,
  Users,
  Heart,
  ArrowRight,
  Quote,
  Instagram,
  Twitter,
  Mail,
} from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

type Step = "home" | "upload" | "preferences" | "analyzing" | "results";
type Gender = "female" | "male" | "non-binary";
type StyleType = "casual" | "formal" | "street" | "bohemian" | "minimalist" | "classic";

interface Preferences {
  gender: Gender | null;
  style: StyleType | null;
  occasion: string;
  budget: string;
}

interface AnalysisResult {
  skinTone: {
    color: string;
    name: string;
    confidence: number;
    palette: string[];
  };
  recommendations: {
    outfits: Array<{
      title: string;
      description: string;
      image: string;
      items: string[];
    }>;
    colors: string[];
    accessories: string[];
    hairstyle: string;
  };
}

export default function FashionAI() {
  const [step, setStep] = useState<Step>("home");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [preferences, setPreferences] = useState<Preferences>({
    gender: null,
    style: null,
    occasion: "",
    budget: "",
  });
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisMessage, setAnalysisMessage] = useState("");
  const [showARPreview, setShowARPreview] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error("Camera access denied:", err);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL("image/jpeg");
        setUploadedImage(imageData);
        stopCamera();
        setStep("preferences");
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      setIsCameraActive(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setStep("preferences");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setStep("preferences");
      };
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = () => {
    setStep("analyzing");
    
    const messages = [
      "Analyzing facial features...",
      "Detecting skin tone...",
      "Identifying undertones...",
      "Generating color palette...",
      "Matching style preferences...",
      "Curating outfit recommendations...",
      "Finalizing your personalized results...",
    ];

    let progress = 0;
    let messageIndex = 0;

    const interval = setInterval(() => {
      progress += 14.3;
      messageIndex = Math.floor(progress / 14.3);
      
      if (messageIndex < messages.length) {
        setAnalysisMessage(messages[messageIndex]);
      }
      
      setAnalysisProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setAnalysisResult({
            skinTone: {
              color: "#8D5524",
              name: "Medium Warm",
              confidence: 94,
              palette: ["#FFF4E6", "#FFE4CC", "#FFD4A3", "#FFBF7A", "#E6A157", "#8D5524"],
            },
            recommendations: {
              outfits: [
                {
                  title: "Elegant Evening Look",
                  description: "Sophisticated ensemble perfect for formal occasions",
                  image: "https://images.unsplash.com/photo-1763906473016-2a7872a83b0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWdoJTIwZmFzaGlvbiUyMHdvbWFuJTIwZWxlZ2FudCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTQzMDU5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
                  items: ["Silk blazer", "Tailored trousers", "Statement heels", "Minimalist jewelry"],
                },
                {
                  title: "Casual Chic",
                  description: "Effortlessly stylish for everyday wear",
                  image: "https://images.unsplash.com/photo-1704775986777-b903cf6b9802?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGNsb3RoaW5nJTIwb3V0Zml0JTIwbHV4ZXxlbnwxfHx8fDE3NzE0MzA1OTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
                  items: ["Cotton shirt", "High-waist jeans", "Leather loafers", "Canvas tote"],
                },
                {
                  title: "Business Professional",
                  description: "Power dressing for the modern workplace",
                  image: "https://images.unsplash.com/photo-1770364019396-36ae51854520?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGF0dGlyZXxlbnwxfHx8fDE3NzE0MjU3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080",
                  items: ["Structured blazer", "Pencil skirt", "Classic pumps", "Statement watch"],
                },
                {
                  title: "Weekend Comfort",
                  description: "Relaxed yet put-together weekend style",
                  image: "https://images.unsplash.com/photo-1688115907791-9b7f33db4ec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBjYXN1YWwlMjBvdXRmaXR8ZW58MXx8fHwxNzcxNDI1ODI1fDA&ixlib=rb-4.1.0&q=80&w=1080",
                  items: ["Oversized sweater", "Comfortable leggings", "White sneakers", "Crossbody bag"],
                },
              ],
              colors: ["Warm Earth Tones", "Deep Burgundy", "Olive Green", "Burnt Orange", "Champagne Gold"],
              accessories: ["Gold hoops", "Leather belt", "Structured handbag", "Silk scarf"],
              hairstyle: "Soft waves with side part to complement facial structure",
            },
          });
          setStep("results");
        }, 500);
      }
    }, 400);
  };

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Fashion Blogger",
      image: "https://images.unsplash.com/photo-1765560008448-612e4b17877f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZWxlYnJpdHklMjByZWQlMjBjYXJwZXQlMjBmYXNoaW9ufGVufDF8fHx8MTc3MTQzMTE1M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      quote: "StyleAI transformed my wardrobe completely. The color recommendations are incredibly accurate!",
      rating: 5,
    },
    {
      name: "Rahul Mehta",
      role: "Corporate Professional",
      image: "https://images.unsplash.com/photo-1762745103094-6760fab8eb50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc3R5bGluZyUyMGNvbnN1bHRhdGlvbnxlbnwxfHx8fDE3NzE0MzExNTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      quote: "Finally found outfits that match my professional style. The AI suggestions are spot-on!",
      rating: 5,
    },
    {
      name: "Aisha Khan",
      role: "Content Creator",
      image: "https://images.unsplash.com/photo-1639244151653-7807947de5a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbWFnYXppbmUlMjBlZGl0b3JpYWx8ZW58MXx8fHwxNzcxMzE3MjUzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      quote: "This app is a game-changer! I get compliments every day on my outfits now.",
      rating: 5,
    },
  ];

  const featuredStyles = [
    {
      title: "Minimalist Elegance",
      description: "Clean lines, neutral tones, timeless appeal",
      image: "https://images.unsplash.com/photo-1763609973444-9a1d47045a33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMGxvb2t8ZW58MXx8fHwxNzcxNDI1ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      tag: "Trending",
    },
    {
      title: "Street Style Edge",
      description: "Urban vibes with bold statements",
      image: "https://images.unsplash.com/photo-1762094789164-093054399b08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmVuZHklMjBvdXRmaXQlMjBzdHJlZXQlMjBzdHlsZXxlbnwxfHx8fDE3NzE0MzExNTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      tag: "Popular",
    },
    {
      title: "Seasonal Chic",
      description: "Weather-appropriate luxury fashion",
      image: "https://images.unsplash.com/photo-1764973636382-7b82f134cabb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWFzb25hbCUyMGZhc2hpb24lMjB3aW50ZXIlMjBjb2F0fGVufDF8fHx8MTc3MTQzMTE1NXww&ixlib=rb-4.1.0&q=80&w=1080",
      tag: "New",
    },
  ];

  const styleGuides = [
    {
      title: "Color Theory Mastery",
      description: "Understanding undertones and color coordination",
      icon: Palette,
      lessons: 12,
    },
    {
      title: "Body Type Guide",
      description: "Dressing for your unique silhouette",
      icon: User,
      lessons: 8,
    },
    {
      title: "Accessory Essentials",
      description: "Elevate any outfit with the right pieces",
      icon: Star,
      lessons: 10,
    },
    {
      title: "Seasonal Transitions",
      description: "Building a versatile year-round wardrobe",
      icon: Calendar,
      lessons: 15,
    },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#f5f5f0]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <AnimatePresence mode="wait">
        {/* Hero Section */}
        {step === "home" && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen relative overflow-hidden"
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1760264554722-3df02df518f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwZWRpdG9yaWFsJTIwbW9kZWwlMjBibGFjayUyMHdoaXRlfGVufDF8fHx8MTc3MTQzMDU5N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Fashion Editorial"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/95 via-[#1a1a1a]/85 to-[#1a1a1a]" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              {/* Header */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-between mb-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#d4af37] rounded-lg flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-[#1a1a1a]" />
                  </div>
                  <span className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                    StyleAI
                  </span>
                </div>
                <div className="flex gap-4 items-center">
                  <span className="hidden md:block text-sm text-[#f5f5f0]/60">Powered by Advanced AI</span>
                  <div className="flex gap-2">
                    <Award className="w-5 h-5 text-[#d4af37]" />
                    <span className="text-sm text-[#d4af37]">Award Winning</span>
                  </div>
                </div>
              </motion.div>

              {/* Hero Content */}
              <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 mb-6">
                    <Zap className="w-4 h-4 text-[#d4af37]" />
                    <span className="text-sm">AI-Powered Fashion Intelligence</span>
                  </div>
                  
                  <h1
                    className="text-6xl lg:text-7xl mb-6 leading-tight"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Your Personal
                    <br />
                    <span className="text-[#d4af37]">AI Stylist</span>
                  </h1>
                  <p className="text-xl text-[#f5f5f0]/80 mb-8 leading-relaxed">
                    Upload a photo and receive personalized fashion recommendations powered by
                    advanced AI. Discover your perfect style, colors, and shopping curations.
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-6 mb-12">
                    {[
                      { value: "98%", label: "Accuracy" },
                      { value: "50K+", label: "Users" },
                      { value: "2M+", label: "Styles" },
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="text-center"
                      >
                        <div
                          className="text-3xl font-bold text-[#d4af37] mb-1"
                          style={{ fontFamily: 'Playfair Display, serif' }}
                        >
                          {stat.value}
                        </div>
                        <div className="text-sm text-[#f5f5f0]/60">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => setStep("upload")}
                      className="px-8 py-4 bg-[#d4af37] text-[#1a1a1a] rounded-lg font-semibold hover:bg-[#e5c158] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#d4af37]/20"
                    >
                      <Upload className="w-5 h-5" />
                      Get Started
                    </button>
                    <button
                      onClick={() => {
                        document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-[#d4af37]/30 rounded-lg font-semibold hover:bg-white/10 transition-all"
                    >
                      How It Works
                    </button>
                  </div>
                </motion.div>

                {/* Right side - Feature cards */}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-4"
                >
                  {[
                    { icon: Palette, title: "Skin Tone Analysis", desc: "AI-powered color matching" },
                    { icon: Shirt, title: "Outfit Curation", desc: "Personalized style recommendations" },
                    { icon: ShoppingBag, title: "Smart Shopping", desc: "Direct links to top retailers" },
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-[#d4af37]/20 hover:border-[#d4af37]/40 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 flex items-center justify-center">
                          <feature.icon className="w-6 h-6 text-[#d4af37]" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{feature.title}</h3>
                          <p className="text-sm text-[#f5f5f0]/60">{feature.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* How It Works Section */}
              <motion.div
                id="how-it-works"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-32 mb-32"
              >
                <div className="text-center mb-16">
                  <h2
                    className="text-5xl mb-4"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    How It <span className="text-[#d4af37]">Works</span>
                  </h2>
                  <p className="text-[#f5f5f0]/60 text-lg">
                    Four simple steps to discover your perfect style
                  </p>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                  {[
                    { num: "01", icon: Upload, title: "Upload Photo", desc: "Take a selfie or upload your image" },
                    { num: "02", icon: User, title: "Set Preferences", desc: "Choose gender, style, and occasion" },
                    { num: "03", icon: Sparkles, title: "AI Analysis", desc: "Advanced algorithms analyze your features" },
                    { num: "04", icon: CheckCircle, title: "Get Results", desc: "Receive personalized recommendations" },
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ y: 30, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-[#d4af37]/20 hover:border-[#d4af37]/40 transition-all h-full">
                        <div className="text-6xl font-bold text-[#d4af37]/20 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                          {step.num}
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 flex items-center justify-center mb-4">
                          <step.icon className="w-6 h-6 text-[#d4af37]" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-[#f5f5f0]/60">{step.desc}</p>
                      </div>
                      {index < 3 && (
                        <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                          <div className="w-8 h-0.5 bg-[#d4af37]/30" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Featured Styles Section */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="mb-32"
              >
                <div className="text-center mb-16">
                  <h2
                    className="text-5xl mb-4"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Featured <span className="text-[#d4af37]">Styles</span>
                  </h2>
                  <p className="text-[#f5f5f0]/60 text-lg">
                    Explore curated looks from our AI fashion experts
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {featuredStyles.map((style, index) => (
                    <motion.div
                      key={index}
                      initial={{ y: 30, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group cursor-pointer"
                    >
                      <div className="relative rounded-3xl overflow-hidden mb-4">
                        <ImageWithFallback
                          src={style.image}
                          alt={style.title}
                          className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 rounded-full bg-[#d4af37] text-[#1a1a1a] text-sm font-semibold">
                            {style.tag}
                          </span>
                        </div>
                        <div className="absolute bottom-6 left-6 right-6">
                          <h3 className="text-2xl font-semibold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                            {style.title}
                          </h3>
                          <p className="text-[#f5f5f0]/80">{style.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Testimonials Section */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="mb-32"
              >
                <div className="text-center mb-16">
                  <h2
                    className="text-5xl mb-4"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    What Our <span className="text-[#d4af37]">Clients Say</span>
                  </h2>
                  <p className="text-[#f5f5f0]/60 text-lg">
                    Real stories from fashion enthusiasts worldwide
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={index}
                      initial={{ y: 30, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-[#d4af37]/20 hover:border-[#d4af37]/40 transition-all"
                    >
                      <Quote className="w-10 h-10 text-[#d4af37] mb-4" />
                      <p className="text-[#f5f5f0]/90 mb-6 leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <ImageWithFallback
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold">{testimonial.name}</div>
                          <div className="text-sm text-[#f5f5f0]/60">{testimonial.role}</div>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Style Guides Section */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="mb-32"
              >
                <div className="text-center mb-16">
                  <h2
                    className="text-5xl mb-4"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Fashion <span className="text-[#d4af37]">Education</span>
                  </h2>
                  <p className="text-[#f5f5f0]/60 text-lg">
                    Master the art of personal styling with our comprehensive guides
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {styleGuides.map((guide, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0.95, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-[#d4af37]/20 hover:border-[#d4af37]/40 transition-all cursor-pointer group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 flex items-center justify-center mb-4 group-hover:bg-[#d4af37] transition-all">
                        <guide.icon className="w-6 h-6 text-[#d4af37] group-hover:text-[#1a1a1a] transition-all" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{guide.title}</h3>
                      <p className="text-sm text-[#f5f5f0]/60 mb-4">{guide.description}</p>
                      <div className="flex items-center gap-2 text-sm text-[#d4af37]">
                        <BookOpen className="w-4 h-4" />
                        <span>{guide.lessons} Lessons</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Virtual Wardrobe Section */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="mb-32"
              >
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2
                      className="text-5xl mb-6"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      Your <span className="text-[#d4af37]">Digital Wardrobe</span>
                    </h2>
                    <p className="text-[#f5f5f0]/80 text-lg mb-8 leading-relaxed">
                      Organize, mix, and match your outfits with our intelligent wardrobe management system. 
                      Get AI-powered suggestions for new combinations from your existing pieces.
                    </p>
                    <div className="space-y-4 mb-8">
                      {[
                        "Catalog all your clothing items",
                        "Create unlimited outfit combinations",
                        "Track what you wear and when",
                        "Get weather-based recommendations",
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <button className="px-8 py-4 bg-[#d4af37] text-[#1a1a1a] rounded-lg font-semibold hover:bg-[#e5c158] transition-all">
                      Explore Wardrobe
                    </button>
                  </div>
                  <div className="rounded-3xl overflow-hidden border border-[#d4af37]/20">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1618236444721-4a8dba415c15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJkcm9iZSUyMGNsb3NldCUyMGx1eHVyeXxlbnwxfHx8fDE3NzE0MzExNTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Virtual Wardrobe"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Stats & Achievements */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="mb-32"
              >
                <div className="p-12 rounded-3xl bg-gradient-to-br from-[#d4af37]/10 to-[#d4af37]/5 border border-[#d4af37]/30">
                  <div className="text-center mb-12">
                    <h2
                      className="text-5xl mb-4"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      Trusted by <span className="text-[#d4af37]">Thousands</span>
                    </h2>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                      { icon: Users, value: "50,000+", label: "Active Users" },
                      { icon: Shirt, value: "2M+", label: "Outfits Created" },
                      { icon: Star, value: "4.9/5", label: "Average Rating" },
                      { icon: Award, value: "15+", label: "Industry Awards" },
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="text-center"
                      >
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#d4af37]/10 flex items-center justify-center">
                          <stat.icon className="w-8 h-8 text-[#d4af37]" />
                        </div>
                        <div
                          className="text-4xl font-bold text-[#d4af37] mb-2"
                          style={{ fontFamily: 'Playfair Display, serif' }}
                        >
                          {stat.value}
                        </div>
                        <div className="text-[#f5f5f0]/60">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* CTA Section */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="mb-20"
              >
                <div className="p-12 md:p-16 rounded-3xl bg-gradient-to-br from-[#d4af37] to-[#b8941f] text-[#1a1a1a] text-center">
                  <h2
                    className="text-5xl mb-6"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Ready to Transform Your Style?
                  </h2>
                  <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                    Join thousands of fashion enthusiasts who've discovered their perfect style with StyleAI
                  </p>
                  <button
                    onClick={() => setStep("upload")}
                    className="px-12 py-5 bg-[#1a1a1a] text-[#f5f5f0] rounded-lg font-semibold hover:bg-[#2a2a2a] transition-all text-lg inline-flex items-center gap-3"
                  >
                    Start Your Journey
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </div>
              </motion.div>

              {/* Footer */}
              <footer className="border-t border-[#d4af37]/20 pt-12">
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-[#d4af37] rounded-lg flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-[#1a1a1a]" />
                      </div>
                      <span className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                        StyleAI
                      </span>
                    </div>
                    <p className="text-sm text-[#f5f5f0]/60 mb-4">
                      Your personal AI fashion consultant, available 24/7
                    </p>
                    <div className="flex gap-3">
                      <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-[#d4af37]/20 flex items-center justify-center hover:bg-white/10 transition-all">
                        <Instagram className="w-5 h-5" />
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-[#d4af37]/20 flex items-center justify-center hover:bg-white/10 transition-all">
                        <Twitter className="w-5 h-5" />
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-[#d4af37]/20 flex items-center justify-center hover:bg-white/10 transition-all">
                        <Mail className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-4">Features</h4>
                    <ul className="space-y-2 text-sm text-[#f5f5f0]/60">
                      <li><a href="#" className="hover:text-[#d4af37] transition-colors">AI Analysis</a></li>
                      <li><a href="#" className="hover:text-[#d4af37] transition-colors">Style Quiz</a></li>
                      <li><a href="#" className="hover:text-[#d4af37] transition-colors">Virtual Wardrobe</a></li>
                      <li><a href="#" className="hover:text-[#d4af37] transition-colors">AR Try-On</a></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-4">Resources</h4>
                    <ul className="space-y-2 text-sm text-[#f5f5f0]/60">
                      <li><a href="#" className="hover:text-[#d4af37] transition-colors">Style Guides</a></li>
                      <li><a href="#" className="hover:text-[#d4af37] transition-colors">Blog</a></li>
                      <li><a href="#" className="hover:text-[#d4af37] transition-colors">Fashion Tips</a></li>
                      <li><a href="#" className="hover:text-[#d4af37] transition-colors">Trends</a></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-4">Company</h4>
                    <ul className="space-y-2 text-sm text-[#f5f5f0]/60">
                      <li><a href="#" className="hover:text-[#d4af37] transition-colors">About Us</a></li>
                      <li><a href="#" className="hover:text-[#d4af37] transition-colors">Privacy Policy</a></li>
                      <li><a href="#" className="hover:text-[#d4af37] transition-colors">Terms of Service</a></li>
                      <li><a href="#" className="hover:text-[#d4af37] transition-colors">Contact</a></li>
                    </ul>
                  </div>
                </div>
                
                <div className="border-t border-[#d4af37]/20 pt-8 text-center text-sm text-[#f5f5f0]/60">
                  <p>© 2026 StyleAI. All rights reserved. Crafted with ❤️ for fashion enthusiasts.</p>
                </div>
              </footer>
            </div>
          </motion.div>
        )}

        {/* Upload Section */}
        {step === "upload" && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="min-h-screen flex items-center justify-center px-4 py-20"
          >
            <div className="max-w-2xl w-full">
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="p-8 md:p-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-[#d4af37]/20"
              >
                <h2
                  className="text-4xl md:text-5xl mb-4 text-center"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Upload Your <span className="text-[#d4af37]">Photo</span>
                </h2>
                <p className="text-center text-[#f5f5f0]/60 mb-8">
                  Take a selfie or upload a clear photo of yourself for best results
                </p>

                {!isCameraActive ? (
                  <div
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className="border-2 border-dashed border-[#d4af37]/30 rounded-2xl p-12 text-center hover:border-[#d4af37]/50 transition-all cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                      <Upload className="w-10 h-10 text-[#d4af37]" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Drag & drop your photo</h3>
                    <p className="text-[#f5f5f0]/60 mb-6">or click to browse</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="rounded-2xl overflow-hidden mb-4">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full rounded-2xl"
                    />
                  </div>
                )}

                <div className="flex gap-4 mt-6">
                  {!isCameraActive ? (
                    <button
                      onClick={startCamera}
                      className="flex-1 px-6 py-4 bg-[#d4af37] text-[#1a1a1a] rounded-xl font-semibold hover:bg-[#e5c158] transition-all flex items-center justify-center gap-2"
                    >
                      <Camera className="w-5 h-5" />
                      Use Camera
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={capturePhoto}
                        className="flex-1 px-6 py-4 bg-[#d4af37] text-[#1a1a1a] rounded-xl font-semibold hover:bg-[#e5c158] transition-all"
                      >
                        Capture Photo
                      </button>
                      <button
                        onClick={stopCamera}
                        className="px-6 py-4 bg-white/5 border border-[#d4af37]/30 rounded-xl font-semibold hover:bg-white/10 transition-all"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>

                <button
                  onClick={() => setStep("home")}
                  className="w-full mt-4 px-6 py-3 text-[#f5f5f0]/60 hover:text-[#f5f5f0] transition-all"
                >
                  ← Back to Home
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Preferences Section */}
        {step === "preferences" && (
          <motion.div
            key="preferences"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="min-h-screen flex items-center justify-center px-4 py-20"
          >
            <div className="max-w-4xl w-full">
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="p-8 md:p-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-[#d4af37]/20"
              >
                <h2
                  className="text-4xl md:text-5xl mb-4 text-center"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Tell Us Your <span className="text-[#d4af37]">Style</span>
                </h2>
                <p className="text-center text-[#f5f5f0]/60 mb-12">
                  Help us personalize your recommendations
                </p>

                {/* Gender Selection */}
                <div className="mb-8">
                  <label className="block text-lg font-semibold mb-4">Gender</label>
                  <div className="grid grid-cols-3 gap-4">
                    {(["female", "male", "non-binary"] as Gender[]).map((gender) => (
                      <button
                        key={gender}
                        onClick={() => setPreferences({ ...preferences, gender })}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          preferences.gender === gender
                            ? "border-[#d4af37] bg-[#d4af37]/10"
                            : "border-[#d4af37]/20 hover:border-[#d4af37]/40"
                        }`}
                      >
                        <User className="w-6 h-6 mx-auto mb-2 text-[#d4af37]" />
                        <div className="capitalize text-sm">{gender}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Style Preference */}
                <div className="mb-8">
                  <label className="block text-lg font-semibold mb-4">Style Preference</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {(["casual", "formal", "street", "bohemian", "minimalist", "classic"] as StyleType[]).map(
                      (style) => (
                        <button
                          key={style}
                          onClick={() => setPreferences({ ...preferences, style })}
                          className={`p-4 rounded-xl border-2 transition-all capitalize ${
                            preferences.style === style
                              ? "border-[#d4af37] bg-[#d4af37]/10"
                              : "border-[#d4af37]/20 hover:border-[#d4af37]/40"
                          }`}
                        >
                          {style}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Occasion */}
                <div className="mb-8">
                  <label className="block text-lg font-semibold mb-4">Occasion</label>
                  <select
                    value={preferences.occasion}
                    onChange={(e) => setPreferences({ ...preferences, occasion: e.target.value })}
                    className="w-full p-4 rounded-xl bg-white/5 border border-[#d4af37]/20 focus:border-[#d4af37] outline-none"
                  >
                    <option value="">Select occasion</option>
                    <option value="everyday">Everyday Wear</option>
                    <option value="work">Work/Office</option>
                    <option value="party">Party/Event</option>
                    <option value="date">Date Night</option>
                    <option value="formal">Formal Event</option>
                  </select>
                </div>

                {/* Budget */}
                <div className="mb-8">
                  <label className="block text-lg font-semibold mb-4">Budget Range</label>
                  <select
                    value={preferences.budget}
                    onChange={(e) => setPreferences({ ...preferences, budget: e.target.value })}
                    className="w-full p-4 rounded-xl bg-white/5 border border-[#d4af37]/20 focus:border-[#d4af37] outline-none"
                  >
                    <option value="">Select budget</option>
                    <option value="budget">Budget Friendly (₹)</option>
                    <option value="mid">Mid Range (₹₹)</option>
                    <option value="premium">Premium (₹₹₹)</option>
                    <option value="luxury">Luxury (₹₹₹₹)</option>
                  </select>
                </div>

                <button
                  onClick={startAnalysis}
                  disabled={!preferences.gender || !preferences.style || !preferences.occasion || !preferences.budget}
                  className="w-full px-8 py-4 bg-[#d4af37] text-[#1a1a1a] rounded-xl font-semibold hover:bg-[#e5c158] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Analyze My Style
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Analyzing Section */}
        {step === "analyzing" && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center px-4"
          >
            <div className="max-w-md w-full text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 mx-auto mb-8 rounded-full border-4 border-[#d4af37]/20 border-t-[#d4af37]"
              />
              <h2
                className="text-3xl mb-4"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                <span className="text-[#d4af37]">Analyzing</span> Your Style
              </h2>
              <p className="text-[#f5f5f0]/60 mb-8">{analysisMessage}</p>
              
              <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#d4af37] to-[#e5c158]"
                  initial={{ width: 0 }}
                  animate={{ width: `${analysisProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="mt-2 text-sm text-[#d4af37]">{Math.round(analysisProgress)}%</div>
            </div>
          </motion.div>
        )}

        {/* Results Section */}
        {step === "results" && analysisResult && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen py-20 px-4"
          >
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center mb-16"
              >
                <h1
                  className="text-5xl md:text-6xl mb-4"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Your <span className="text-[#d4af37]">Perfect</span> Style
                </h1>
                <p className="text-[#f5f5f0]/60 text-lg">
                  Personalized recommendations curated just for you
                </p>
              </motion.div>

              {/* Skin Tone Analysis Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-12 p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-[#d4af37]/20"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Palette className="w-6 h-6 text-[#d4af37]" />
                  <h2 className="text-2xl font-semibold" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Skin Tone Analysis
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className="w-24 h-24 rounded-2xl shadow-lg border-2 border-[#d4af37]/30"
                        style={{ backgroundColor: analysisResult.skinTone.color }}
                      />
                      <div>
                        <div className="text-xl font-semibold mb-1">
                          {analysisResult.skinTone.name}
                        </div>
                        <div className="text-[#f5f5f0]/60">Confidence: {analysisResult.skinTone.confidence}%</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-[#f5f5f0]/60">Match Confidence</span>
                        <span className="text-sm font-semibold text-[#d4af37]">
                          {analysisResult.skinTone.confidence}%
                        </span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#d4af37] to-[#e5c158]"
                          style={{ width: `${analysisResult.skinTone.confidence}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Recommended Color Palette</h3>
                    <div className="grid grid-cols-6 gap-3">
                      {analysisResult.skinTone.palette.map((color, index) => (
                        <div
                          key={index}
                          className="aspect-square rounded-lg shadow-md border border-[#d4af37]/20 hover:scale-110 transition-transform cursor-pointer"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Outfit Recommendations */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-12"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Shirt className="w-6 h-6 text-[#d4af37]" />
                    <h2 className="text-2xl font-semibold" style={{ fontFamily: 'Playfair Display, serif' }}>
                      Outfit Recommendations
                    </h2>
                  </div>
                  <button
                    onClick={() => setShowARPreview(true)}
                    className="px-4 py-2 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-lg hover:bg-[#d4af37]/20 transition-all flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    AR Preview
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {analysisResult.recommendations.outfits.map((outfit, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-[#d4af37]/20 hover:border-[#d4af37]/40 transition-all"
                    >
                      <div className="relative h-64">
                        <ImageWithFallback
                          src={outfit.image}
                          alt={outfit.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{outfit.title}</h3>
                        <p className="text-[#f5f5f0]/60 text-sm mb-4">{outfit.description}</p>
                        <div className="space-y-2">
                          {outfit.items.map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Colors & Accessories Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {/* Best Colors */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-[#d4af37]/20"
                >
                  <h3 className="text-xl font-semibold mb-4">Best Colors for You</h3>
                  <div className="space-y-3">
                    {analysisResult.recommendations.colors.map((color, index) => (
                      <div
                        key={index}
                        className="px-4 py-3 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/20"
                      >
                        {color}
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Accessories */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-[#d4af37]/20"
                >
                  <h3 className="text-xl font-semibold mb-4">Recommended Accessories</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.recommendations.accessories.map((accessory, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 text-sm"
                      >
                        {accessory}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 rounded-lg bg-[#d4af37]/5 border border-[#d4af37]/20">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold mb-1">Hairstyle Tip</div>
                        <div className="text-sm text-[#f5f5f0]/80">
                          {analysisResult.recommendations.hairstyle}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Shopping Links */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-[#d4af37]/20 mb-12"
              >
                <div className="flex items-center gap-3 mb-6">
                  <ShoppingBag className="w-6 h-6 text-[#d4af37]" />
                  <h2 className="text-2xl font-semibold" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Shop Your Style
                  </h2>
                </div>

                <p className="text-[#f5f5f0]/60 mb-6">
                  Find curated pieces from top retailers that match your style profile
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    {
                      name: "Amazon.in",
                      url: "https://www.amazon.in/fashion",
                      desc: "Wide selection, great deals",
                    },
                    {
                      name: "Myntra",
                      url: "https://www.myntra.com/",
                      desc: "Trendy Indian fashion",
                    },
                    {
                      name: "Zara",
                      url: "https://www.zara.com/in/",
                      desc: "High-end contemporary",
                    },
                  ].map((store, index) => (
                    <a
                      key={index}
                      href={store.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-6 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 hover:bg-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">{store.name}</h3>
                        <TrendingUp className="w-5 h-5 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
                      </div>
                      <p className="text-sm text-[#f5f5f0]/60">{store.desc}</p>
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    setStep("upload");
                    setUploadedImage(null);
                    setPreferences({ gender: null, style: null, occasion: "", budget: "" });
                    setAnalysisResult(null);
                  }}
                  className="flex-1 px-8 py-4 bg-[#d4af37] text-[#1a1a1a] rounded-xl font-semibold hover:bg-[#e5c158] transition-all"
                >
                  Try Another Photo
                </button>
                <button className="flex-1 px-8 py-4 bg-white/5 border border-[#d4af37]/30 rounded-xl font-semibold hover:bg-white/10 transition-all">
                  Save Results
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AR Preview Modal */}
      <AnimatePresence>
        {showARPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowARPreview(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-[#d4af37]/20"
            >
              <h3
                className="text-3xl mb-4 text-center"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                <span className="text-[#d4af37]">AR</span> Virtual Try-On
              </h3>
              <p className="text-center text-[#f5f5f0]/60 mb-8">
                Coming soon - Try on outfits virtually with augmented reality
              </p>

              <div className="aspect-video rounded-2xl bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 border border-[#d4af37]/30 flex items-center justify-center mb-6">
                <div className="text-center">
                  <Eye className="w-16 h-16 text-[#d4af37] mx-auto mb-4 opacity-50" />
                  <p className="text-[#f5f5f0]/40">AR Experience Preview</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {["Front View", "Side View", "Back View"].map((view, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/20 text-center text-sm"
                  >
                    {view}
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowARPreview(false)}
                className="w-full px-6 py-3 bg-[#d4af37] text-[#1a1a1a] rounded-xl font-semibold hover:bg-[#e5c158] transition-all"
              >
                Close Preview
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Chatbot Button */}
      <AnimatePresence>
        {!chatOpen && step === "home" && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setChatOpen(true)}
            className="fixed bottom-8 right-8 w-16 h-16 bg-[#d4af37] rounded-full shadow-2xl flex items-center justify-center hover:bg-[#e5c158] transition-all z-50"
          >
            <MessageCircle className="w-7 h-7 text-[#1a1a1a]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chatbot Panel */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 w-96 h-[500px] bg-[#1a1a1a] border-2 border-[#d4af37]/30 rounded-3xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-6 border-b border-[#d4af37]/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#d4af37] rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[#1a1a1a]" />
                </div>
                <div>
                  <div className="font-semibold">Style Assistant</div>
                  <div className="text-xs text-[#f5f5f0]/60">Online now</div>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center transition-all"
              >
                ×
              </button>
            </div>
            
            <div className="h-[340px] p-6 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-[#d4af37] rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-[#1a1a1a]" />
                  </div>
                  <div className="bg-white/5 rounded-2xl rounded-tl-none p-4 max-w-[80%]">
                    <p className="text-sm">
                      Hi! I'm your AI style assistant. I can help you with fashion advice, color matching, and outfit suggestions. How can I help you today?
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-[#d4af37]/20">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-[#d4af37]/20 focus:border-[#d4af37] outline-none text-sm"
                />
                <button className="w-12 h-12 bg-[#d4af37] rounded-xl flex items-center justify-center hover:bg-[#e5c158] transition-all">
                  <ArrowRight className="w-5 h-5 text-[#1a1a1a]" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
