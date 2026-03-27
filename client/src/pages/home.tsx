import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CAREERS, CATEGORIES } from "@/lib/careers";
import { Compass, Brain, MapPin, ClipboardList, Star, ChevronRight, Sparkles, Target, Clock } from "lucide-react";

interface HomePageProps {
  onStartQuiz: () => void;
  onExplore: () => void;
}

export default function HomePage({ onStartQuiz, onExplore }: HomePageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 pt-16 pb-24 px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <Badge className="mb-6 px-4 py-1.5 text-sm font-medium" data-testid="badge-tagline">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            Find your calling
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6" data-testid="text-hero-title">
            Discover the{" "}
            <span className="text-primary">Career Path</span>
            <br />
            You Were{" "}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Meant For
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10" data-testid="text-hero-subtitle">
            Stop guessing about your future. Take our interactive assessment to match your unique strengths, interests, and personality to the perfect career.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              onClick={onStartQuiz}
              className="gap-2 px-8 text-base"
              data-testid="button-start-assessment"
            >
              <Target className="w-5 h-5" />
              Start Assessment
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onExplore}
              className="gap-2 px-8 text-base"
              data-testid="button-explore-careers"
            >
              <Compass className="w-5 h-5" />
              Explore Careers
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {[
            { value: `${CAREERS.length}+`, label: "Careers Covered", icon: Compass },
            { value: "6", label: "Quiz Questions", icon: ClipboardList },
            { value: "< 3 min", label: "To Complete", icon: Clock },
            { value: "3", label: "Top Matches", icon: Star },
          ].map((stat, i) => (
            <Card key={i} className="text-center" data-testid={`card-stat-${i}`}>
              <CardContent className="pt-6 pb-5">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Why use PathFinder?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Everything you need to make a confident, informed career decision.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: Target,
              title: "Personalised Results",
              desc: "Matched to your interests, strengths, and lifestyle — not just a generic list.",
              color: "text-primary",
              bg: "bg-primary/10"
            },
            {
              icon: Brain,
              title: "Smart Matching Engine",
              desc: "Our algorithm scores your answers across 5 dimensions to find the best career fit.",
              color: "text-accent",
              bg: "bg-accent/10"
            },
            {
              icon: MapPin,
              title: "Clear Next Steps",
              desc: "Each career recommendation comes with an actionable roadmap to get started today.",
              color: "text-green-600",
              bg: "bg-green-50 dark:bg-green-950/30"
            },
          ].map((feature, i) => (
            <Card key={i} className="hover-elevate" data-testid={`card-feature-${i}`}>
              <CardContent className="pt-6 pb-6">
                <div className={`w-12 h-12 rounded-md ${feature.bg} flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Career Categories</h2>
          <p className="text-muted-foreground">Browse paths across all major industries</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map(cat => (
            <Badge
              key={cat}
              variant="secondary"
              className="px-4 py-1.5 text-sm cursor-pointer"
              onClick={onExplore}
              data-testid={`badge-category-${cat}`}
            >
              {cat}
            </Badge>
          ))}
        </div>

        <div className="text-center">
          <Card className="inline-block max-w-lg w-full">
            <CardContent className="pt-8 pb-8 px-8">
              <Sparkles className="w-8 h-8 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Ready to discover your path?</h3>
              <p className="text-muted-foreground mb-6 text-sm">Takes less than 3 minutes. No sign-up required.</p>
              <Button onClick={onStartQuiz} className="w-full gap-2" data-testid="button-start-cta">
                <Target className="w-4 h-4" />
                Take the Free Assessment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
