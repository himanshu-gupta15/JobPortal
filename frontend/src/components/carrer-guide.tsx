'use client';

import React, { useState } from 'react';
import axios from 'axios';

import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Lightbulb,
  Sparkle,
  Sparkles,
  Target,
  TrendingUp,
  X,
} from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from "@/components/ui/label";

import { CareerGuideResponse } from '@/type';
import { utils_service } from '@/context/AppContext';
import toast from 'react-hot-toast';

function CarrerGuide() {

  const [open, setOpen] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [loading, setLoading] = useState(false);

  const [response, setResponse] =
    useState<CareerGuideResponse | null>(null);

  const addSkill = () => {
    if (
      currentSkill.trim() &&
      !skills.includes(currentSkill.trim())
    ) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(
      skills.filter((s) => s !== skillToRemove)
    );
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      addSkill();
    }
  };

  const getCareerGuidance = async () => {

    if (skills.length === 0) {
      toast.error("Please add at least one skill");
      return;
    }

    setLoading(true);

    try {

      const { data } = await axios.post(
        `${utils_service}/api/utils/career`,
        {
          skills:skills,
        }
      );

      setResponse(data);
      console.log(data);

      toast.success("Career guidance generated!");

    } catch (error: any) {

      toast.error(
        error?.response?.data?.message ||
        "Something went wrong"
      );

    } finally {
      setLoading(false);
    }
  };

  const resetDialog = () => {
    setSkills([]);
    setCurrentSkill("");
    setResponse(null);
    setOpen(false);
  };

  return (
    <div className="relative overflow-hidden py-24 bg-background border-b">
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-5 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-background/60 backdrop-blur-md border-indigo-500/10 mb-6 shadow-sm">
          <Sparkles
            size={16}
            className="text-indigo-600 dark:text-indigo-400 animate-pulse"
          />
          <span className="text-sm font-semibold tracking-wide text-indigo-600 dark:text-indigo-400">
            AI-Powered Career Guidance
          </span>
        </div>

        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-foreground">
          Discover Your{' '}
          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
            Career Path
          </span>
        </h2>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
          Unlock tailored, professional roadmap recommendations and key tech skills to learn, powered by advanced AI analysis of your skills.
        </p>

        <Dialog
          open={open}
          onOpenChange={setOpen}
        >
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="gap-2 h-13 px-8 shadow-lg shadow-indigo-600/15 hover:shadow-indigo-600/25 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all duration-300"
            >
              <Sparkle size={18} />
              Get Career Guidance
              <ArrowRight size={18} />
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border-muted/80 backdrop-blur-xl">
            {!response ? (
              <>
                <DialogHeader className="mb-6">
                  <DialogTitle className="text-2xl font-extrabold flex items-center gap-3 text-foreground">
                    <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <Sparkles size={22} />
                    </div>
                    Tell us about your skills
                  </DialogTitle>
                  <DialogDescription className="text-base text-muted-foreground font-medium pt-2">
                    Enter the skills you have or want to build, and we'll map out a customized career pathway for you.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 pt-2">
                  <div className="space-y-3">
                    <Label htmlFor="skill" className="text-sm font-bold text-foreground">
                      Add Technical Skills
                    </Label>
                    <div className="flex gap-3">
                      <Input
                        id="skill"
                        placeholder="e.g. React, Node.js, Python, Figma"
                        value={currentSkill}
                        onChange={(e) =>
                          setCurrentSkill(e.target.value)
                        }
                        onKeyDown={handleKeyPress}
                        className="h-12 rounded-xl border-muted focus-visible:ring-indigo-500/30"
                      />
                      <Button
                        onClick={addSkill}
                        className="h-12 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md shadow-indigo-600/10"
                      >
                        Add
                      </Button>
                    </div>
                  </div>

                  {skills.length > 0 && (
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-foreground flex items-center gap-2">
                        Your Skills
                        <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-extrabold">
                          {skills.length}
                        </span>
                      </Label>
                      <div className="flex flex-wrap gap-2.5 p-4 rounded-2xl bg-secondary/40 border border-muted/50">
                        {skills.map((s) => (
                          <div
                            key={s}
                            className="inline-flex items-center gap-2 pl-3.5 pr-2.5 py-1.5 rounded-xl bg-background border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-semibold shadow-sm text-sm"
                          >
                            <span>{s}</span>
                            <button
                              onClick={() =>
                                removeSkill(s)
                              }
                              className="h-5 w-5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 flex items-center justify-center transition-colors"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={getCareerGuidance}
                    disabled={loading || skills.length === 0}
                    className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold tracking-wide mt-4 shadow-lg shadow-indigo-600/10"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Analyzing Skill Sets & Generating Pathways...
                      </span>
                    ) : (
                      "Generate Career Guidance"
                    )}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <DialogHeader className="mb-6 border-b pb-4">
                  <DialogTitle className="text-2xl font-black flex items-center gap-3 text-foreground">
                    <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <Target size={22} />
                    </div>
                    Your AI Career Pathway
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-8 pt-2">
                  {/* Career Summary */}
                  <div className="p-5 rounded-2xl bg-indigo-500/[0.04] dark:bg-indigo-500/[0.02] border border-indigo-500/10 flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                      <Lightbulb size={22} />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-foreground mb-1">Career Assessment Summary</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground font-medium">{response.summary}</p>
                    </div>
                  </div>

                  {/* recommended career options as a vertical roadmap */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                      <Briefcase size={20} className="text-indigo-600 dark:text-indigo-400" />
                      Recommended Career Pathway
                    </h3>
                    <div className="relative border-l-2 border-indigo-500/20 ml-4 pl-8 space-y-6">
                      {response.jobOptions.map((job, index) => (
                        <div key={index} className="relative group">
                          {/* Circle Timeline Point */}
                          <span className="absolute -left-12 top-0.5 flex items-center justify-center w-8 h-8 rounded-xl bg-background border-2 border-indigo-600 text-indigo-600 font-bold text-sm shadow-sm group-hover:scale-110 transition-transform">
                            {index + 1}
                          </span>
                          <div className="p-5 rounded-2xl bg-secondary/30 border border-muted/80 shadow-sm transition-all duration-300 hover:border-indigo-500/30">
                            <h4 className="font-extrabold text-base text-foreground mb-2">{job.title}</h4>
                            <div className="space-y-2 text-sm leading-relaxed">
                              <p className="text-muted-foreground">
                                <span className="font-bold text-foreground block md:inline mb-0.5 md:mb-0">Key Responsibilities: </span>
                                {job.responsibilities}
                              </p>
                              <p className="text-muted-foreground pt-1">
                                <span className="font-bold text-foreground block md:inline mb-0.5 md:mb-0">Why this Role fits: </span>
                                {job.why}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills to learn */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                      <TrendingUp size={20} className="text-indigo-600 dark:text-indigo-400" />
                      Skills to Acquire for Career Growth
                    </h3>
                    <div className="space-y-6">
                      {response.skillsToLearn.map((category, index) => (
                        <div key={index} className="space-y-3">
                          <h4 className="font-extrabold text-sm text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">{category.category}</h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            {category.skills.map((skill, sIndex) => (
                              <div key={sIndex} className="p-4 rounded-2xl bg-background border border-muted/80 shadow-sm">
                                <p className="font-bold text-sm text-foreground mb-1.5">{skill.title}</p>
                                <p className="text-xs text-muted-foreground mb-1 leading-relaxed">
                                  <strong className="text-foreground font-semibold">Importance:</strong> {skill.why}
                                </p>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                  <strong className="text-foreground font-semibold">Resources:</strong> {skill.how}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Learning approach */}
                  <div className="p-5 rounded-2xl bg-emerald-500/[0.04] dark:bg-emerald-500/[0.02] border border-emerald-500/10">
                    <h3 className="text-base font-extrabold text-foreground mb-3 flex items-center gap-2">
                      <BookOpen size={18} className="text-emerald-600 dark:text-emerald-400" />
                      {response.learningApproach.title}
                    </h3>
                    <ul className="space-y-2.5">
                      {response.learningApproach.points.map((point, index) => (
                        <li key={index} className="text-xs text-muted-foreground flex items-start gap-2 leading-relaxed">
                          <span className="text-emerald-600 font-bold mt-0.5">•</span>
                          <span
                            className="opacity-90"
                            dangerouslySetInnerHTML={{ __html: point }}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    onClick={resetDialog}
                    className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold tracking-wide"
                  >
                    Start New Analysis
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default CarrerGuide;