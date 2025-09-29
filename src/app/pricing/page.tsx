"use client"; // Add "use client" for the interactive FAQ component
import React, { useState } from 'react';
import { CheckCircle, Zap, Box, Star, ShieldCheck, BookOpen, Scaling, ChevronDown } from 'lucide-react';
import Link from 'next/link';

// A reusable component for displaying features in the pricing cards
const Feature = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start">
    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
    <span className="text-slate-600">{children}</span>
  </li>
);

// NEW: An interactive FAQ item component
const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-slate-200 py-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left"
            >
                <h4 className="font-semibold text-lg text-slate-800">{question}</h4>
                <ChevronDown
                    className={`h-5 w-5 text-slate-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            <div
                className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                     <p className="pt-4 text-slate-600">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default function PricingPage() {
  const faqData = [
    { question: "How does 'Pay-as-you-go' work?", answer: "Pay-as-you-go agents charge you based on your actual usage, like per image generated or per 1,000 words processed. There are no monthly fees, making it perfect for projects with variable needs. You only pay for what you use." },
    { question: "Are the free agents actually free?", answer: "Yes! Many agents on our platform are offered completely free, often by academic institutions or as open-source projects. Freemium agents also provide a generous free tier of service each month before any charges apply." },
    { question: "Can I cancel a subscription at any time?", answer: "Subscription policies are set by the individual agent developers. However, most subscription-based agents found on ApexxTech offer monthly plans that can be canceled at any time without long-term contracts." },
    { question: "How does ApexxTech make money?", answer: "ApexxTech earns a small commission from agent providers when a user signs up for a paid plan through our platform. This allows us to keep our search and comparison tools free for you while remaining unbiased in our recommendations." },
  ];
  
  return (
    <div className="bg-slate-50">
      <div className="container mx-auto px-4 py-16">
        {/* --- Hero Section --- */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800">
            Transparent Pricing for Every Scale
          </h1>
          <p className="mt-6 text-lg text-slate-600">
            From solo projects to enterprise-level workflows, our platform connects you with AI agents that fit your budget. No hidden fees, no surprises.
          </p>
        </div>

        {/* --- Pricing Tiers Section --- */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Free & Freemium */}
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <h3 className="text-2xl font-bold text-slate-800">Free & Freemium</h3>
            <p className="mt-2 text-slate-500">Perfect for trying out new tools and handling small tasks.</p>
            <div className="mt-6">
              <span className="text-4xl font-extrabold text-slate-900">$0</span>
              <span className="ml-1.5 text-slate-500">to start</span>
            </div>
            <ul className="mt-6 space-y-4 flex-grow">
              <Feature>Access a wide range of free-to-use agents.</Feature>
              <Feature>Generous free tiers on powerful premium agents.</Feature>
              <Feature>Ideal for students, hobbyists, and low-volume tasks.</Feature>
            </ul>
            <Link href="/#agent-listing" className="mt-8 block w-full text-center px-6 py-3 font-semibold bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
              Find Free Agents
            </Link>
          </div>

          {/* Card 2: Pay-as-you-go (Highlighted) */}
          <div className="bg-white p-8 rounded-xl border-2 border-blue-600 shadow-xl flex flex-col relative">
            <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                <div className="bg-blue-600 text-white px-4 py-1 text-sm font-bold rounded-full flex items-center gap-2">
                    <Star className="h-4 w-4"/>
                    Most Popular
                </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-800">Pay-as-you-go</h3>
            <p className="mt-2 text-slate-500">Ultimate flexibility. Only pay for what you actually use.</p>
            <div className="mt-6">
              <span className="text-slate-900 font-extrabold text-2xl">From $0.01</span>
              <span className="ml-1.5 text-slate-500">per unit</span>
            </div>
            <ul className="mt-6 space-y-4 flex-grow">
              <Feature>No subscriptions or monthly commitments.</Feature>
              <Feature>Perfect for projects with variable or unpredictable usage.</Feature>
              <Feature>Transparent, per-unit pricing (e.g., per image, per word).</Feature>
              <Feature>Access enterprise-grade models without the enterprise price tag.</Feature>
            </ul>
            <Link href="/" className="mt-8 block w-full text-center px-6 py-3 font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Explore Usage-Based Agents
            </Link>
          </div>

          {/* Card 3: Subscription */}
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <h3 className="text-2xl font-bold text-slate-800">Subscription</h3>
            <p className="mt-2 text-slate-500">Best value for consistent, high-volume workloads.</p>
            <div className="mt-6">
              <span className="text-slate-900 font-extrabold text-2xl">Fixed Monthly Price</span>
            </div>
            <ul className="mt-6 space-y-4 flex-grow">
              <Feature>Predictable monthly billing for easy budgeting.</Feature>
              <Feature>Often includes unlimited or very high usage limits.</Feature>
              <Feature>Ideal for core business processes and teams.</Feature>
            </ul>
            <Link href="/" className="mt-8 block w-full text-center px-6 py-3 font-semibold bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
              Browse Subscriptions
            </Link>
          </div>
        </div>
      </div>
      
      {/* --- NEW: Feature Comparison Section --- */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-4xl font-extrabold text-slate-800">More Than Just a Directory</h2>
                <p className="mt-4 text-lg text-slate-600">We provide the tools and transparency you need to make confident decisions when choosing your AI stack.</p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-6">
                    <ShieldCheck className="h-10 w-10 mx-auto text-blue-600"/>
                    <h3 className="mt-4 text-xl font-bold">Unbiased & Verified</h3>
                    <p className="mt-2 text-slate-500">We verify key agents and provide transparent data so you can trust the tools you choose.</p>
                </div>
                <div className="p-6">
                    <BookOpen className="h-10 w-10 mx-auto text-blue-600"/>
                    <h3 className="mt-4 text-xl font-bold">Comprehensive Data</h3>
                    <p className="mt-2 text-slate-500">Access detailed performance metrics, integration guides, and privacy policies.</p>
                </div>
                <div className="p-6">
                    <Scaling className="h-10 w-10 mx-auto text-blue-600"/>
                    <h3 className="mt-4 text-xl font-bold">Cost-Effective</h3>
                    <p className="mt-2 text-slate-500">Our cost calculator helps you estimate expenses and find the most affordable option for your needs.</p>
                </div>
            </div>
        </div>
      </div>

      {/* --- NEW: FAQ Section --- */}
      <div className="py-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-4xl font-extrabold text-slate-800 text-center">Frequently Asked Questions</h2>
            <div className="mt-12">
                {faqData.map((faq, index) => (
                    <FaqItem key={index} question={faq.question} answer={faq.answer} />
                ))}
            </div>
          </div>
      </div>

    </div>
  );
}

