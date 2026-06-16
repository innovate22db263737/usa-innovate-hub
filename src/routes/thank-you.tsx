import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { z } from "zod";

const searchSchema = z.object({
  email: z.string().email().optional().catch(undefined),
});

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Thank you — Innovate22" },
      { name: "description", content: "Thanks for reaching out to Innovate22. We'll be in touch within 48 hours." },
      { name: "robots", content: "noindex" },
    ],
  }),
  validateSearch: (search) => searchSchema.parse(search),
  component: ThankYou,
});

function ThankYou() {
  const { email } = Route.useSearch();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute inset-0 bg-gradient-glow" />

      <main className="relative container mx-auto max-w-2xl px-6 min-h-screen flex flex-col items-center justify-center text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow mb-8">
          <CheckCircle2 className="h-8 w-8 text-primary-foreground" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gradient leading-tight">
          Thanks — we're on it.
        </h1>
        <p className="mt-5 text-lg text-muted-foreground max-w-xl">
          {email ? (
            <>We've received your details at <span className="text-foreground font-medium">{email}</span>. A senior partner will reply within 48 hours.</>
          ) : (
            <>We've received your details. A senior partner will reply within 48 hours.</>
          )}
        </p>
        <Link
          to="/"
          className="mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-card/50 backdrop-blur text-foreground font-medium hover:bg-card transition"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
      </main>
    </div>
  );
}
