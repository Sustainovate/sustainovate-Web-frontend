"use client"

// components/WhatIsSustainovate.tsx
import { FC, JSX } from "react";

type Card = {
  title: string;
  description: string;
  color: string; // Tailwind color accent (e.g., "green", "yellow")
  icon: JSX.Element;
};

const cards: Card[] = [
  {
    title: "Our Mission",
    description:
      "To empower individuals and communities to adopt practical, innovative, and sustainable solutions in everyday life, fostering environmental responsibility and well-being.",
    color: "green",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    ),
  },
  {
    title: "Our Vision",
    description:
      "A future where sustainability is second nature—driven by creativity, technology, and collective action for a greener, healthier planet.",
    color: "yellow",
    icon: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </>
    ),
  },
];

const WhatIsSustainovate: FC = () => {
  return (
    <section
      id="SUSTAINOVATE"
      className="relative py-16 sm:py-20 lg:py-24 bg-transparent"
      aria-label="What is Sustainovate section"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8">
            What is <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Sustain</span>
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">ovate</span>?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
            Sustainovate is a movement that empowers people to adopt innovative,
            practical solutions for sustainable living, blending creativity and
            technology to build a greener, healthier future.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={`glass backdrop-blur-xl rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 transform hover:scale-105 border border-purple-500/20`}
            >
              <div className="mb-6">
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r ${card.color === 'green' ? 'from-green-500 to-emerald-500' : 'from-purple-500 to-purple-600'} rounded-xl flex items-center justify-center shadow-lg`}
                >
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {card.icon}
                  </svg>
                </div>
              </div>
              <h3
                className={`text-xl sm:text-2xl lg:text-3xl font-bold ${card.color === 'green' ? 'text-green-400' : 'text-purple-400'} mb-4 sm:mb-6`}
              >
                {card.title}
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-48 h-48 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-56 h-56 bg-gradient-to-l from-purple-500/10 to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-green-400/10 to-purple-400/10 rounded-full blur-2xl"></div>
      </div>
    </section>
  );
};

export default WhatIsSustainovate;
