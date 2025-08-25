import ExploreDomains from "@/components/Domains";
import WhatIsSustainovate from "@/components/Sustainovate";
import TeamSection from "@/components/Team";

export default function Home() {
  return (
    <>
      <main className="hero-section relative overflow-hidden" aria-label="Hero section">
        <div className="hero-container max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-12 sm:py-16 lg:py-20">
          <div className="hero-content grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* Content Area */}
            <div className="content-area space-y-8 sm:space-y-12 lg:space-y-16">
              <h1 className="main-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="heading-sustain bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent drop-shadow-2xl">Sustain</span>
                <span className="heading-ovate bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl">ovate</span>
              </h1>

              <p className="description-text text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl">
                Sustainovate is a platform dedicated to inspiring and enabling people to integrate sustainable, innovative practices into daily life. It envisions a world where eco-friendly living is effortless, powered by creativity, technology, and community action for a greener future.
              </p>

              <div className="cta-buttons flex justify-start">
                <a
                  href="#SUSTAINOVATE"
                  className="cta-primary glass border-2 border-purple-500/50 text-white hover:bg-purple-500/20 px-8 py-4 rounded-xl text-lg font-bold shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 text-center inline-block glow-hover"
                >
                  Learn More
                </a>
              </div>
            </div>

            {/* Visual Area */}
            <div className="visual-area hidden lg:block">
              <div className="glass rounded-3xl p-8 backdrop-blur-xl border border-purple-500/30 shadow-2xl">
                <div className="h-64 bg-gradient-to-br from-purple-500/20 to-green-500/20 rounded-2xl flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-400 to-purple-500 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Innovation</h3>
                    <p className="text-gray-300">Building tomorrow's sustainable future</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Background Decorations */}
        <div className="bg-decorations absolute inset-0 overflow-hidden pointer-events-none">
          <div className="decoration-top absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-green-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="decoration-right absolute top-1/2 -right-40 w-96 h-96 bg-gradient-to-l from-green-500/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="decoration-bottom absolute -bottom-20 left-1/3 w-64 h-64 bg-gradient-to-t from-purple-300/15 to-green-300/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="decoration-center absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-br from-green-200/20 to-purple-200/20 rounded-full blur-2xl"></div>
          <div className="decoration-accent absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-tl from-purple-200/15 to-green-200/15 rounded-full blur-3xl"></div>
        </div>

        {/* Floating particles effect */}
        <div className="particles absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-purple-400/30 rounded-full animate-bounce`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </main>


      {/* sustainovate */}
      <WhatIsSustainovate/>


      {/* domain */}
      <ExploreDomains/>


      {/* members */}
      <TeamSection/>

      {/* footer */}
      <footer className="footer-section glass backdrop-blur-xl border-t border-purple-500/20 text-gray-200 py-16 sm:py-20">
        <div className="footer-container max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="footer-content grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="brand-section space-y-6">
              <div className="brand-info flex items-center space-x-3">
                <span className="brand-name text-2xl font-bold bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text text-transparent">
                  Sustainovate
                </span>
              </div>
              <p className="brand-description text-sm leading-relaxed max-w-md text-gray-300">
                Innovating for a sustainable future through technology and collaboration.
              </p>
            </div>
            <div className="quick-links-section space-y-6">
              <h3 className="section-title text-lg font-bold text-white">
                Quick Links
              </h3>
              <nav className="links-nav">
                <ul className="links-list space-y-3">
                  <li>
                    <a href="#home" className="footer-link text-gray-300 hover:text-purple-400 transition-colors duration-300 hover:underline">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="Events.html" className="footer-link text-gray-300 hover:text-purple-400 transition-colors duration-300 hover:underline">
                      Events
                    </a>
                  </li>
                  <li>
                    <a href="Leaderboard.html" className="footer-link text-gray-300 hover:text-purple-400 transition-colors duration-300 hover:underline">
                      Leaderboard
                    </a>
                  </li>
                  <li>
                    <a href="#login" className="footer-link text-gray-300 hover:text-purple-400 transition-colors duration-300 hover:underline">
                      Login
                    </a>
                  </li>
                  <li>
                    <a href="#user" className="footer-link text-gray-300 hover:text-purple-400 transition-colors duration-300 hover:underline">
                      User
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="contact-section space-y-6">
              <h3 className="section-title text-lg font-bold text-white">
                Contact
              </h3>
              <div className="contact-info space-y-4">
                <div className="contact-item">
                  <span className="contact-label text-sm text-gray-400">Email: </span>
                  <a href="mailto:sustainovate.tiu@gmail.com" className="contact-link text-purple-400 hover:text-green-400 transition-colors duration-300 hover:underline">
                    sustainovate.tiu@gmail.com
                  </a>
                </div>
                <div className="contact-item">
                  <span className="contact-label text-sm text-gray-400">Phone: </span>
                  <span className="contact-info text-gray-300">+91 7439528452</span>
                </div>
                <div className="social-media flex items-center space-x-4 pt-2">
                  <a
                    href="https://www.instagram.com/sustainovate.tiu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link glass p-3 rounded-xl transition-all duration-300 transform hover:scale-110 glow-hover border border-purple-500/20"
                  >
                    <svg className="w-5 h-5 text-gray-300 hover:text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/sustainovate-tiu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link glass p-3 rounded-xl transition-all duration-300 transform hover:scale-110 glow-hover border border-purple-500/20"
                  >
                    <svg className="w-5 h-5 text-gray-300 hover:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

          </div>
          <div className="footer-bottom border-t border-purple-500/20 mt-12 pt-8 text-center">
            <p className="copyright text-sm text-gray-400">
              © 2025 Sustainovate by NexIntel Synergy Pvt. Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
