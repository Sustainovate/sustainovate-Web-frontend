import React from 'react'

export default function ImgGal() {
    return (
        <section className="relative z-10 container mx-auto px-6 py-16">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                    Our Impact in Action
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    See how our community is creating positive change every day
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
                <div className="group relative overflow-hidden rounded-2xl h-64 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <img
                        src="https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400"
                        alt="Community gardening"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="group relative overflow-hidden rounded-2xl h-64 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <img
                        src="https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=400"
                        alt="Recycling"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="group relative overflow-hidden rounded-2xl h-64 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <img
                        src="https://images.pexels.com/photos/1268975/pexels-photo-1268975.jpeg?auto=compress&cs=tinysrgb&w=400"
                        alt="Solar energy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="group relative overflow-hidden rounded-2xl h-64 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <img
                        src="https://images.pexels.com/photos/1295138/pexels-photo-1295138.jpeg?auto=compress&cs=tinysrgb&w=400"
                        alt="Nature conservation"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
            </div>
        </section>
    )
}
