import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  User, Phone, Calendar, Users, MapPin,
  ChevronRight, Compass, LogIn, Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const registerSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z.string().min(7, "Enter a valid mobile number").max(15).regex(/^\+?[0-9\s\-()]+$/, "Enter a valid phone number"),
  age: z.coerce.number({ invalid_type_error: "Enter your age" }).min(10, "Must be at least 10").max(100, "Must be under 100"),
  gender: z.enum(["Male", "Female", "Non-binary", "Prefer not to say"], { required_error: "Please select your gender" }),
  city: z.string().min(1, "City is required"),
});

type RegisterForm = z.infer<typeof registerSchema>;

const GENDER_OPTIONS = ["Male", "Female", "Non-binary", "Prefer not to say"] as const;

interface RegisterPageProps {
  onComplete: (data: RegisterForm) => void;
  onBack: () => void;
}

const GUEST_PROFILE_KEY = "pathfinder_guest_profile";

export function getGuestProfile(): RegisterForm | null {
  try {
    const stored = localStorage.getItem(GUEST_PROFILE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch { return null; }
}

export function setGuestProfile(data: RegisterForm) {
  localStorage.setItem(GUEST_PROFILE_KEY, JSON.stringify(data));
}

export default function RegisterPage({ onComplete, onBack }: RegisterPageProps) {
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();

  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: user ? [user.firstName, user.lastName].filter(Boolean).join(" ") : "",
      mobile: "",
      age: undefined,
      gender: undefined,
      city: "",
    },
  });

  const profileMutation = useMutation({
    mutationFn: async (data: RegisterForm) => {
      if (user) {
        return apiRequest("PUT", "/api/profile", data);
      }
      setGuestProfile(data);
      return data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      onComplete(variables);
    },
    onError: () => {
      toast({ title: "Error", description: "Could not save your profile. Please try again.", variant: "destructive" });
    },
  });

  function onSubmit(data: RegisterForm) {
    profileMutation.mutate(data);
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 font-bold text-foreground hover:text-primary transition-colors" data-testid="button-register-logo">
            <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center">
              <Compass className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            PathFinder
          </button>
          {!authLoading && !user && (
            <Button variant="ghost" size="sm" onClick={() => window.location.href = "/api/login"} className="gap-1.5" data-testid="button-sign-in-register">
              <LogIn className="w-3.5 h-3.5" />
              Sign In
            </Button>
          )}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-7 h-7 text-primary" />
          </div>
          <Badge className="mb-3 px-3 py-1" data-testid="badge-step">Step 1 of 2</Badge>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2" data-testid="text-register-title">Let's Get to Know You</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Fill in your details so we can personalise your career recommendations.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6 pb-6">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

              {/* Full Name */}
              <div className="space-y-1.5">
                <Label htmlFor="fullName" className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-muted-foreground" />
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="fullName"
                  placeholder="e.g. Priya Sharma"
                  {...form.register("fullName")}
                  className={cn(form.formState.errors.fullName && "border-destructive")}
                  data-testid="input-fullname"
                />
                {form.formState.errors.fullName && (
                  <p className="text-xs text-destructive" data-testid="error-fullname">
                    {form.formState.errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Mobile */}
              <div className="space-y-1.5">
                <Label htmlFor="mobile" className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                  Mobile Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="e.g. +91 98765 43210"
                  {...form.register("mobile")}
                  className={cn(form.formState.errors.mobile && "border-destructive")}
                  data-testid="input-mobile"
                />
                {form.formState.errors.mobile && (
                  <p className="text-xs text-destructive" data-testid="error-mobile">
                    {form.formState.errors.mobile.message}
                  </p>
                )}
              </div>

              {/* Age + Gender row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="age" className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                    Age <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    min={10}
                    max={100}
                    placeholder="e.g. 22"
                    {...form.register("age")}
                    className={cn(form.formState.errors.age && "border-destructive")}
                    data-testid="input-age"
                  />
                  {form.formState.errors.age && (
                    <p className="text-xs text-destructive" data-testid="error-age">
                      {form.formState.errors.age.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-muted-foreground" />
                    Gender <span className="text-destructive">*</span>
                  </Label>
                  <select
                    {...form.register("gender")}
                    className={cn(
                      "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                      form.formState.errors.gender && "border-destructive",
                      !form.watch("gender") && "text-muted-foreground"
                    )}
                    data-testid="select-gender"
                  >
                    <option value="" disabled>Select…</option>
                    {GENDER_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                  {form.formState.errors.gender && (
                    <p className="text-xs text-destructive" data-testid="error-gender">
                      {form.formState.errors.gender.message}
                    </p>
                  )}
                </div>
              </div>

              {/* City */}
              <div className="space-y-1.5">
                <Label htmlFor="city" className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                  City / Location <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="city"
                  placeholder="e.g. Mumbai, India"
                  {...form.register("city")}
                  className={cn(form.formState.errors.city && "border-destructive")}
                  data-testid="input-city"
                />
                {form.formState.errors.city && (
                  <p className="text-xs text-destructive" data-testid="error-city">
                    {form.formState.errors.city.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full gap-2 mt-2"
                disabled={profileMutation.isPending}
                data-testid="button-continue-to-quiz"
              >
                {profileMutation.isPending ? "Saving…" : "Continue to Quiz"}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </form>
          </CardContent>
        </Card>

        {!user && (
          <p className="text-center text-xs text-muted-foreground mt-4">
            Want to save your results?{" "}
            <button
              onClick={() => window.location.href = "/api/login"}
              className="text-primary hover:underline font-medium"
              data-testid="button-sign-in-hint"
            >
              Sign in with Google or GitHub
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
