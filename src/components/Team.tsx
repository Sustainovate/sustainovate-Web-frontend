"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
}

const team: TeamMember[] = [
  {
    id: 1,
    name: "Jit Mukherjee",
    role: "Team Lead",
    github: "codesbyjit",
    linkedin: "https://linkedin.com/in/jit",
    twitter: "https://twitter.com/jit",
  },
  {
    id: 2,
    name: "Mainak Panda",
    role: "Designer",
    github: "0xmainak",
    linkedin: "https://linkedin.com/in/mainak",
  },
  // {
  //   id: 3,
  //   name: "Alex Johnson",
  //   role: "Developer",
  //   github: "alexjohnson",
  //   linkedin: "https://linkedin.com/in/alexjohnson",
  // },
];

export default function TeamOrgChart() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center py-16 px-4">
      <h1 className="text-5xl font-extrabold text-indigo-700 mb-14 tracking-tight drop-shadow-lg">
        Meet Our Team
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full max-w-7xl">
        {team.map((member) => {
          const avatarUrl = member.github
            ? `https://github.com/${member.github}.png`
            : "https://via.placeholder.com/150";

          return (
            <motion.div
              key={member.id}
              className={`relative bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-300 cursor-pointer border-2 ${
                active === member.id
                  ? "border-indigo-400 scale-105"
                  : "border-transparent"
              }`}
              whileHover={{ y: -10, scale: 1.04 }}
              onClick={() =>
                setActive(active === member.id ? null : member.id)
              }
            >
              {/* Profile Image */}
              <div className="h-52 w-full overflow-hidden flex items-center justify-center bg-gradient-to-tr from-indigo-100 to-blue-100">
                <img
                  src={avatarUrl}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* Info */}
              <div className="p-7 text-center">
                <h2 className="text-2xl font-bold text-indigo-800 mb-2">
                  {member.name}
                </h2>
                <p className="text-base text-gray-500 font-medium mb-4">
                  {member.role}
                </p>
                <div className="flex justify-center gap-4">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <FaLinkedin size={26} />
                    </a>
                  )}
                  {member.github && (
                    <a
                      href={`https://github.com/${member.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-800 hover:text-black transition-colors"
                    >
                      <FaGithub size={26} />
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-500 hover:text-sky-700 transition-colors"
                    >
                      <FaTwitter size={26} />
                    </a>
                  )}
                </div>
              </div>

              {/* Animated Social Panel */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={
                  active === member.id
                    ? { opacity: 1, height: "auto" }
                    : { opacity: 0, height: 0 }
                }
                transition={{ duration: 0.4 }}
                className="absolute bottom-0 left-0 w-full bg-indigo-50 px-6 py-4 flex justify-center gap-6 rounded-b-3xl shadow-inner"
              >
                {active === member.id && (
                  <>
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <FaLinkedin size={28} />
                      </a>
                    )}
                    {member.github && (
                      <a
                        href={`https://github.com/${member.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-800 hover:text-black transition-colors"
                      >
                        <FaGithub size={28} />
                      </a>
                    )}
                    {member.twitter && (
                      <a
                        href={member.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-500 hover:text-sky-700 transition-colors"
                      >
                        <FaTwitter size={28} />
                      </a>
                    )}
                  </>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
