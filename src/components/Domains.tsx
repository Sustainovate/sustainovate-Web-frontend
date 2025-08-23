"use client"
// components/ExploreDomains.tsx
import { FC, JSX } from "react";

type Domain = {
  title: string;
  description: string;
  tags: string[];
  color: string; // Tailwind color accent (e.g., "green", "yellow", "teal")
  icon: JSX.Element;
};

const domains: Domain[] = [
  {
    title: "Carbon Emission and Energy Efficiency",
    description:
      "Develop solutions for reducing carbon footprint and improving energy efficiency across industries.",
    tags: ["Smart Grids", "Solar Solutions", "Energy Analytics"],
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
    title: "Sustainable Agriculture",
    description:
      "Leverage technology to promote eco-friendly farming and resilient food systems.",
    tags: ["Precision Farming", "AgriTech", "Soil Health"],
    color: "yellow",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 4v16m8-8H4"
      />
    ),
  },
  {
    title: "Waste Management",
    description:
      "Innovate in recycling, circular economy, and smart waste tracking solutions.",
    tags: ["Circular Economy", "Smart Bins", "Recycling Tech"],
    color: "teal",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"
      />
    ),
  },
  {
    title: "Water Conservation",
    description:
      "Smart solutions to monitor, conserve, and optimize water usage globally.",
    tags: ["IoT Monitoring", "Water Recycling", "Smart Irrigation"],
    color: "blue",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 22s8-4.5 8-10a8 8 0 10-16 0c0 5.5 8 10 8 10z"
      />
    ),
  },
];

const ExploreDomains: FC = () => {
  return (
    <section
      id="DOMAINS"
      className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-green-50 to-yellow-50"
      aria-label="Explore our Domains section"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 sm:mb-8">
            Explore our Domains
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
            Choose an innovation path that aligns with your passion and expertise.
          </p>
        </div>

        {/* Domains Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {domains.map((domain, idx) => (
            <div
              key={idx}
              className={`domain-card bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-${domain.color}-200/50`}
            >
              <div className="mb-4">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 bg-${domain.color}-600 rounded-xl flex items-center justify-center shadow-md`}
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {domain.icon}
                  </svg>
                </div>
              </div>
              <h3
                className={`text-lg sm:text-xl font-bold text-${domain.color}-700 mb-3`}
              >
                {domain.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                {domain.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {domain.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className={`bg-${domain.color}-100 text-${domain.color}-800 text-xs px-2 py-1 rounded-full font-medium`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-r from-green-100/30 to-green-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-20 w-60 h-60 bg-gradient-to-l from-yellow-100/30 to-yellow-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 left-1/3 w-32 h-32 bg-gradient-to-t from-orange-100/30 to-yellow-200/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-gradient-to-br from-green-100/40 to-emerald-100/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-36 h-36 bg-gradient-to-tl from-teal-100/30 to-green-200/20 rounded-full blur-2xl"></div>
      </div>
    </section>
  );
};

export default ExploreDomains;