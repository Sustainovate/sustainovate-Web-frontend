import React from "react"

export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      {/* Leaf or eco-inspired circle */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-green-500 to-emerald-400 flex items-center justify-center text-white font-bold">
        S
      </div>
      {/* Brand name */}
      <span className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
        Sustainovate
      </span>
    </div>
  )
}
