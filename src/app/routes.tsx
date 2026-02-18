import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/Home";
import { StyleQuiz } from "./components/StyleQuiz";
import { ImageAnalysis } from "./components/ImageAnalysis";
import { OutfitRecommendations } from "./components/OutfitRecommendations";
import { TrendInsights } from "./components/TrendInsights";
import { NotFound } from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "style-quiz", Component: StyleQuiz },
      { path: "image-analysis", Component: ImageAnalysis },
      { path: "outfits", Component: OutfitRecommendations },
      { path: "trends", Component: TrendInsights },
      { path: "*", Component: NotFound },
    ],
  },
]);
