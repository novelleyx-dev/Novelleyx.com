"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Target, Lightbulb, Workflow, Award, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "@/components/animations";

export default function WhyNovelleyxPage() {
  const pillars = [
    {
      icon: <Target className="w-8 h-8 text-amber-500" />,
      title: "Requirement-First Philosophy",
      description: "Unlike traditional agencies that push pre-packaged services, we start by mapping your organizational friction. We don't prescribe solutions until we fully diagnose the problem.",
      points: ["Deep Architectural Analysis", "Friction Point Mapping", "Custom Blueprint Creation"]
    },
    {
      icon: <Workflow className="w-8 h-8 text-amber-500" />,
      title: "One Connected Ecosystem",
      description: "Media, IT, AI, and Education operate under one unified roof. This prevents the classic 'agency disconnect' where your dev team and marketing team aren't aligned.",
      points: ["Cross-Functional Teams", "Unified Strategy", "Seamless Integration"]
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-amber-500" />,
      title: "Human + AI Synergy",
      description: "We believe AI is a multiplier, not a replacement. Our solutions blend bleeding-edge artificial intelligence with expert human oversight to ensure quality, empathy, and precision.",
      points: ["Automated Efficiency", "Human Quality Control", "Scalable Operations"]
    },
    {
      icon: <Shield className="w-8 h-8 text-amber-500" />,
      title: "Practical, Measurable Outcomes",
      description: "Technology should actually solve something. We measure our success not by lines of code written, but by hours saved, revenue generated, and friction removed from your business.",
      points: ["ROI Focused", "Data-Driven Metrics", "Continuous Optimization"]
    }
  ];

  return (
    <main className="bg-[#050505] min-h-screen text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-500/5 blur-[150px] rounded-full pointer-events-none z-0" />
      
      {/* Hero Section */}
      <section className="px-6 md:px-12 lg:px-24 pt-32 pb-20 relative z-10 text-center">
        <ScrollReveal>
          <span className="text-amber-500 font-bold tracking-[0.2em] uppercase mb-4 block text-sm">
            The NOVELLEYX Standard
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            Why Build With <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Us?</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
            We are not just another service provider. We are an ecosystem of engineers, strategists, and creatives dedicated to turning your operational friction into scalable power.
          </p>
        </ScrollReveal>
      </section>

      {/* The Pillars Detailed */}
      <section className="px-6 md:px-12 lg:px-24 pb-32 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1} direction={idx % 2 === 0 ? "left" : "right"}>
              <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-10 hover:border-amber-500/30 transition-colors h-full flex flex-col group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110">
                  {pillar.icon}
                </div>
                
                <div className="w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center mb-8 group-hover:border-amber-500/50 transition-colors shadow-lg">
                  {pillar.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-4">{pillar.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-8 flex-grow">
                  {pillar.description}
                </p>
                
                <ul className="space-y-3 border-t border-white/5 pt-6">
                  {pillar.points.map((point, i) => (
                    <li key={i} className="flex items-center text-sm font-medium text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 mr-3" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Trust & Stats Section */}
      <section className="px-6 md:px-12 lg:px-24 pb-32 relative z-10">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#111] to-[#0A0A0A] border border-white/10 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.05),transparent_50%)]" />
          
          <Award className="w-16 h-16 text-amber-500 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Built on Trust & Transparency.</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
            Every line of code we write, every media asset we produce, and every AI workflow we deploy is engineered with a single goal: delivering a measurable return on your investment.
          </p>

          <Link href="/appraisal">
            <button className="px-8 py-4 bg-amber-500 text-black font-bold rounded-full hover:bg-amber-400 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] flex items-center justify-center gap-2 mx-auto">
              GET YOUR FREE APPRAISAL
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </section>

    </main>
  );
}
