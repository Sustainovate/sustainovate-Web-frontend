"use client";

import React from "react";

export default function MenuItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-white/5 transition"
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
