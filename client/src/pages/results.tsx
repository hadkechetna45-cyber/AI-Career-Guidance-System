import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CareerMatch } from "@/lib/careers";
import {
  Trophy, RotateCcw, Compass, ChevronDown, ChevronUp,
  CheckCircle2, DollarSign, GraduationCap, Lightbulb, MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultsPageProps {
  matches: CareerMatch[];
  onRetake: () => void;
  onExplore: () => void;
}

const MEDAL_COLORS = [
  { border: "border-yellow-400", bg: "bg-yellow-50 dark:bg-yellow-950/20", text: "text-yellow-600 dark:text-yellow-400", label: "Top Match", icon: "🥇" },
  { border: "border-gray-400", bg: "bg-gray-50 dark:bg-gray-900/30", text: "text-gray-500 dark:text-gray-400", label: "2nd Match", icon: "🥈" },
  { border: "border-orange-400", bg: "bg-orange-50 dark:bg-orange-950/20", text: "text-orange-600 dark:text-orange-400", label: "3rd Match", icon: "🥉" },
];

export default function ResultsPage({ matches, onRetake, onExplore }: ResultsPageProps) {
  const [expanded, setExpanded] = useState<number>(0);

  if (!matches.length) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-sm w-full text-center">
          <CardContent className="pt-8 pb-8">
            <p className="text-muted-foreground mb-4">No results found. Please complete the quiz first.</p>
            <Button onClick={onRetake} className="w-full" data-testid="button-no-results-retake">Take the Quiz</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 pt-12 pb-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-950/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-yellow-500" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" data-testid="text-results-title">Your Path is Clear!</h1>
          <p className="text-muted-foreground text-lg" data-testid="text-results-subtitle">
            Based on your answers, here are your top {matches.length} career matches.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
        {matches.map((match, idx) => {
          const medal = MEDAL_COLORS[idx] || MEDAL_COLORS[2];
          const isOpen = expanded === idx;

          return (
            <Card
              key={match.career.id}
              className={cn(
                "overflow-hidden border-2 transition-all duration-200",
                isOpen ? medal.border : "border-border"
              )}
              data-testid={`card-match-${idx}`}
            >
              <button
                className="w-full text-left"
                onClick={() => setExpanded(isOpen ? -1 : idx)}
                data-testid={`button-expand-match-${idx}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-4">
                    <div className={cn("w-14 h-14 rounded-md flex items-center justify-center flex-shrink-0 text-2xl", medal.bg)}>
                      {match.career.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <Badge variant="secondary" className={cn("text-xs font-semibold", medal.text)}>
                          {medal.icon} {medal.label}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {match.career.category}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold" data-testid={`text-career-title-${idx}`}>{match.career.title}</h3>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex-1 max-w-48">
                          <Progress value={match.percentage} className="h-2" />
                        </div>
                        <span className={cn("text-lg font-bold", medal.text)} data-testid={`text-match-pct-${idx}`}>
                          {match.percentage}%
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-muted-foreground">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </CardHeader>
              </button>

              {isOpen && (
                <CardContent className="border-t border-border pt-5">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {match.career.description}
                      </p>

                      <div className="grid grid-cols-2 gap-3 mb-5">
                        <div className="bg-muted/50 rounded-md p-3">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                            <DollarSign className="w-3.5 h-3.5" />
                            Avg. Salary
                          </div>
                          <p className="font-semibold text-sm" data-testid={`text-salary-${idx}`}>{match.career.salary}</p>
                        </div>
                        <div className="bg-muted/50 rounded-md p-3">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                            <GraduationCap className="w-3.5 h-3.5" />
                            Education
                          </div>
                          <p className="font-semibold text-sm" data-testid={`text-education-${idx}`}>{match.career.education}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1.5">
                          <Lightbulb className="w-3.5 h-3.5" />
                          Why this matches you
                        </p>
                        <ul className="space-y-1.5">
                          {match.matchReasons.map((reason, ri) => (
                            <li key={ri} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                          Key Skills
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {match.career.skills.map((skill, si) => (
                            <Badge key={si} variant="secondary" className="text-xs" data-testid={`badge-skill-${idx}-${si}`}>
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          Next Steps
                        </p>
                        <ol className="space-y-2">
                          {match.career.nextSteps.map((step, si) => (
                            <li key={si} className="flex items-start gap-2.5 text-sm">
                              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                                {si + 1}
                              </span>
                              <span className="text-muted-foreground leading-relaxed">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}

        <div className="pt-4 flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={onRetake}
            className="flex-1 gap-2"
            data-testid="button-retake"
          >
            <RotateCcw className="w-4 h-4" />
            Retake the Quiz
          </Button>
          <Button
            onClick={onExplore}
            className="flex-1 gap-2"
            data-testid="button-explore-all"
          >
            <Compass className="w-4 h-4" />
            Explore All Careers
          </Button>
        </div>
      </div>
    </div>
  );
}
