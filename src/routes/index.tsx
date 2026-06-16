import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Radio, Cpu, Building2, Sparkles, Globe2, LineChart, Mail } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import heroImage from "@/assets/hero-innovate22.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Innovate22 — Innovation Consulting for Telecom, IT & PropTech" },
      { name: "description", content: "USA-based consultancy guiding telecom, IT, and proptech leaders through innovation strategy, technology modernization, and growth." },
      { property: "og:title", content: "Innovate22 — Innovation Consulting" },
      { property: "og:description", content: "Strategy and execution for telecom, IT, and proptech innovation." },
      { property: "og:image", content: heroImage },
      { name: "twitter:image", content: heroImage },
    ],
  }),
  component: Index,
});

const services = [
  {
    icon: Radio,
    title: "Telecom Innovation",
    desc: "5G, fiber, and carrier transformation strategies that turn infrastructure investment into measurable revenue.",
  },
  {
    icon: Cpu,
    title: "IT Modernization",
    desc: "Cloud architecture, platform engineering, and AI integration roadmaps for enterprise IT organizations.",
  },
  {
    icon: Building2,
    title: "PropTech Advisory",
    desc: "Smart-building strategy, tenant experience platforms, and digital transformation for real estate portfolios.",
  },
  {
    icon: Sparkles,
    title: "Innovation Programs",
    desc: "Stand up internal innovation labs, accelerators, and venture programs that ship — not just present.",
  },
  {
    icon: Globe2,
    title: "Market Entry",
    desc: "Go-to-market strategy for technology vendors expanding into US telecom, IT, and real estate verticals.",
  },
  {
    icon: LineChart,
    title: "Growth Operations",
    desc: "Operating models, KPIs, and revenue engines built for technology companies scaling past $10M ARR.",
  },
];

const stats = [
  { value: "120+", label: "Engagements delivered" },
  { value: "18", label: "Industries served" },
  { value: "$2.4B", label: "Client value unlocked" },
  { value: "USA", label: "Headquartered & operated" },
];

const emailSchema = z.string().trim().email({ message: "Please enter a valid email" }).max(255);

function Index() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Invalid email");
      return;
    }
    setError(null);
    setSubmitting(true);
    navigate({ to: "/thank-you", search: { email: result.data } });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/50">
        <div className="container mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="h-2.5 w-2.5 rounded-full bg-gradient-primary shadow-glow" />
            Innovate<span className="text-primary-glow">22</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#services" className="hover:text-foreground transition-colors">Services</a>
            <a href="#approach" className="hover:text-foreground transition-colors">Approach</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          </nav>
          <a href="#contact" className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90 transition">
            Book a call <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute inset-0 bg-gradient-glow" />

        <div className="relative container mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/80 bg-card/50 backdrop-blur text-xs text-muted-foreground mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-glow animate-pulse" />
              USA-based innovation consultancy
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-gradient">
              Where telecom, IT, and real estate get their next move.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              Innovate22 partners with operators, enterprises, and property owners to design and execute
              the technology bets that actually move the business.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-primary text-primary-foreground font-medium shadow-elegant hover:scale-[1.02] transition-transform">
                Start a conversation <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#services" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-card/50 backdrop-blur text-foreground font-medium hover:bg-card transition">
                Explore services
              </a>
            </div>
          </div>

          <div className="mt-16 relative rounded-2xl overflow-hidden border border-border shadow-elegant">
            <img
              src={heroImage}
              alt="Networked infrastructure visualizing telecom, IT, and proptech innovation"
              width={1920}
              height={1080}
              className="w-full h-[280px] sm:h-[400px] lg:h-[480px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card/30">
        <div className="container mx-auto max-w-7xl px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl md:text-4xl font-display font-bold text-gradient">{s.value}</div>
              <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="max-w-2xl mb-14">
            <div className="text-sm uppercase tracking-widest text-primary-glow mb-3">What we do</div>
            <h2 className="text-4xl md:text-5xl font-bold">Strategy and execution, side by side.</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Six practice areas built for the operators making the hard calls.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group relative p-7 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-500 hover:shadow-elegant hover:-translate-y-1"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary shadow-glow mb-5">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section id="approach" className="py-24 border-t border-border bg-card/30">
        <div className="container mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-sm uppercase tracking-widest text-primary-glow mb-3">Approach</div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              We don't deliver decks. We deliver decisions.
            </h2>
            <p className="mt-5 text-muted-foreground text-lg">
              Our small senior team embeds with yours for 8 to 16 weeks, builds the case,
              and stays through the first milestones. No pyramid staffing. No theater.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { n: "01", t: "Diagnose", d: "Two-week deep dive into market, P&L, and capability gaps." },
              { n: "02", t: "Design", d: "Concrete strategy with target architecture, business case, and roadmap." },
              { n: "03", t: "Deploy", d: "We sit with your team through pilot, launch, and first results." },
            ].map((step) => (
              <div key={step.n} className="flex gap-5 p-6 rounded-xl border border-border bg-background/60">
                <div className="font-display font-bold text-2xl text-primary-glow">{step.n}</div>
                <div>
                  <div className="font-semibold text-lg">{step.t}</div>
                  <div className="text-sm text-muted-foreground mt-1">{step.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Lead capture */}
      <section id="contact" className="py-24">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="relative overflow-hidden rounded-3xl border border-border p-12 md:p-16 text-center bg-card">
            <div className="absolute inset-0 bg-gradient-glow opacity-60" />
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold text-gradient">Let's build what's next.</h2>
              <p className="mt-5 text-muted-foreground text-lg max-w-xl mx-auto">
                Drop your email. We'll come back within 48 hours with whether — and how — we can help.
              </p>
              <form
                onSubmit={handleSubmit}
                className="mt-8 mx-auto max-w-xl flex flex-col sm:flex-row gap-3"
                noValidate
              >
                <label htmlFor="lead-email" className="sr-only">Work email</label>
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    id="lead-email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={255}
                    className="w-full pl-11 pr-4 py-3.5 rounded-full bg-background/80 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-primary text-primary-foreground font-medium shadow-elegant hover:scale-[1.02] transition-transform disabled:opacity-60 disabled:hover:scale-100"
                >
                  Get in touch <ArrowRight className="h-4 w-4" />
                </button>
              </form>
              {error && (
                <p className="mt-3 text-sm text-destructive" role="alert">{error}</p>
              )}
              <p className="mt-4 text-xs text-muted-foreground">
                Or email us directly at <a href="mailto:hello@innovate22.com" className="underline hover:text-foreground">hello@innovate22.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="container mx-auto max-w-7xl px-6 flex flex-col sm:flex-row gap-4 items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2 font-display font-semibold text-foreground">
            <span className="h-2 w-2 rounded-full bg-gradient-primary" />
            Innovate22
          </div>
          <div>© {new Date().getFullYear()} Innovate22, LLC. United States.</div>
        </div>
      </footer>
    </div>
  );
}
