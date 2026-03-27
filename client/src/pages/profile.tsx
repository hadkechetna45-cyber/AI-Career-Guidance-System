import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User, LogOut, Trophy, Clock, Compass, Target,
  Calendar, ChevronRight
} from "lucide-react";
import type { QuizResult } from "@shared/schema";
import type { CareerMatch } from "@/lib/careers";

interface ProfilePageProps {
  onStartQuiz: () => void;
  onExplore: () => void;
  onViewResult: (matches: CareerMatch[]) => void;
}

function formatDate(dateStr: string | Date) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "numeric", minute: "2-digit"
  });
}

export default function ProfilePage({ onStartQuiz, onExplore, onViewResult }: ProfilePageProps) {
  const { user, isLoading: authLoading, logout } = useAuth();

  const { data: results, isLoading: resultsLoading } = useQuery<QuizResult[]>({
    queryKey: ["/api/quiz-results"],
    enabled: !!user,
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <Skeleton className="h-32 w-full rounded-md" />
          <Skeleton className="h-48 w-full rounded-md" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-sm w-full text-center">
          <CardContent className="pt-8 pb-8 space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <User className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold">Sign in to view your profile</h2>
            <p className="text-muted-foreground text-sm">
              Create an account to save your quiz results and track your career journey.
            </p>
            <Button
              className="w-full gap-2"
              onClick={() => window.location.href = "/api/login"}
              data-testid="button-profile-login"
            >
              <User className="w-4 h-4" />
              Sign In / Sign Up
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const displayName = [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email || "PathFinder User";
  const initials = [user.firstName?.[0], user.lastName?.[0]].filter(Boolean).join("").toUpperCase() || "PF";

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary/10 via-background to-accent/10 px-4 pt-10 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <Avatar className="w-20 h-20 border-4 border-background shadow-md">
              <AvatarImage src={user.profileImageUrl ?? undefined} alt={displayName} />
              <AvatarFallback className="text-xl font-bold bg-primary text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold mb-1" data-testid="text-profile-name">{displayName}</h1>
              {user.email && (
                <p className="text-muted-foreground text-sm mb-3" data-testid="text-profile-email">{user.email}</p>
              )}
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                <Badge variant="secondary" className="gap-1">
                  <Trophy className="w-3 h-3" />
                  {results?.length ?? 0} Quiz{results?.length !== 1 ? "zes" : ""} Taken
                </Badge>
                {user.createdAt && (
                  <Badge variant="outline" className="gap-1">
                    <Calendar className="w-3 h-3" />
                    Joined {new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  </Badge>
                )}
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => logout()}
              className="gap-2 flex-shrink-0"
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Trophy, label: "Assessments Taken", value: results?.length ?? 0, color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-950/20" },
            { icon: Target, label: "Top Career Match", value: results?.[0] ? (results[0].topCareer ?? "—") : "—", color: "text-primary", bg: "bg-primary/10" },
            { icon: Clock, label: "Last Taken", value: results?.[0]?.takenAt ? new Date(results[0].takenAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Never", color: "text-accent", bg: "bg-accent/10" },
          ].map((stat, i) => (
            <Card key={i} data-testid={`card-profile-stat-${i}`}>
              <CardContent className="pt-5 pb-5">
                <div className={`w-10 h-10 ${stat.bg} rounded-md flex items-center justify-center mb-3`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                <p className="font-bold text-lg leading-tight truncate" data-testid={`text-stat-value-${i}`}>{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Clock className="w-5 h-5 text-muted-foreground" />
              Quiz History
            </h2>
            <Button size="sm" onClick={onStartQuiz} className="gap-1.5" data-testid="button-profile-new-quiz">
              <Target className="w-3.5 h-3.5" />
              New Quiz
            </Button>
          </div>

          {resultsLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-20 w-full rounded-md" />)}
            </div>
          ) : !results?.length ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Trophy className="w-10 h-10 mx-auto mb-3 text-muted-foreground/40" />
                <h3 className="font-semibold mb-2">No quizzes taken yet</h3>
                <p className="text-sm text-muted-foreground mb-4">Take the career assessment to discover your ideal path.</p>
                <Button onClick={onStartQuiz} className="gap-2" data-testid="button-profile-start-quiz">
                  <Target className="w-4 h-4" />
                  Take the Assessment
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {results.map((result, idx) => {
                const matches = result.matches as CareerMatch[] | null;
                const top3 = matches?.slice(0, 3) ?? [];
                return (
                  <Card key={result.id} className="hover-elevate" data-testid={`card-quiz-history-${idx}`}>
                    <CardContent className="py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
                          <Trophy className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="font-semibold text-sm" data-testid={`text-history-career-${idx}`}>
                              {result.topCareer ?? "Unknown"}
                            </span>
                            <Badge variant="secondary" className="text-xs">Top Match</Badge>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {top3.slice(1).map((m: any, mi: number) => (
                              <span key={mi} className="text-xs text-muted-foreground">
                                {typeof m.career === "object" ? m.career.title : m.career}
                                {mi < top3.length - 2 ? " •" : ""}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <div className="text-right hidden sm:block">
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {result.takenAt ? formatDate(result.takenAt) : "—"}
                            </p>
                          </div>
                          {matches && matches.length > 0 && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onViewResult(matches)}
                              data-testid={`button-view-result-${idx}`}
                            >
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button variant="outline" onClick={onExplore} className="flex-1 gap-2" data-testid="button-profile-explore">
            <Compass className="w-4 h-4" />
            Explore Careers
          </Button>
          <Button onClick={onStartQuiz} className="flex-1 gap-2" data-testid="button-profile-take-quiz">
            <Target className="w-4 h-4" />
            Retake the Quiz
          </Button>
        </div>
      </div>
    </div>
  );
}
