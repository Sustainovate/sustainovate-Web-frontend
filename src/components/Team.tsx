"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { team } from "@/data/Team";

export default function TeamOrgChart() {
  const controls = useAnimation();
  const [isPaused, setIsPaused] = useState(false);

  // Infinite auto-scroll loop
  useEffect(() => {
    let running = true;

    const scroll = async () => {
      while (running) {
        if (!isPaused) {
          await controls.start({
            x: "-50%",
            transition: { duration: 40, ease: "linear" },
          });
          await controls.start({ x: 0, transition: { duration: 0 } });
        } else {
          await new Promise((r) => setTimeout(r, 200));
        }
      }
    };

    scroll();
    return () => {
      running = false;
    };
  }, [controls, isPaused]);

  // Duplicate the team for seamless infinite scroll
  const doubledTeam = [...team, ...team];

  return (
    <div className="relative overflow-hidden bg-transparent py-20 px-6 flex flex-col items-center select-none">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
        Meet Our Team
      </h1>

      <div className="relative w-full max-w-7xl overflow-hidden">
        <motion.div
          animate={controls}
          className="flex gap-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {doubledTeam.map((member, index) => {
            const avatarUrl = member.github
              ? `https://github.com/${member.github.split("/")[3]}.png`
              : "https://via.placeholder.com/150";

            return (
              <motion.div
                key={index}
                className="relative w-64 h-80 flex-shrink-0 bg-white/5 rounded-2xl border border-white/10 shadow-lg backdrop-blur-md overflow-hidden transition-transform duration-300"
                whileHover={{ scale: 1.03 }}
                onClick={() => setIsPaused(true)}
              >
                {/* Image */}
                <img
                  src={avatarUrl}
                  alt={member.name}
                  className="w-full h-full object-cover opacity-90 transition-opacity duration-300 rounded-2xl"
                />

                {/* Hover Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center text-center p-5"
                >
                  <h2 className="text-xl font-semibold text-white mb-1">
                    {member.name}
                  </h2>
                  <p className="text-gray-300 text-sm mb-3">{member.role}</p>

                  <div className="flex gap-4 text-sm font-medium">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300"
                      >
                        LinkedIn
                      </a>
                    )}
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
