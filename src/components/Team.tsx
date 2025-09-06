"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import {team} from '@/data/Team'

export default function TeamOrgChart() {
  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center py-16 px-4">
      <h1 className="text-5xl font-extrabold text-white mb-14 tracking-tight drop-shadow-lg">
        Meet Our Team
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full max-w-7xl">
        {team.map((member) => {
          const avatarUrl = member.github
            ? `https://github.com/${member.github.split("/")[3]}.png`
            : "https://via.placeholder.com/150";

          return (
            <motion.div
              key={member.id}
              className="relative flex flex-col glass backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 border-2 border-purple-500/20 hover:border-purple-400"
              whileHover={{ y: -10, scale: 1.04 }}
            >
              {/* Profile Image */}
              <div className="h-52 w-full overflow-hidden flex items-center justify-center bg-gradient-to-tr from-purple-500/10 to-green-500/10">
                <img
                  src={avatarUrl}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-purple-400/50 shadow-lg transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* Info */}
              <div className="p-7 text-center flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {member.name}
                </h2>
                <p className="text-base text-gray-300 font-medium mb-4">
                  {member.role}
                </p>
              </div>

              {/* Social Links */}
              <div className="glass backdrop-blur-xl px-6 py-4 flex justify-center gap-6 rounded-b-3xl shadow-inner border-t border-purple-500/30">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <FaLinkedin size={28} />
                  </a>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <FaGithub size={28} />
                  </a>
                )}
                {member.x && (
                  <a
                    href={member.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <FaTwitter size={28} />
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
