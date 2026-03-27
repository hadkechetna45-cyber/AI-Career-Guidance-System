import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CAREERS, CATEGORIES } from "@/lib/careers";
import { Search, DollarSign, GraduationCap, Target, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExplorePageProps {
  onStartQuiz: () => void;
}

export default function ExplorePage({ onStartQuiz }: ExplorePageProps) {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState<string | null>(null);

  const filtered = CAREERS.filter(c => {
    const matchesCat = !selectedCat || c.category === selectedCat;
    const s = search.toLowerCase();
    const matchesSearch =
      !search ||
      c.title.toLowerCase().includes(s) ||
      c.category.toLowerCase().includes(s) ||
      c.skills.some(sk => sk.toLowerCase().includes(s)) ||
      c.description.toLowerCase().includes(s);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted/40 border-b border-border px-4 pt-10 pb-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2" data-testid="text-explore-title">Explore All Careers</h1>
          <p className="text-muted-foreground mb-6">
            Browse {CAREERS.length} career paths and discover what each one requires.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search careers, skills, categories…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 pr-9"
                data-testid="input-search"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  data-testid="button-clear-search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setSelectedCat(null)}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium transition-colors border",
                !selectedCat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border hover:border-primary/50"
              )}
              data-testid="filter-all"
            >
              All
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCat(selectedCat === cat ? null : cat)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors border",
                  selectedCat === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-foreground border-border hover:border-primary/50"
                )}
                data-testid={`filter-${cat}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground" data-testid="text-result-count">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> career{filtered.length !== 1 ? "s" : ""}
            {selectedCat && <span> in <span className="font-semibold text-foreground">{selectedCat}</span></span>}
            {search && <span> matching <span className="font-semibold text-foreground">"{search}"</span></span>}
          </p>
          <Button variant="outline" size="sm" onClick={onStartQuiz} className="gap-1.5" data-testid="button-take-quiz-explore">
            <Target className="w-3.5 h-3.5" />
            Take Quiz
          </Button>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">🔍</p>
            <h3 className="text-lg font-semibold mb-2">No careers found</h3>
            <p className="text-muted-foreground mb-4">Try a different keyword or clear the filters.</p>
            <Button variant="outline" onClick={() => { setSearch(""); setSelectedCat(null); }} data-testid="button-clear-filters">
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(career => (
              <Card key={career.id} className="hover-elevate flex flex-col" data-testid={`card-career-${career.id}`}>
                <CardContent className="pt-5 pb-5 flex flex-col flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center text-xl flex-shrink-0">
                      {career.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-base leading-tight" data-testid={`text-career-name-${career.id}`}>{career.title}</h3>
                      <Badge variant="secondary" className="text-xs mt-1">{career.category}</Badge>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {career.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <DollarSign className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate font-medium text-foreground">{career.salary}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <GraduationCap className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate font-medium text-foreground">{career.education}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {career.skills.slice(0, 3).map((skill, si) => (
                      <Badge key={si} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {career.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs text-muted-foreground">
                        +{career.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Card className="inline-block max-w-md w-full">
            <CardContent className="pt-6 pb-6">
              <p className="text-muted-foreground text-sm mb-4">Not sure which career fits you? Let our quiz match you.</p>
              <Button onClick={onStartQuiz} className="w-full gap-2" data-testid="button-take-quiz-cta">
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
