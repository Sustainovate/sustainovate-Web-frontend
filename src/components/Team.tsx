"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
}

const team: TeamMember[] = [
  {
    id: 1,
    name: "John Doe",
    role: "Team Lead",
    image: "https://via.placeholder.com/150",
    linkedin: "#",
    github: "#",
    twitter: "#",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Designer",
    image: "https://via.placeholder.com/150",
    linkedin: "#",
    github: "#",
  },
  {
    id: 3,
    name: "Alex Johnson",
    role: "Developer",
    image: "https://via.placeholder.com/150",
    linkedin: "#",
    github: "#",
  },
];

export default function TeamOrgChart() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col items-center py-10 px-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-12">Our Team</h1>
      <div className="grid md:grid-cols-3 gap-10 w-full max-w-6xl">
        {team.map((member) => (
          <motion.div
            key={member.id}
            className="relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
            whileHover={{ y: -8 }}
            onClick={() => setActive(active === member.id ? null : member.id)}
          >
            {/* Profile Image */}
            <div className="h-48 w-full overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>

            {/* Info */}
            <div className="p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {member.name}
              </h2>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={
                active === member.id
                  ? { opacity: 1, height: "auto" }
                  : { opacity: 0, height: 0 }
              }
              transition={{ duration: 0.4 }}
              className="flex justify-center gap-5 pb-6"
            >
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <FaLinkedin size={22} />
                </a>
              )}
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  className="text-gray-800 hover:text-black transition-colors"
                >
                  <FaGithub size={22} />
                </a>
              )}
              {member.twitter && (
                <a
                  href={member.twitter}
                  target="_blank"
                  className="text-sky-500 hover:text-sky-700 transition-colors"
                >
                  <FaTwitter size={22} />
                </a>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
