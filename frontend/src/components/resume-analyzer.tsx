"use client";

import React, { useState, useRef } from "react";
import axios from "axios";

import {
  FileText,
  Upload,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Loader2,
  ArrowRight,
  FileCheck,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ResumeAnalysisResponse } from "@/type";
import { utils_service } from "@/context/AppContext";

import toast from "react-hot-toast";

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-yellow-600";
  return "text-red-600";
};

const getScoreBgColor = (score: number) => {
  if (score >= 80)
    return "bg-green-100 dark:bg-green-900/30";

  if (score >= 60)
    return "bg-yellow-100 dark:bg-yellow-900/30";

  return "bg-red-100 dark:bg-red-900/30";
};

const getPriorityColor = (priority: string) => {

  if (priority === "high") {
    return `
      bg-red-100
      dark:bg-red-900/30
      text-red-600
      border-red-200
      dark:border-red-800
    `;
  }

  if (priority === "medium") {
    return `
      bg-yellow-100
      dark:bg-yellow-900/30
      text-yellow-600
      border-yellow-200
      dark:border-yellow-800
    `;
  }

  return `
    bg-blue-100
    dark:bg-blue-900/30
    text-blue-600
    border-blue-200
    dark:border-blue-800
  `;
};

const ResumeAnalyzer = () => {

  const [open, setOpen] = useState(false);

  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [response, setResponse] =
    useState<ResumeAnalysisResponse | null>(null);

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const selectedFile =
      e.target.files?.[0];

    if (selectedFile) {

      if (
        selectedFile.type !==
        "application/pdf"
      ) {

        toast.error("Please upload a PDF file");
        return;
      }

      if (
        selectedFile.size >
        5 * 1024 * 1024
      ) {

        toast.error("File size should be less than 5MB");
         

        return;
      }

      setFile(selectedFile);
    }
  };

  const convertToBase64 = (
    file: File
  ): Promise<string> => {

    return new Promise(
      (resolve, reject) => {

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () =>
          resolve(reader.result as string);

        reader.onerror = (error) =>
          reject(error);
      }
    );
  };

  const analyzeResume = async () => {

    if (!file) {

      alert("Please upload a resume");
      return;
    }

    setLoading(true);

    try {

      const base64 =
        await convertToBase64(file);

      const { data } = await axios.post(
        `${utils_service}/api/utils/resume-analyser`,
        {
          pdfBase64: base64,
        }
      );

      setResponse(data);

      toast.success("Resume analyzed successfully!");
       

    } catch (error: any) {

      toast.error(
        error?.response?.data?.message ||
        "Failed to analyze resume"
      );

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  const resetDialog = () => {

    setFile(null);

    setResponse(null);

    setOpen(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="relative overflow-hidden py-24 bg-secondary/10 border-b">
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-5 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-background/60 backdrop-blur-md border-red-500/10 mb-6 shadow-sm">
          <FileCheck
            size={16}
            className="text-red-500 animate-pulse"
          />
          <span className="text-sm font-semibold tracking-wide text-red-500">
            AI-Powered ATS Analysis
          </span>
        </div>

        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-foreground">
          Optimize Your{' '}
          <span className="bg-gradient-to-r from-red-500 to-orange-500 dark:from-red-400 dark:to-orange-400 bg-clip-text text-transparent">
            Resume for ATS
          </span>
        </h2>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
          Upload your resume to check your ATS compatibility score, identify missing keywords, and get custom recommendations to stand out.
        </p>

        <Dialog
          open={open}
          onOpenChange={setOpen}
        >
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="gap-2 h-13 px-8 shadow-lg shadow-red-500/10 hover:shadow-red-500/20 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all duration-300"
            >
              <FileText size={18} />
              Analyze My Resume
              <ArrowRight size={18} />
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border-muted/80 backdrop-blur-xl">
            {!response ? (
              <>
                <DialogHeader className="mb-6">
                  <DialogTitle className="text-2xl font-extrabold flex items-center gap-3 text-foreground">
                    <div className="h-10 w-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
                      <FileText size={22} />
                    </div>
                    Upload Your Resume
                  </DialogTitle>
                  <DialogDescription className="text-base text-muted-foreground font-medium pt-2">
                    Upload your resume in PDF format to get an instant Applicant Tracking System (ATS) optimization analysis.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 pt-2">
                  {loading ? (
                    <div className="relative border-2 border-dashed border-red-500/40 rounded-2xl p-12 text-center bg-red-500/[0.01] overflow-hidden min-h-[240px] flex flex-col items-center justify-center">
                      {/* Laser scanning line */}
                      <div className="absolute left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-red-500 to-transparent animate-scan" />
                      <Loader2 size={40} className="animate-spin text-red-500 mb-4" />
                      <p className="font-extrabold text-foreground mb-1 text-lg">Scanning Resume structure...</p>
                      <p className="text-sm text-muted-foreground font-medium">Extracting key text blocks and validating ATS standards</p>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-muted rounded-2xl p-12 text-center cursor-pointer hover:border-red-500/40 bg-secondary/20 hover:bg-secondary/40 transition-all duration-300 min-h-[240px] flex flex-col items-center justify-center group"
                      aria-label="Upload Resume"
                    >
                      <div className="flex flex-col items-center gap-4">
                        <div className="h-16 w-16 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center transition-transform group-hover:scale-110">
                          <Upload size={32} />
                        </div>
                        <div>
                          <p className="font-bold text-base mb-1 text-foreground">
                            {file ? file.name : "Click to select and upload your resume"}
                          </p>
                          <p className="text-xs text-muted-foreground font-medium">
                            PDF format only, maximum size of 5MB
                          </p>
                        </div>
                        {file && (
                          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-500/10 px-3 py-1 rounded-full text-xs font-bold">
                            <CheckCircle2 size={14} />
                            Ready for analysis
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={loading}
                  />

                  <Button
                    onClick={analyzeResume}
                    disabled={loading || !file}
                    className="w-full h-12 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold tracking-wide mt-4 shadow-lg shadow-red-500/10"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 size={18} className="animate-spin" />
                        Running ATS Check...
                      </span>
                    ) : (
                      "Analyze Resume"
                    )}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <DialogHeader className="mb-6 border-b pb-4">
                  <DialogTitle className="text-2xl font-black flex items-center gap-3 text-foreground">
                    <div className="h-10 w-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
                      <FileCheck size={22} />
                    </div>
                    Resume Assessment Report
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-8 pt-2">
                  {/* Circular ATS Gauge */}
                  <div className="grid md:grid-cols-5 gap-6 items-center p-6 rounded-2xl bg-secondary/30 border border-muted/80 shadow-sm">
                    <div className="md:col-span-2 flex justify-center">
                      <div className="relative flex items-center justify-center h-36 w-36">
                        <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            className="stroke-muted/10"
                            strokeWidth="8"
                            fill="transparent"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            className={`transition-all duration-1000 ease-out ${
                              response.atsScore >= 80
                                ? "stroke-emerald-500"
                                : response.atsScore >= 60
                                ? "stroke-amber-500"
                                : "stroke-rose-500"
                            }`}
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray="251.2"
                            strokeDashoffset={251.2 - (251.2 * response.atsScore) / 100}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="text-center z-10">
                          <span className="text-4xl font-black text-foreground block">
                            {response.atsScore}
                          </span>
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                            ATS Score
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-3 space-y-2 text-center md:text-left">
                      <h4 className="font-extrabold text-lg text-foreground">ATS Match Verdict</h4>
                      <p className="text-sm leading-relaxed text-muted-foreground font-medium">
                        {response.summary}
                      </p>
                    </div>
                  </div>

                  {/* score breakdown */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                      <TrendingUp size={20} className="text-red-500" />
                      Detailed Assessment Breakdown
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {Object.entries(response.scoreBreakdown).map(([key, value]) => (
                        <div
                          key={key}
                          className="p-4 rounded-2xl bg-background border border-muted/85 shadow-sm"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-extrabold text-sm capitalize text-foreground">
                              {key}
                            </p>
                            <span
                              className={`text-base font-black ${
                                value.score >= 80
                                  ? "text-emerald-500"
                                  : value.score >= 60
                                  ? "text-amber-500"
                                  : "text-rose-500"
                              }`}
                            >
                              {value.score}%
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                            {value.feedback}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* strengths */}
                  <div className="p-5 rounded-2xl bg-emerald-500/[0.04] dark:bg-emerald-500/[0.02] border border-emerald-500/10">
                    <h3 className="font-extrabold text-base text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400" />
                      ATS Best Practices Checklist Met
                    </h3>
                    <ul className="grid sm:grid-cols-2 gap-2.5">
                      {response.strengths.map((strength, index) => (
                        <li
                          key={index}
                          className="text-xs text-muted-foreground flex items-start gap-2 leading-relaxed"
                        >
                          <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* suggestions */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                      <AlertTriangle size={20} className="text-red-500" />
                      Critical Fixes & Recommendations
                    </h3>
                    <div className="space-y-3.5">
                      {response.suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="p-5 rounded-2xl bg-background border border-muted/80 shadow-sm"
                        >
                          <div className="flex items-start justify-between gap-3 mb-2.5">
                            <h4 className="font-extrabold text-sm text-foreground">
                              {suggestion.category}
                            </h4>
                            <span
                              className={`text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full border ${
                                suggestion.priority === "high"
                                  ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/10"
                                  : suggestion.priority === "medium"
                                  ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/10"
                                  : "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/10"
                              }`}
                            >
                              {suggestion.priority} Priority
                            </span>
                          </div>
                          <div className="space-y-2 text-xs leading-relaxed">
                            <p className="text-muted-foreground">
                              <strong className="text-foreground font-bold">Issue found: </strong>
                              {suggestion.issue}
                            </p>
                            <p className="text-muted-foreground pt-0.5">
                              <strong className="text-foreground font-bold">Action to improve: </strong>
                              {suggestion.recommendation}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={resetDialog}
                    className="w-full h-12 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold tracking-wide"
                  >
                    Analyze Another Resume
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;