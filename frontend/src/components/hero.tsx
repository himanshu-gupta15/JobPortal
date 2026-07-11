// import { ArrowRight, Briefcase, Link, Search, TrendingUp } from 'lucide-react'
// import React from 'react'
// import { Button } from './ui/button'

// function Hero() {
//   return (
//     <section className='relative overflow-hidden bg-secondary'>
//         <div className='absolute inset-0 opacity-5'>
//             <div className='absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl'>

//             </div>
//             <div className='absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl'>

//             </div>
//         </div>

//         <div className='container mx-auto px-5 py-16 md:py-24 relative'>
//             <div className='flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16'>
//                 <div className='flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-6'>
//                     <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-background/50 backdrop-blur-sm'>
//                     <TrendingUp size={16} className='text-blue-600' />
//                     <span className='text-sm font-medium'>
//                         No1 Job Plaftform in India
//                     </span>

//                     </div>
//                     <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight'>

//                         Find Your Dream Job <br /> With Us 
//                     </h1>
//                   {/* description */}

//                   <p className='text-lg md:text-xl leading-relaxed opacity-80 max-w-2xl'>
//                     Connect with top employers and find your dream job today that match you skills. Wheather you're a job seeker or recruiter, we've got you covered with powerful tools and seamless experience.
//                   </p>
//                   {/* stats */}

//                   <div className='flex flex-wrap justify-center md:justify-start gap-8 py-4'>
//                     <div className='text-center md:text-left'>
//                         <p className='text-3xl font-bold text-blue-600'>10K+</p>
//                         <p className='text-sm opacity-70'>Active jobs</p>

//                     </div>

//                      <div className='text-center md:text-left'>
//                         <p className='text-3xl font-bold text-blue-600'>5K+</p>
//                         <p className='text-sm opacity-70'>Companies</p>

//                     </div>

//                      <div className='text-center md:text-left'>
//                         <p className='text-3xl font-bold text-blue-600'>50K+</p>
//                         <p className='text-sm opacity-70'>Job Seekers</p>

//                     </div>

//                   </div>

//                   <div className='flex flex-col sm:flex-row gap-4 pt-2'>
//                     <Link href={'/jobs'}>
//                     <Button size={'lg'} className='text-base px-8 h-12 gap-2 group transition-all'>
//                        <Search size={18}/>
//                        Browse Jobs <ArrowRight size={18} className='group-hover:translate-x-1 transition-transform'/>
//                     </Button>
//                     </Link>
//                     <Link href={'/about'}>
//                     <Button variant={'outline'} size={'lg'} className='text-base px-8 gap-2 '>
//                        <Briefcase size={18}/>
//                        Learn More 
//                     </Button>
//                     </Link>
//                   </div>

//                   {/* trust indicator seciton */}
//                   <div className='flex items-center gap-2 text-sm opacity-60 pt-4'>
//                     <span>Free to use</span>
//                     <span>Verified emplyers</span>
//                     <span>.</span>
//                     <span>SEcure platform</span>
//                   </div>
//                 </div>
//                 {/* image section */}
//                 <div className='flex-1 relative'>
//                     <div className='relative group'>
//                         <div className='absolute -inset-4 bg-blue-400 opacity-20 blur-xl group-hover:opacity-30 transition-opacity'>
//                       <div className='relative rounded-2xl overflow-hidden shadow-2xl border-4 border-background'>
//                         <img src="/hero.png" alt="Hero Image" className='oject-cover object-center w-full h-full transform transition-transform duration-500 group-hover:scale-105' />
//                       </div>
//                         </div>

//                     </div>
//             </div>
//         </div>

//     </section>
//   )
// }


// export default Hero

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Briefcase,
  Search,
  TrendingUp,
} from 'lucide-react';
import { Button } from './ui/button';

