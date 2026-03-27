import { useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme";
import Navbar from "@/components/navbar";
import HomePage from "@/pages/home";
import RegisterPage, { getGuestProfile } from "@/pages/register";
import QuizPage from "@/pages/quiz";
import ResultsPage from "@/pages/results";
import ExplorePage from "@/pages/explore";
import ProfilePage from "@/pages/profile";
import { CareerMatch } from "@/lib/careers";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest } from "@/lib/queryClient";

type Page = "home" | "register" | "quiz" | "results" | "explore" | "profile";

function AppContent() {
  const [page, setPage] = useState<Page>("home");
  const [results, setResults] = useState<CareerMatch[]>([]);
  const { user } = useAuth();

  function goHome() { setPage("home"); }
  function goExplore() { setPage("explore"); }
  function goProfile() { setPage("profile"); }

  function goQuiz() {
    // Check if profile is filled in
    const profileDone = user?.profileCompleted || !!getGuestProfile();
    if (!profileDone) {
      setPage("register");
    } else {
      setPage("quiz");
    }
  }

  function handleRegisterComplete() {
    setPage("quiz");
  }

  async function handleQuizComplete(matches: CareerMatch[]) {
    setResults(matches);
    setPage("results");

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

  const showNavbar = page !== "quiz" && page !== "register";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {showNavbar && (
        <Navbar
          currentPage={page as any}
          onHome={goHome}
          onQuiz={goQuiz}
          onExplore={goExplore}
          onProfile={goProfile}
        />
      )}

      {page === "home" && <HomePage onStartQuiz={goQuiz} onExplore={goExplore} />}
      {page === "register" && (
        <RegisterPage onComplete={handleRegisterComplete} onBack={goHome} />
      )}
      {page === "quiz" && <QuizPage onComplete={handleQuizComplete} onBack={() => setPage("register")} />}
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
