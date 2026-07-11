import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Cpu,
  ShieldCheck,
  Users,
  Rocket,
  Clock,
  Sparkles,
  Globe
} from "lucide-react";

const About = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden border-b pb-20">
      {/* Background Grid & Ambient Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Glow Orbs */}
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-indigo-600 rounded-full blur-[130px] opacity-15 dark:opacity-25 animate-pulse-slow" />
        <div className="absolute top-1/2 -right-40 w-[450px] h-[450px] bg-purple-600 rounded-full blur-[150px] opacity-10 dark:opacity-20 animate-pulse-slow delay-750" />
        <div className="absolute -bottom-40 left-10 w-80 h-80 bg-blue-600 rounded-full blur-[100px] opacity-10 dark:opacity-15 animate-pulse-slow delay-1500" />

        {/* SVG Grid lines overlay */}
        <svg className="absolute inset-0 w-full h-full stroke-muted/30 dark:stroke-muted/15 [mask-image:radial-gradient(100%_100%_at_top,white,transparent)]" aria-hidden="true">
          <defs>
            <pattern id="about-grid" width="40" height="40" patternUnits="userSpaceOnUse" x="-1" y="-1">
              <path d="M.5 40V.5H40" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-5 relative z-10 pt-16 lg:pt-24 space-y-24">
        {/* Header / Mission Section */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-background/60 backdrop-blur-md border-indigo-500/10 shadow-sm">
            <Sparkles size={14} className="text-indigo-600 dark:text-indigo-400 animate-pulse" />
            <span className="text-sm font-semibold tracking-wide text-indigo-600 dark:text-indigo-400">
              About CareerLaunch
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] text-foreground">
            Our Mission At{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              CareerLaunch
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium max-w-3xl mx-auto">
            At CareerLaunch, we are dedicated to revolutionizing the global job search experience. We bridge the gap between brilliant builders and progressive teams, using advanced AI career guidance and resume grading tools to foster mutual growth.
          </p>
        </div>

        {/* Core Values Section */}
        <div className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-4xl font-extrabold text-foreground">Our Core Principles</h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto font-medium">
              We hold ourselves to high technical and ethical standards to offer a transparent platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Value 1 */}
            <div className="p-6 rounded-2xl bg-secondary/20 hover:bg-secondary/40 border border-muted/80 shadow-sm transition-all duration-300 hover:scale-[1.02] group">
              <div className="h-12 w-12 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Cpu size={24} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Innovation First</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                We harness advanced artificial intelligence to offer tailored career pathway timelines and real-time resume optimization.
              </p>
            </div>

            {/* Value 2 */}
            <div className="p-6 rounded-2xl bg-secondary/20 hover:bg-secondary/40 border border-muted/80 shadow-sm transition-all duration-300 hover:scale-[1.02] group">
              <div className="h-12 w-12 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Trust & Security</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                Every employer is thoroughly verified. We maintain rigorous standards to ensure all candidate information is fully encrypted.
              </p>
            </div>

            {/* Value 3 */}
            <div className="p-6 rounded-2xl bg-secondary/20 hover:bg-secondary/40 border border-muted/80 shadow-sm transition-all duration-300 hover:scale-[1.02] group">
              <div className="h-12 w-12 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Users size={24} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Direct Connection</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                We bypass third-party recruitment agencies, putting builders directly in touch with tech leads and team founders.
              </p>
            </div>

            {/* Value 4 */}
            <div className="p-6 rounded-2xl bg-secondary/20 hover:bg-secondary/40 border border-muted/80 shadow-sm transition-all duration-300 hover:scale-[1.02] group">
              <div className="h-12 w-12 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Rocket size={24} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Empowered Growth</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                We provide candidates with automated tools to learn targeted skills, prepare for interviews, and level up their career trajectory.
              </p>
            </div>
          </div>
        </div>

        {/* Impact Numbers Section */}
        <div className="py-10 border-y border-muted/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-2">
              <span className="text-4xl md:text-5xl font-black tracking-tight text-foreground block">
                10K+
              </span>
              <span className="text-sm font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Active Job Openings
              </span>
              <p className="text-xs text-muted-foreground font-medium max-w-xs mx-auto leading-relaxed">
                Across various domains including Software engineering, Product Management, Design, and AI.
              </p>
            </div>

            <div className="text-center space-y-2 border-y md:border-y-0 md:border-x border-muted/50 py-6 md:py-0">
              <span className="text-4xl md:text-5xl font-black tracking-tight text-foreground block">
                5K+
              </span>
              <span className="text-sm font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Verified Partners
              </span>
              <p className="text-xs text-muted-foreground font-medium max-w-xs mx-auto leading-relaxed">
                From high-growth early-stage startups to established enterprises hiring top talent.
              </p>
            </div>

            <div className="text-center space-y-2">
              <span className="text-4xl md:text-5xl font-black tracking-tight text-foreground block">
                50K+
              </span>
              <span className="text-sm font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Talented Seekers
              </span>
              <p className="text-xs text-muted-foreground font-medium max-w-xs mx-auto leading-relaxed">
                Empowered with automated interview guidance, profile analysis, and match grades.
              </p>
            </div>
          </div>
        </div>

        {/* Our Journey Timeline */}
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-4xl font-extrabold text-foreground">The CareerLaunch Story</h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto font-medium">
              A brief retrospective of how we got here and where we are heading.
            </p>
          </div>

          <div className="relative border-l-2 border-indigo-500/20 ml-4 pl-8 space-y-10">
            {/* Year 1 */}
            <div className="relative group">
              <span className="absolute -left-[41px] top-0.5 flex items-center justify-center w-6 h-6 rounded-xl bg-background border-2 border-indigo-600 shadow-sm">
                <Clock size={12} className="text-indigo-600" />
              </span>
              <div className="space-y-1.5">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  2024 • Genesis
                </span>
                <h4 className="font-extrabold text-lg text-foreground">Solving the Recruitment Loop</h4>
                <p className="text-sm leading-relaxed text-muted-foreground font-medium max-w-2xl">
                  We set out to fix the broken application feedback loop. CareerLaunch started as a specialized, direct-connection database where tech candidates could apply and receive rapid communication.
                </p>
              </div>
            </div>

            {/* Year 2 */}
            <div className="relative group">
              <span className="absolute -left-[41px] top-0.5 flex items-center justify-center w-6 h-6 rounded-xl bg-background border-2 border-indigo-600 shadow-sm">
                <Sparkles size={12} className="text-indigo-600" />
              </span>
              <div className="space-y-1.5">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  2025 • Transformation
                </span>
                <h4 className="font-extrabold text-lg text-foreground">AI Career Pathways & Grading</h4>
                <p className="text-sm leading-relaxed text-muted-foreground font-medium max-w-2xl">
                  We integrated custom LLM evaluation scripts. Candidates gained access to automated, personalized roadmap builders based on their active skills and an ATS grade scanner that parses resume PDFs.
                </p>
              </div>
            </div>

            {/* Year 3 */}
            <div className="relative group">
              <span className="absolute -left-[41px] top-0.5 flex items-center justify-center w-6 h-6 rounded-xl bg-background border-2 border-indigo-600 shadow-sm">
                <Globe size={12} className="text-indigo-600" />
              </span>
              <div className="space-y-1.5">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  2026 • Future Vision
                </span>
                <h4 className="font-extrabold text-lg text-foreground">Boundaryless Opportunities</h4>
                <p className="text-sm leading-relaxed text-muted-foreground font-medium max-w-2xl">
                  We are expanding our tools to connect international developers with remote roles, helping startups hire verified software talent with no geographic friction.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Card Section */}
        <div className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-12 bg-gradient-to-tr from-indigo-900/10 via-purple-900/10 to-pink-900/10 dark:from-indigo-950/20 dark:via-purple-950/20 dark:to-pink-950/20 border border-indigo-500/10 text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-60 h-60 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-full blur-[80px] opacity-10 pointer-events-none" />
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            Ready to find your dream job?
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground font-medium max-w-xl mx-auto">
            Join thousands of successful developers, designers, and managers on CareerLaunch.
          </p>

          <div className="pt-2">
            <Link href="/jobs">
              <Button size="lg" className="h-12 px-8 text-base bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/25 transition-all duration-300 gap-2">
                Get Started
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;