function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-28 border-b">
      {/* Background Grid & Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Colorful Glow Orbs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600 rounded-full blur-[120px] opacity-20 dark:opacity-30 animate-pulse-slow" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-purple-600 rounded-full blur-[150px] opacity-15 dark:opacity-25 animate-pulse-slow delay-1000" />
        <div className="absolute -bottom-40 left-1/3 w-80 h-80 bg-blue-600 rounded-full blur-[100px] opacity-10 dark:opacity-20 animate-pulse-slow delay-2000" />

        {/* Futuristic SVG Grid Pattern */}
        <svg className="absolute inset-0 w-full h-full stroke-muted/30 dark:stroke-muted/15 [mask-image:radial-gradient(100%_100%_at_top_left,white,transparent)]" aria-hidden="true">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse" x="-1" y="-1">
              <path d="M.5 40V.5H40" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-5 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Content */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-background/60 backdrop-blur-md shadow-sm border-indigo-500/10">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span className="text-sm font-semibold tracking-wide text-indigo-600 dark:text-indigo-400">
                No.1 Job Platform in India
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-foreground">
              Find Your{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 dark:from-indigo-400 dark:via-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
                Dream Job
              </span>{' '}
              Today
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl font-medium">
              Connect with top employers and find your dream job today that matches your skills.
              Whether you're a job seeker or recruiter, we've got you covered with AI-powered career tools.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 w-full max-w-lg py-4 border-y border-muted/50">
              <div className="text-center lg:text-left">
                <p className="text-3xl font-extrabold text-foreground">10K+</p>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-1">Active Jobs</p>
              </div>
              <div className="text-center lg:text-left border-x border-muted/50 px-4">
                <p className="text-3xl font-extrabold text-foreground">5K+</p>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-1">Companies</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-3xl font-extrabold text-foreground">50K+</p>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-1">Job Seekers</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
              <Link href="/jobs" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-base px-8 h-13 gap-2 shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 rounded-xl font-semibold">
                  <Search size={18} />
                  Browse Jobs
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/about" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-base px-8 h-13 gap-2 border-muted hover:bg-accent transition-all duration-300 rounded-xl font-semibold">
                  <Briefcase size={18} />
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-6 gap-y-2 text-sm text-muted-foreground font-semibold">
              <span className="flex items-center gap-1.5">✓ Free to use</span>
              <span className="text-muted/40">•</span>
              <span className="flex items-center gap-1.5">✓ Verified employers</span>
              <span className="text-muted/40">•</span>
              <span className="flex items-center gap-1.5">✓ Secure platform</span>
            </div>
          </div>

          {/* Right side floating cards section */}
          <div className="flex-1 relative w-full min-h-[420px] lg:min-h-[480px] flex items-center justify-center mt-10 lg:mt-0">
            {/* Ambient background glow behind the cards */}
            <div className="absolute w-72 h-72 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full blur-[100px] opacity-25 dark:opacity-35 animate-pulse-slow" />
            <div className="absolute w-60 h-60 bg-gradient-to-tr from-orange-400 to-red-400 rounded-full blur-[100px] opacity-15 dark:opacity-20 animate-pulse-slow delay-1000" />

            {/* Card 1: Job Match Info (Top Left floating) */}
            <div className="absolute top-0 left-4 md:left-12 w-72 p-5 rounded-2xl glass-panel-light dark:glass-panel shadow-2xl animate-float transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Briefcase size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-foreground">Lead React Architect</h4>
                  <p className="text-xs text-muted-foreground">QuantumTech Inc.</p>
                </div>
              </div>
              <div className="flex justify-between items-center text-xs border-t border-muted/50 pt-3">
                <span className="px-2.5 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  98% Match
                </span>
                <span className="text-muted-foreground font-semibold">$140k - $180k</span>
              </div>
            </div>

            {/* Card 2: Market Salary Trend (Center Right floating) */}
            <div className="absolute top-28 right-4 md:right-12 w-64 p-5 rounded-2xl glass-panel-light dark:glass-panel shadow-2xl animate-float-delayed transition-all duration-300 hover:scale-105">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Avg. Tech Salary Growth</p>
                  <h4 className="text-2xl font-black mt-1 text-foreground">$125,000</h4>
                </div>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-bold">
                  +14.8%
                </span>
              </div>
              {/* SVG Sparkline graph */}
              <div className="h-16 w-full mt-2">
                <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.4"/>
                      <stop offset="100%" stopColor="#4f46e5" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,25 Q15,5 30,18 T60,8 T90,20 L100,5 L100,30 L0,30 Z"
                    fill="url(#chartGradient)"
                  />
                  <path
                    d="M0,25 Q15,5 30,18 T60,8 T90,20 L100,5"
                    fill="none"
                    stroke="#4f46e5"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Card 3: Top Talents / Profile Card (Bottom Left floating) */}
            <div className="absolute bottom-4 left-6 md:left-16 w-68 p-5 rounded-2xl glass-panel-light dark:glass-panel shadow-2xl animate-float transition-all duration-300 hover:scale-105">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Popular Roles</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-indigo-500" />
                    <span className="font-medium text-foreground">Full Stack Engineer</span>
                  </div>
                  <span className="text-muted-foreground font-semibold">4.8k jobs</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-violet-500" />
                    <span className="font-medium text-foreground">Product Designer</span>
                  </div>
                  <span className="text-muted-foreground font-semibold">2.9k jobs</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-orange-500" />
                    <span className="font-medium text-foreground">AI / ML Engineer</span>
                  </div>
                  <span className="text-muted-foreground font-semibold">1.5k jobs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;