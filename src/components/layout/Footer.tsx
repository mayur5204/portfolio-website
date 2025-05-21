'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#030014] border-t border-[#7000FF]/20 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and tagline */}
          <div className="md:col-span-2">
            <Link href="#home">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#7000FF] via-[#00FFFF] to-[#FF007A] bg-clip-text text-transparent mb-3">
                Mayur.Dev
              </h1>
            </Link>
            <p className="text-neutral-400 mb-4">
              AI & ML Engineer crafting intelligent systems and exploring the frontiers of artificial intelligence.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/mayur5204"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="text-neutral-400 hover:text-[#7000FF] transition-colors"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/mayur5204"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="text-neutral-400 hover:text-[#00FFFF] transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#home"
                  className="text-neutral-400 hover:text-[#00FFFF] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="text-neutral-400 hover:text-[#00FFFF] transition-colors"
                >
                  About Me
                </Link>
              </li>
              <li>
                <Link
                  href="#projects"
                  className="text-neutral-400 hover:text-[#00FFFF] transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="#ai-you"
                  className="text-neutral-400 hover:text-[#00FFFF] transition-colors"
                >
                  AI + You
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-neutral-400">
                Pune, Maharashtra, India
              </li>
              <li>
                <a
                  href="mailto:mayurpatil5204@outlook.com"
                  className="text-neutral-400 hover:text-[#00FFFF] transition-colors"
                >
                  mayurpatil5204@outlook.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#7000FF]/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Mayur Patil. All rights reserved.
          </p>

          <motion.p
            className="text-neutral-500 text-sm flex items-center"
            initial={{ opacity: 0.6 }}
            whileHover={{ opacity: 1 }}
          >
            Made with
            <motion.span
              className="text-[#FF007A] mx-1"
              animate={{
                scale: [1, 1.2, 1],
                transition: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 1.5
                }
              }}
            >
              <FaHeart />
            </motion.span>
            and AI
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
