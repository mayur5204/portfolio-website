'use client';

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroBrain from "@/components/3d/HeroBrain";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import AISection from "@/components/sections/AISection";
import ContactSection from "@/components/sections/ContactSection";
import LoadingWrapper from "@/components/layout/LoadingWrapper";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Home() {
  return (
    <LoadingWrapper>
      <div className="min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex flex-col items-center justify-center">
          {/* 3D Brain Background */}
          <HeroBrain />

          {/* Hero Content */}
          <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
              <span className="block">Mayur Patil</span>
              <span className="bg-gradient-to-r from-[#7000FF] via-[#00FFFF] to-[#FF007A] bg-clip-text text-transparent">
                AI & ML Engineer
              </span>
            </h1>

            <p className="text-lg md:text-xl max-w-2xl mb-8 text-neutral-300">
              Building intelligent systems and exploring the frontiers of AI technology.
              3rd year engineering student passionate about machine learning and creative coding.
            </p>

            <div className="flex gap-6 mb-12">
              <a
                href="https://github.com/mayur5204"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-[#7000FF] transition-colors"
                aria-label="GitHub Profile"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/mayur5204"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-[#00FFFF] transition-colors"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin />
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#7000FF] to-[#00FFFF] text-white font-medium hover:opacity-90 transition-opacity"
              >
                Get in Touch
              </a>
              <a
                href="#projects"
                className="px-6 py-3 rounded-full border border-[#7000FF] text-white font-medium hover:bg-[#7000FF]/10 transition-colors"
              >
                View Projects
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            <span className="text-sm text-neutral-400 mb-2">Scroll Down</span>
            <div className="w-6 h-10 border-2 border-neutral-400 rounded-full flex justify-center">
              <div className="w-1 h-2 bg-white rounded-full animate-bounce mt-2"></div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <AboutSection />

        {/* Projects Section */}
        <ProjectsSection />

        {/* AI + You Section */}
        <AISection />

        {/* Contact Section */}
        <ContactSection />

        {/* Footer */}
        <Footer />
      </div>
    </LoadingWrapper>
  );
}
