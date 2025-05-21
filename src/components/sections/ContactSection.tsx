'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 relative"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030014] to-[#05051A] z-[-1]"></div>

      <div className="container mx-auto px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h4 className="text-md font-medium text-[#00FFFF] mb-2">GET IN TOUCH</h4>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let&apos;s Connect
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#7000FF] to-[#00FFFF] mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Email Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#0A0A1B] p-6 md:p-8 rounded-xl border border-[#7000FF]/20 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#7000FF]/20 flex items-center justify-center text-2xl text-[#00FFFF] mb-4">
              <FaEnvelope />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-neutral-400 mb-4">Drop me a message anytime</p>
            <a
              href="mailto:mayurpatil5204@outlook.com"
              className="text-[#00FFFF] hover:underline transition-all font-medium"
            >
              mayurpatil5204@outlook.com
            </a>
          </motion.div>

          {/* GitHub Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[#0A0A1B] p-6 md:p-8 rounded-xl border border-[#7000FF]/20 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#7000FF]/20 flex items-center justify-center text-2xl text-[#00FFFF] mb-4">
              <FaGithub />
            </div>
            <h3 className="text-xl font-semibold mb-2">GitHub</h3>
            <p className="text-neutral-400 mb-4">Check out my code and projects</p>
            <a
              href="https://github.com/mayur5204"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00FFFF] hover:underline transition-all font-medium"
            >
              github.com/mayur5204
            </a>
          </motion.div>

          {/* LinkedIn Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-[#0A0A1B] p-6 md:p-8 rounded-xl border border-[#7000FF]/20 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#7000FF]/20 flex items-center justify-center text-2xl text-[#00FFFF] mb-4">
              <FaLinkedin />
            </div>
            <h3 className="text-xl font-semibold mb-2">LinkedIn</h3>
            <p className="text-neutral-400 mb-4">Connect professionally</p>
            <a
              href="https://www.linkedin.com/in/mayur5204"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00FFFF] hover:underline transition-all font-medium"
            >
              linkedin.com/in/mayur5204
            </a>
          </motion.div>
        </div>

        {/* Additional contact message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-neutral-300 max-w-2xl mx-auto">
            I&apos;m always interested in new opportunities, collaborations, and conversations about AI, machine learning, and technology.
            Feel free to reach out through any of the channels above!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
