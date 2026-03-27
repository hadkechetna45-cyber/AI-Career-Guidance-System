import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Compass, Target, Home, User, LogOut, LogIn } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

type Page = "home" | "quiz" | "results" | "explore" | "profile";

interface NavbarProps {
  currentPage: Page;
  onHome: () => void;
  onQuiz: () => void;
  onExplore: () => void;
  onProfile: () => void;
}

export default function Navbar({ currentPage, onHome, onQuiz, onExplore, onProfile }: NavbarProps) {
  const { user, isLoading, logout } = useAuth();

  const displayName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.email || "My Profile";
  const initials = [user?.firstName?.[0], user?.lastName?.[0]].filter(Boolean).join("").toUpperCase() || "PF";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <button
          onClick={onHome}
          className="flex items-center gap-2 font-bold text-lg text-foreground hover:text-primary transition-colors"
          data-testid="button-logo"
        >
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center flex-shrink-0">
            <Compass className="w-4 h-4 text-primary-foreground" />
          </div>
          <span>PathFinder</span>
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

          <ThemeToggle />

          {!isLoading && (
            user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    data-testid="button-user-menu"
                  >
                    <Avatar className="w-8 h-8 border-2 border-border">
                      <AvatarImage src={user.profileImageUrl ?? undefined} alt={displayName} />
                      <AvatarFallback className="text-xs font-bold bg-primary text-primary-foreground">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium truncate">{displayName}</p>
                    {user.email && <p className="text-xs text-muted-foreground truncate">{user.email}</p>}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onProfile} data-testid="menu-profile">
                    <User className="w-4 h-4 mr-2" />
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => logout()}
                    className="text-destructive focus:text-destructive"
                    data-testid="menu-logout"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.href = "/api/login"}
                className="gap-1.5 ml-1"
                data-testid="button-login"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign In</span>
              </Button>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
