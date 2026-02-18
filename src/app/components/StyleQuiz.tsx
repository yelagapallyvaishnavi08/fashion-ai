import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

interface StylePreferences {
  gender: string;
  ageGroup: string;
  style: string[];
  colors: string[];
  occasions: string[];
  budget: string;
}

export function StyleQuiz() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<StylePreferences>({
    gender: "",
    ageGroup: "",
    style: [],
    colors: [],
    occasions: [],
    budget: "",
  });

  const totalSteps = 6;

  const questions = {
    1: {
      title: "What's your gender preference?",
      options: ["Women's Fashion", "Men's Fashion", "Unisex", "Prefer not to say"],
      field: "gender" as const,
      multiSelect: false,
    },
    2: {
      title: "What's your age group?",
      options: ["18-25", "26-35", "36-45", "46-55", "56+"],
      field: "ageGroup" as const,
      multiSelect: false,
    },
    3: {
      title: "What styles do you prefer?",
      options: ["Casual", "Formal", "Street Style", "Bohemian", "Minimalist", "Vintage", "Sporty", "Chic"],
      field: "style" as const,
      multiSelect: true,
    },
    4: {
      title: "What are your favorite colors?",
      options: ["Black", "White", "Neutral Tones", "Pastels", "Bold Colors", "Earth Tones", "Jewel Tones"],
      field: "colors" as const,
      multiSelect: true,
    },
    5: {
      title: "What occasions do you dress for?",
      options: ["Work", "Casual Outings", "Parties", "Formal Events", "Sports", "Travel", "Date Night"],
      field: "occasions" as const,
      multiSelect: true,
    },
    6: {
      title: "What's your budget range?",
      options: ["Budget-Friendly ($)", "Mid-Range ($$)", "Premium ($$$)", "Luxury ($$$$)"],
      field: "budget" as const,
      multiSelect: false,
    },
  };

  const currentQuestion = questions[step as keyof typeof questions];

  const handleSelect = (option: string) => {
    const field = currentQuestion.field;
    
    if (currentQuestion.multiSelect) {
      const currentValues = preferences[field] as string[];
      const newValues = currentValues.includes(option)
        ? currentValues.filter((v) => v !== option)
        : [...currentValues, option];
      setPreferences({ ...preferences, [field]: newValues });
    } else {
      setPreferences({ ...preferences, [field]: option });
    }
  };

  const isSelected = (option: string) => {
    const field = currentQuestion.field;
    const value = preferences[field];
    return Array.isArray(value) ? value.includes(option) : value === option;
  };

  const canProceed = () => {
    const field = currentQuestion.field;
    const value = preferences[field];
    return Array.isArray(value) ? value.length > 0 : value !== "";
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Quiz complete - navigate to recommendations
      navigate("/outfits", { state: { preferences } });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-600">
                Step {step} of {totalSteps}
              </span>
              <span className="text-sm font-medium text-purple-600">
                {Math.round((step / totalSteps) * 100)}%
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
                initial={{ width: 0 }}
                animate={{ width: `${(step / totalSteps) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-2">{currentQuestion.title}</h2>
            {currentQuestion.multiSelect && (
              <p className="text-gray-600 mb-8">Select all that apply</p>
            )}

            {/* Options */}
            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    isSelected(option)
                      ? "border-purple-600 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {isSelected(option) && (
                      <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                step === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex items-center gap-2 px-8 py-3 rounded-full transition-all ${
                canProceed()
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {step === totalSteps ? "See Recommendations" : "Next"}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
