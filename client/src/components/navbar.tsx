import { Button } from "@/components/ui/button";
import { Compass, Target, Home } from "lucide-react";
import { cn } from "@/lib/utils";

type Page = "home" | "quiz" | "results" | "explore";

interface NavbarProps {
  currentPage: Page;
  onHome: () => void;
  onQuiz: () => void;
  onExplore: () => void;
}

export default function Navbar({ currentPage, onHome, onQuiz, onExplore }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <button
          onClick={onHome}
          className="flex items-center gap-2 font-bold text-lg text-foreground hover:text-primary transition-colors"
          data-testid="button-logo"
        >
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <Compass className="w-4.5 h-4.5 text-primary-foreground" />
          </div>
          PathFinder
        </button>

        <nav className="flex items-center gap-1">
          <Button
            variant={currentPage === "home" ? "secondary" : "ghost"}
            size="sm"
            onClick={onHome}
            className={cn("gap-1.5", currentPage === "home" && "font-semibold")}
            data-testid="nav-home"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Home</span>
          </Button>
          <Button
            variant={currentPage === "explore" ? "secondary" : "ghost"}
            size="sm"
            onClick={onExplore}
            className={cn("gap-1.5", currentPage === "explore" && "font-semibold")}
            data-testid="nav-explore"
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Explore</span>
          </Button>
          <Button
            size="sm"
            onClick={onQuiz}
            className="gap-1.5 ml-1"
            data-testid="nav-quiz"
          >
            <Target className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Take Quiz</span>
          </Button>
        </nav>
      </div>
    </header>
  );
}
