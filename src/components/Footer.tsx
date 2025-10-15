export default function Footer() {
    return (
        <footer className="footer-section glass backdrop-blur-lg border-t border-emerald-200/40 text-gray-800 py-12 sm:py-16 lg:py-20 bg-white/30">
            <div className="footer-container max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
                <div className="footer-content flex flex-col md:flex-row justify-between gap-8 lg:gap-12">

                    {/* Brand Section */}
                    <div className="brand-section space-y-5">
                        <div className="brand-info flex items-center space-x-3">
                            <span className="brand-name text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                                Sustainovate
                            </span>
                        </div>
                        <p className="brand-description text-sm leading-relaxed max-w-md text-gray-600">
                            Innovating for a sustainable future through technology and collaboration.
                        </p>
                    </div>

                    {/* Contact Section */}
                    <div className="contact-section space-y-5">
                        <h3 className="section-title text-lg font-bold text-emerald-700">
                            Contact
                        </h3>
                        <div className="contact-info space-y-4">
                            <div className="contact-item text-sm">
                                <span className="contact-label text-gray-500">Email: </span>
                                <a
                                    href="mailto:sustainovate.tiu@gmail.com"
                                    className="contact-link text-teal-700 hover:text-green-600 transition-colors duration-300 hover:underline"
                                >
                                    sustainovate.tiu@gmail.com
                                </a>
                            </div>
                            <div className="contact-item text-sm">
                                <span className="contact-label text-gray-500">Phone: </span>
                                <span className="contact-info text-gray-700">
                                    +91 7439528452
                                </span>
                            </div>

                            {/* Social Icons */}
                            <div className="social-media flex flex-wrap items-center gap-4 pt-3">
                                <a
                                    href="https://www.instagram.com/sustainovate.tiu/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link p-3 rounded-xl border border-emerald-300/50 hover:bg-emerald-100/50 transition-all duration-300 hover:scale-105"
                                >
                                    <svg
                                        className="w-5 h-5 text-emerald-700"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/sustainovate-tiu/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link p-3 rounded-xl border border-emerald-300/50 hover:bg-emerald-100/50 transition-all duration-300 hover:scale-105"
                                >
                                    <svg
                                        className="w-5 h-5 text-teal-700"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Line */}
                <div className="footer-bottom border-t border-emerald-200/40 mt-10 pt-6 text-center">
                    <p className="text-sm text-gray-500">
                        © 2025 <span className="font-semibold text-emerald-700">Sustainovate</span> by Green Tech. Ltd. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>

    )
}