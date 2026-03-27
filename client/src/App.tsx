import { useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme";
import Navbar from "@/components/navbar";
import HomePage from "@/pages/home";
import QuizPage from "@/pages/quiz";
import ResultsPage from "@/pages/results";
import ExplorePage from "@/pages/explore";
import ProfilePage from "@/pages/profile";
import { CareerMatch } from "@/lib/careers";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest } from "@/lib/queryClient";

type Page = "home" | "quiz" | "results" | "explore" | "profile";

function AppContent() {
  const [page, setPage] = useState<Page>("home");
  const [results, setResults] = useState<CareerMatch[]>([]);
  const { user } = useAuth();

  function goHome() { setPage("home"); }
  function goQuiz() { setPage("quiz"); }
  function goExplore() { setPage("explore"); }
  function goProfile() { setPage("profile"); }

  async function handleQuizComplete(matches: CareerMatch[]) {
    setResults(matches);
    setPage("results");

    // Save result if user is logged in
    if (user) {
      try {
        await apiRequest("POST", "/api/quiz-results", {
          userId: user.id,
          answers: {},
          topCareer: matches[0]?.career?.title ?? null,
          matches: matches,
        });
        queryClient.invalidateQueries({ queryKey: ["/api/quiz-results"] });
      } catch (e) {
        // silently fail — results still shown
      }
    }
  }

  function handleRetake() {
    setResults([]);
    setPage("quiz");
  }

  function handleViewResult(matches: CareerMatch[]) {
    setResults(matches);
    setPage("results");
  }

  const showNavbar = page !== "quiz";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {showNavbar && (
        <Navbar
          currentPage={page}
          onHome={goHome}
          onQuiz={goQuiz}
          onExplore={goExplore}
          onProfile={goProfile}
        />
      )}

      {page === "home" && <HomePage onStartQuiz={goQuiz} onExplore={goExplore} />}
      {page === "quiz" && <QuizPage onComplete={handleQuizComplete} onBack={goHome} />}
      {page === "results" && <ResultsPage matches={results} onRetake={handleRetake} onExplore={goExplore} />}
      {page === "explore" && <ExplorePage onStartQuiz={goQuiz} />}
      {page === "profile" && (
        <ProfilePage
          onStartQuiz={goQuiz}
          onExplore={goExplore}
          onViewResult={handleViewResult}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <AppContent />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
