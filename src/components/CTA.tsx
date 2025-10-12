import { Sparkles } from 'lucide-react'
import React from 'react'

export default function CTA() {
    return (
        <section className="relative z-10 container mx-auto px-6 py-20">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 rounded-3xl overflow-hidden shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-12 md:p-16 text-white relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

                        <div className="relative z-10">
                            <Sparkles className="w-12 h-12 mb-6 animate-pulse" />
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                Ready to Make a Difference?
                            </h2>
                            <p className="text-xl mb-8 text-green-50">
                                Join our vibrant community of eco-warriors and start your journey towards a more sustainable lifestyle today.
                            </p>
                            <button className="px-10 py-4 bg-white text-green-700 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                                Become a Member
                            </button>
                        </div>
                    </div>

                    <div className="relative h-64 md:h-auto">
                        <img
                            src="https://tourscanner.com/blog/wp-content/uploads/ghost-move/ghost/IMG-Worlds-of-Adventure-in-Dubai.jpg"
                            alt="Join us"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-green-600/20"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}
