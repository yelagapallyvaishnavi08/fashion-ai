import { Link } from "react-router";
import { Sparkles, ImageIcon, Shirt, TrendingUp, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Home() {
  const features = [
    {
      icon: Sparkles,
      title: "Style Quiz",
      description: "Discover your unique style through our AI-powered questionnaire",
      color: "from-purple-500 to-pink-500",
      link: "/style-quiz",
    },
    {
      icon: ImageIcon,
      title: "Image Analysis",
      description: "Upload photos and get instant AI-powered styling suggestions",
      color: "from-blue-500 to-cyan-500",
      link: "/image-analysis",
    },
    {
      icon: Shirt,
      title: "Outfit Recommendations",
      description: "Get personalized outfit ideas tailored to your preferences",
      color: "from-pink-500 to-rose-500",
      link: "/outfits",
    },
    {
      icon: TrendingUp,
      title: "Trend Insights",
      description: "Stay ahead with the latest fashion trends and predictions",
      color: "from-indigo-500 to-purple-500",
      link: "/trends",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  Your Personal
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  AI Stylist
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Experience the future of fashion with AI-powered personalized styling,
                intelligent outfit recommendations, and trend-aware insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/style-quiz"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg transition-all"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/image-analysis"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-800 rounded-full border-2 border-gray-200 hover:border-purple-300 hover:shadow-md transition-all"
                >
                  Upload Image
                  <ImageIcon className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1762430815537-e140755eedf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcnVud2F5JTIwbW9kZWwlMjBzdHlsaXNofGVufDF8fHx8MTc3MTM0MjY4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Fashion model"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl opacity-50" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-50" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                AI-Powered Features
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Discover personalized fashion recommendations designed just for you
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={feature.link}
                    className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <div className="flex items-center gap-2 text-purple-600 font-medium">
                      Explore
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { value: "1M+", label: "Style Recommendations" },
              { value: "50K+", label: "Happy Users" },
              { value: "99%", label: "Satisfaction Rate" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl text-white shadow-xl"
              >
                <div className="text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-purple-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
