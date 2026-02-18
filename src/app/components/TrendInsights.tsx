import { motion } from "motion/react";
import { TrendingUp, Calendar, Sparkles, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Trend {
  id: number;
  title: string;
  description: string;
  image: string;
  popularity: number;
  season: string;
  tags: string[];
}

export function TrendInsights() {
  const trends: Trend[] = [
    {
      id: 1,
      title: "Oversized Blazers",
      description: "Power dressing meets comfort with structured yet relaxed silhouettes dominating the runway and streets.",
      image: "https://images.unsplash.com/photo-1762430815620-fcca603c240c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwdHJlbmRzJTIwcnVud2F5fGVufDF8fHx8MTc3MTM4NjYyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      popularity: 95,
      season: "Spring 2026",
      tags: ["Work Wear", "Power Dressing", "Comfort"],
    },
    {
      id: 2,
      title: "Sustainable Fashion",
      description: "Eco-conscious materials and ethical production take center stage as sustainability becomes non-negotiable.",
      image: "https://images.unsplash.com/photo-1749813991859-8953e5b4dd26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGZhc2hpb24lMjBlY298ZW58MXx8fHwxNzcxNDIxMTg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      popularity: 92,
      season: "All Seasons",
      tags: ["Eco-Friendly", "Conscious", "Innovation"],
    },
    {
      id: 3,
      title: "Athleisure Evolution",
      description: "Performance meets luxury with elevated sportswear pieces that transition seamlessly from gym to street.",
      image: "https://images.unsplash.com/photo-1763770472234-644c786014ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZWlzdXJlJTIwc3BvcnR5JTIwZmFzaGlvbnxlbnwxfHx8fDE3NzE0MjU4ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      popularity: 88,
      season: "Spring 2026",
      tags: ["Sporty", "Comfort", "Versatile"],
    },
    {
      id: 4,
      title: "Vintage Revival",
      description: "Y2K aesthetics and 90s minimalism collide in a nostalgic yet modern interpretation of retro fashion.",
      image: "https://images.unsplash.com/photo-1769467304499-8f2e56c88ec7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwcmV0cm8lMjBmYXNoaW9ufGVufDF8fHx8MTc3MTQyNTg4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      popularity: 85,
      season: "Spring 2026",
      tags: ["Retro", "Y2K", "Nostalgic"],
    },
  ];

  const upcomingTrends = [
    {
      title: "Bold Color Blocking",
      prediction: "High",
      timeline: "Summer 2026",
    },
    {
      title: "Maximalist Accessories",
      prediction: "Medium-High",
      timeline: "Fall 2026",
    },
    {
      title: "Tech-Integrated Fabrics",
      prediction: "High",
      timeline: "Fall 2026",
    },
    {
      title: "Gender-Fluid Silhouettes",
      prediction: "Very High",
      timeline: "Ongoing",
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full mb-4">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            <span className="text-indigo-700 font-medium">AI Trend Forecasting</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Fashion Trend Insights
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay ahead of the curve with AI-powered trend analysis and predictions based on global fashion data.
          </p>
        </motion.div>

        {/* Current Trends */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8"
          >
            Trending Now
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {trends.map((trend, index) => (
              <motion.div
                key={trend.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="relative">
                  <ImageWithFallback
                    src={trend.image}
                    alt={trend.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Popularity Badge */}
                  <div className="absolute top-4 right-4 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-1.5 h-4 rounded-full ${
                              i < Math.floor(trend.popularity / 20)
                                ? "bg-gradient-to-t from-indigo-600 to-purple-600"
                                : "bg-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-semibold">{trend.popularity}%</span>
                    </div>
                  </div>

                  {/* Season Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-sm font-medium">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {trend.season}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{trend.title}</h3>
                  <p className="text-gray-600 mb-4">{trend.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {trend.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-full text-sm border border-indigo-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    Explore Trend
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Upcoming Predictions */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8"
          >
            AI Predictions
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {upcomingTrends.map((trend, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 border-2 border-transparent hover:border-indigo-300 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1">{trend.title}</h3>
                    <p className="text-gray-600 text-sm">{trend.timeline}</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border border-green-200">
                    <Sparkles className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-700">
                      {trend.prediction}
                    </span>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all"
                    style={{
                      width:
                        trend.prediction === "Very High"
                          ? "95%"
                          : trend.prediction === "High"
                          ? "80%"
                          : "65%",
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Trend Analysis Stats */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">
              Global Fashion Insights
            </h2>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { value: "2.5M+", label: "Trends Analyzed" },
                { value: "150+", label: "Fashion Weeks Tracked" },
                { value: "92%", label: "Prediction Accuracy" },
                { value: "24/7", label: "Real-Time Updates" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
                >
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-indigo-100">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
