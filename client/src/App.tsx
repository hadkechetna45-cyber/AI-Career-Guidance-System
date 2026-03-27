import { useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/navbar";
import HomePage from "@/pages/home";
import QuizPage from "@/pages/quiz";
import ResultsPage from "@/pages/results";
import ExplorePage from "@/pages/explore";
import { CareerMatch } from "@/lib/careers";

type Page = "home" | "quiz" | "results" | "explore";

function AppContent() {
  const [page, setPage] = useState<Page>("home");
  const [results, setResults] = useState<CareerMatch[]>([]);

  function goHome() { setPage("home"); }
  function goQuiz() { setPage("quiz"); }
  function goExplore() { setPage("explore"); }
  function goResults() { setPage("results"); }

  function handleQuizComplete(matches: CareerMatch[]) {
    setResults(matches);
    setPage("results");
  }

  function handleRetake() {
    setResults([]);
    setPage("quiz");
  }

  const showNavbar = page !== "quiz";

  return (
    <div className="min-h-screen bg-background">
      {showNavbar && (
        <Navbar
          currentPage={page}
          onHome={goHome}
          onQuiz={goQuiz}
          onExplore={goExplore}
        />
      )}

      {page === "home" && (
        <HomePage onStartQuiz={goQuiz} onExplore={goExplore} />
      )}
      {page === "quiz" && (
        <QuizPage onComplete={handleQuizComplete} onBack={goHome} />
      )}
      {page === "results" && (
        <ResultsPage matches={results} onRetake={handleRetake} onExplore={goExplore} />
      )}
      {page === "explore" && (
        <ExplorePage onStartQuiz={goQuiz} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AppContent />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
