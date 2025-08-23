"use client"
import { useState } from "react";

export default function TeamSection() {
  const team = [
    { name: "Divyansh Barodiya", project: "Agriculture_ZenTej" },
    { name: "Abhay Tiwari", project: "Decentralized Cloud Storage" },
    { name: "Sarah Johnson", project: "MindfulTech" },
    { name: "David Chen", project: "WildlifeConnect" },
    { name: "Priya Sharma", project: "GreenEnergy Solutions" },
    { name: "Alex Rodriguez", project: "SmartWaste Management" },
    { name: "Anita Patel", project: "EcoTrack Analytics" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const slideTeam = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentIndex((prev) =>
        prev === 0 ? team.length - 1 : prev - 1
      );
    } else {
      setCurrentIndex((prev) =>
        prev === team.length - 1 ? 0 : prev + 1
      );
    }
  };

  return (
    <section
      id="TEAMS"
      className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-orange-50 to-yellow-50"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 sm:mb-8">
            Meet our{" "}
            <span className="text-yellow-500 drop-shadow-lg">
              Team
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
            Our passionate team of innovators and sustainability experts
            working together to create a greener future.
          </p>
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 22}rem)`, // ~w-80 + mx-4
            }}
          >
            {team.map((member, i) => (
              <div key={i} className="flex-shrink-0 w-80 mx-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-green-200/50 h-full">
                  {/* Avatar */}
                  <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 bg-green-700 rounded-full overflow-hidden shadow-lg ring-4 ring-green-500 flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-base text-gray-600 mb-4">
                      {member.project}
                    </p>
                    <div className="mb-6">
                      <span className="bg-green-100 text-green-800 text-xs px-3 py-2 rounded-full font-bold">
                        Lead
                      </span>
                    </div>

                    {/* Connect Button */}
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-md transform hover:scale-105 flex items-center justify-center space-x-2">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      <span>Connect</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Slider Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between">
            <button
              onClick={() => slideTeam("prev")}
              className="bg-white/80 hover:bg-white text-gray-700 hover:text-green-700 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 border border-gray-200"
              aria-label="Previous team member"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => slideTeam("next")}
              className="bg-white/80 hover:bg-white text-gray-700 hover:text-green-700 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 border border-gray-200"
              aria-label="Next team member"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
