import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  User, LogOut, Trophy, Clock, Compass, Target,
  Calendar, ChevronRight, Phone, MapPin, Users, Edit
} from "lucide-react";
import type { QuizResult } from "@shared/schema";
import type { CareerMatch } from "@/lib/careers";
import { getGuestProfile } from "./register";

interface ProfilePageProps {
  onStartQuiz: () => void;
  onExplore: () => void;
  onViewResult: (matches: CareerMatch[]) => void;
}

function formatDate(dateStr: string | Date) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "numeric", minute: "2-digit",
  });
}

export default function ProfilePage({ onStartQuiz, onExplore, onViewResult }: ProfilePageProps) {
  const { user, isLoading: authLoading, logout } = useAuth();
  const guestProfile = getGuestProfile();

  const { data: results, isLoading: resultsLoading } = useQuery<QuizResult[]>({
    queryKey: ["/api/quiz-results"],
    enabled: !!user,
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <Skeleton className="h-40 w-full rounded-md" />
          <Skeleton className="h-32 w-full rounded-md" />
          <Skeleton className="h-48 w-full rounded-md" />
        </div>
      </div>
    );
  }

  if (!user && !guestProfile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-sm w-full text-center">
          <CardContent className="pt-8 pb-8 space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <User className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold">No profile found</h2>
            <p className="text-muted-foreground text-sm">
              Take the career quiz first or sign in to view your profile.
            </p>
            <Button className="w-full gap-2" onClick={onStartQuiz} data-testid="button-profile-start">
              <Target className="w-4 h-4" />
              Start Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Merge auth user data and local profile data
  const profileName = user?.fullName ?? guestProfile?.fullName ?? [user?.firstName, user?.lastName].filter(Boolean).join(" ") ?? "PathFinder User";
  const profileMobile = user?.mobile ?? guestProfile?.mobile;
  const profileAge = user?.age ?? guestProfile?.age;
  const profileGender = user?.gender ?? guestProfile?.gender;
  const profileCity = user?.city ?? guestProfile?.city;
  const initials = profileName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) || "PF";

  return (
    <div className="min-h-screen bg-background">
      {/* Header banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 px-4 pt-10 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <Avatar className="w-20 h-20 border-4 border-background shadow-md">
              <AvatarImage src={user?.profileImageUrl ?? undefined} alt={profileName} />
              <AvatarFallback className="text-xl font-bold bg-primary text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold mb-1" data-testid="text-profile-name">{profileName}</h1>
              {user?.email && (
                <p className="text-muted-foreground text-sm mb-2" data-testid="text-profile-email">{user.email}</p>
              )}
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                {profileCity && (
                  <Badge variant="secondary" className="gap-1">
                    <MapPin className="w-3 h-3" />
                    {profileCity}
                  </Badge>
                )}
                {profileAge && (
                  <Badge variant="secondary" className="gap-1">
                    <Calendar className="w-3 h-3" />
                    {profileAge} years old
                  </Badge>
                )}
                {results?.length !== undefined && (
                  <Badge variant="outline" className="gap-1">
                    <Trophy className="w-3 h-3" />
                    {results.length} Quiz{results.length !== 1 ? "zes" : ""} Taken
                  </Badge>
                )}
              </div>
            </div>

            {user && (
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
            )}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Profile Details Card */}
        <Card data-testid="card-profile-details">
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-base flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                Profile Details
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onStartQuiz}
                className="gap-1.5 text-xs text-muted-foreground"
                data-testid="button-edit-profile"
              >
                <Edit className="w-3 h-3" />
                Edit
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoRow icon={User} label="Full Name" value={profileName} testId="profile-name" />
              {profileMobile && <InfoRow icon={Phone} label="Mobile" value={profileMobile} testId="profile-mobile" />}
              {profileAge && <InfoRow icon={Calendar} label="Age" value={`${profileAge} years`} testId="profile-age" />}
              {profileGender && <InfoRow icon={Users} label="Gender" value={profileGender} testId="profile-gender" />}
              {profileCity && <InfoRow icon={MapPin} label="City" value={profileCity} testId="profile-city" />}
              {user?.email && <InfoRow icon={User} label="Email" value={user.email} testId="profile-email" />}
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: Trophy, label: "Quizzes Taken", value: results?.length ?? (guestProfile ? "—" : 0), color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-950/20" },
            { icon: Target, label: "Top Career", value: results?.[0]?.topCareer ?? "—", color: "text-primary", bg: "bg-primary/10" },
            { icon: Clock, label: "Last Taken", value: results?.[0]?.takenAt ? new Date(results[0].takenAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "—", color: "text-accent", bg: "bg-accent/10" },
          ].map((stat, i) => (
            <Card key={i} data-testid={`card-stat-${i}`}>
              <CardContent className="pt-4 pb-4">
                <div className={`w-9 h-9 ${stat.bg} rounded-md flex items-center justify-center mb-2`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="font-bold text-base truncate mt-0.5" data-testid={`text-stat-${i}`}>{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quiz History */}
        {user && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Clock className="w-5 h-5 text-muted-foreground" />
                Quiz History
              </h2>
              <Button size="sm" onClick={onStartQuiz} className="gap-1.5" data-testid="button-new-quiz">
                <Target className="w-3.5 h-3.5" />
                New Quiz
              </Button>
            </div>

            {resultsLoading ? (
              <div className="space-y-3">
                {[1, 2].map(i => <Skeleton key={i} className="h-20 rounded-md" />)}
              </div>
            ) : !results?.length ? (
              <Card>
                <CardContent className="py-10 text-center">
                  <Trophy className="w-10 h-10 mx-auto mb-3 text-muted-foreground/40" />
                  <h3 className="font-semibold mb-1">No quizzes taken yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">Take the assessment to discover your ideal career path.</p>
                  <Button onClick={onStartQuiz} className="gap-2" data-testid="button-start-quiz">
                    <Target className="w-4 h-4" /> Take Assessment
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {results.map((result, idx) => {
                  const matches = result.matches as CareerMatch[] | null;
                  return (
                    <Card key={result.id} className="hover-elevate" data-testid={`card-history-${idx}`}>
                      <CardContent className="py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
                            <Trophy className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                              <span className="font-semibold text-sm" data-testid={`text-career-${idx}`}>{result.topCareer ?? "—"}</span>
                              <Badge variant="secondary" className="text-xs">Top Match</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {result.takenAt ? formatDate(result.takenAt) : "—"}
                            </p>
                          </div>
                          {matches && matches.length > 0 && (
                            <Button variant="ghost" size="icon" onClick={() => onViewResult(matches)} data-testid={`button-view-${idx}`}>
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Guest CTA */}
        {!user && guestProfile && (
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="py-5 text-center">
              <h3 className="font-semibold mb-1">Save your quiz history</h3>
              <p className="text-sm text-muted-foreground mb-3">Sign in to save results and access them anytime.</p>
              <Button onClick={() => window.location.href = "/api/login"} className="gap-2" data-testid="button-guest-signin">
                <User className="w-4 h-4" /> Sign In
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={onExplore} className="flex-1 gap-2" data-testid="button-explore">
            <Compass className="w-4 h-4" /> Explore Careers
          </Button>
          <Button onClick={onStartQuiz} className="flex-1 gap-2" data-testid="button-take-quiz">
            <Target className="w-4 h-4" /> Take the Quiz
          </Button>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value, testId }: { icon: any; label: string; value: string | number; testId: string }) {
  return (
    <div className="flex items-start gap-2.5 py-2">
      <div className="w-7 h-7 bg-muted rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium" data-testid={`text-${testId}`}>{value}</p>
      </div>
    </div>
  );
}
