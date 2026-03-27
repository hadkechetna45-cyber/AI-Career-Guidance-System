import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { QuizAnswers, calculateMatches, CareerMatch } from "@/lib/careers";
import { ChevronLeft, ChevronRight, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const QUESTIONS = [
  {
    key: "subjects" as const,
    title: "What topics excite you most?",
    subtitle: "Choose the area that genuinely interests you.",
    type: "single" as const,
    options: [
      { label: "Technology", icon: "💻" },
      { label: "Arts & Design", icon: "🎨" },
      { label: "Business & Finance", icon: "💼" },
      { label: "Healthcare", icon: "🏥" },
      { label: "Education", icon: "📚" },
      { label: "Science & Research", icon: "🔬" },
      { label: "Social Work", icon: "🤝" },
      { label: "Engineering", icon: "⚙️" },
    ],
  },
  {
    key: "environment" as const,
    title: "Where do you want to work?",
    subtitle: "Pick the environment that feels right for you.",
    type: "single" as const,
    options: [
      { label: "Remote/Home", icon: "🏠" },
      { label: "Office/Corporate", icon: "🏢" },
      { label: "Outdoors/Field", icon: "🌳" },
      { label: "Hospital/Lab", icon: "🏥" },
      { label: "Creative Studio", icon: "🎭" },
      { label: "Flexible/Hybrid", icon: "🔄" },
    ],
  },
  {
    key: "strengths" as const,
    title: "What are your top strengths?",
    subtitle: "Select up to 3 that best describe you.",
    type: "multi" as const,
    max: 3,
    options: [
      { label: "Problem Solving", icon: "🧩" },
      { label: "Communication", icon: "💬" },
      { label: "Creativity", icon: "✨" },
      { label: "Leadership", icon: "👑" },
      { label: "Attention to Detail", icon: "🔍" },
      { label: "Empathy", icon: "❤️" },
      { label: "Analytical Thinking", icon: "📊" },
      { label: "Physical Dexterity", icon: "🛠️" },
    ],
  },
  {
    key: "motivation" as const,
    title: "What motivates you most?",
    subtitle: "Be honest — this shapes your match.",
    type: "single" as const,
    options: [
      { label: "Helping others", icon: "🤲" },
      { label: "Making money", icon: "💰" },
      { label: "Creative expression", icon: "🎨" },
      { label: "Solving hard problems", icon: "🧠" },
      { label: "Making an impact", icon: "🌍" },
      { label: "Building things", icon: "🏗️" },
      { label: "Learning constantly", icon: "📖" },
    ],
  },
  {
    key: "education" as const,
    title: "What's your preferred education path?",
    subtitle: "There's no wrong answer — it's about what fits your life.",
    type: "single" as const,
    options: [
      { label: "High School only", icon: "🎓" },
      { label: "Trade/Vocational", icon: "🔧" },
      { label: "Associate Degree", icon: "📜" },
      { label: "Bachelor's Degree", icon: "🏫" },
      { label: "Master's or higher", icon: "🎓" },
    ],
  },
  {
    key: "personality" as const,
    title: "How would you describe your work style?",
    subtitle: "Pick the one that resonates most.",
    type: "single" as const,
    options: [
      { label: "Leader", icon: "👑" },
      { label: "Team Player", icon: "🤝" },
      { label: "Independent Worker", icon: "🧘" },
      { label: "Adaptable/Flexible", icon: "🌊" },
      { label: "Detail-Oriented", icon: "🔍" },
    ],
  },
];

interface QuizPageProps {
  onComplete: (matches: CareerMatch[]) => void;
  onBack: () => void;
}

export default function QuizPage({ onComplete, onBack }: QuizPageProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({
    subjects: null,
    environment: null,
    strengths: [],
    motivation: null,
    education: null,
    personality: null,
  });

  const q = QUESTIONS[step];
  const total = QUESTIONS.length;
  const progress = ((step + 1) / total) * 100;

  const currentValue = answers[q.key];
  const isAnswered = q.type === "single"
    ? currentValue !== null
    : (currentValue as string[]).length > 0;

  function toggleSingle(option: string) {
    setAnswers(prev => ({ ...prev, [q.key]: option }));
  }

  function toggleMulti(option: string) {
    const current = answers.strengths;
    if (current.includes(option)) {
      setAnswers(prev => ({ ...prev, strengths: current.filter(s => s !== option) }));
    } else if (current.length < (q.max || 99)) {
      setAnswers(prev => ({ ...prev, strengths: [...current, option] }));
    }
  }

  function handleNext() {
    if (step < total - 1) {
      setStep(s => s + 1);
    } else {
      const matches = calculateMatches(answers);
      onComplete(matches.slice(0, 3));
    }
  }

  function handleBack() {
    if (step === 0) onBack();
    else setStep(s => s - 1);
  }

  function isSelected(option: string) {
    if (q.type === "single") return currentValue === option;
    return (answers.strengths || []).includes(option);
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <Button variant="ghost" size="sm" onClick={handleBack} className="gap-1 -ml-2" data-testid="button-quiz-back">
              <ChevronLeft className="w-4 h-4" />
              {step === 0 ? "Home" : "Back"}
            </Button>
            <span className="text-sm text-muted-foreground font-medium" data-testid="text-step-counter">
              {step + 1} / {total}
            </span>
          </div>
          <Progress value={progress} className="h-2" data-testid="progress-quiz" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className="text-xs" data-testid="badge-question-num">
              Question {step + 1}
            </Badge>
            {q.type === "multi" && (
              <Badge variant="secondary" className="text-xs" data-testid="badge-multi-hint">
                Select up to {q.max}
              </Badge>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2" data-testid="text-question-title">{q.title}</h2>
          <p className="text-muted-foreground" data-testid="text-question-subtitle">{q.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {q.options.map((option, i) => {
            const selected = isSelected(option.label);
            return (
              <button
                key={i}
                onClick={() => q.type === "single" ? toggleSingle(option.label) : toggleMulti(option.label)}
                data-testid={`option-${q.key}-${i}`}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-md border-2 text-left transition-all duration-150 w-full group",
                  selected
                    ? "border-primary bg-primary/8 text-foreground"
                    : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-muted/50"
                )}
              >
                <span className="text-2xl flex-shrink-0">{option.icon}</span>
                <span className="font-medium flex-1 text-sm sm:text-base">{option.label}</span>
                <span className="flex-shrink-0 ml-auto">
                  {selected
                    ? <CheckCircle2 className="w-5 h-5 text-primary" />
                    : <Circle className="w-5 h-5 text-muted-foreground/30 group-hover:text-muted-foreground/60" />
                  }
                </span>
              </button>
            );
          })}
        </div>

        {q.type === "multi" && (
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              {answers.strengths.length} of {q.max} selected
              {answers.strengths.length === q.max && (
                <span className="text-primary ml-2">— maximum reached</span>
              )}
            </p>
          </div>
        )}

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex-1 gap-2"
            data-testid="button-prev"
          >
            <ChevronLeft className="w-4 h-4" />
            {step === 0 ? "Home" : "Previous"}
          </Button>
          <Button
            onClick={handleNext}
            disabled={!isAnswered}
            className="flex-1 gap-2"
            data-testid="button-next"
          >
            {step === total - 1 ? "See My Results" : "Continue"}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
