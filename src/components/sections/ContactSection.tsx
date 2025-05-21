'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      // Reset form after showing success message
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setSubmitted(false);
      }, 3000);
    }, 1500);
  };

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
            Let&apos;s Collaborate
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#7000FF] to-[#00FFFF] mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-6">Connect With Me</h3>
            
            <p className="text-neutral-300 mb-8">
              I&apos;m always interested in new opportunities, collaborations, and conversations about AI, machine learning, and technology. Feel free to reach out through any of the channels below or using the contact form.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#7000FF]/20 flex items-center justify-center text-xl text-[#00FFFF]">
                  <FaEnvelope />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <a 
                    href="mailto:mayurpatil5204@outlook.com" 
                    className="text-neutral-300 hover:text-[#00FFFF] transition-colors"
                  >
                    mayurpatil5204@outlook.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#7000FF]/20 flex items-center justify-center text-xl text-[#00FFFF]">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p className="text-neutral-300">Pune, Maharashtra, India</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Social Media</h4>
                <div className="flex gap-4">
                  <a 
                    href="https://github.com/mayur5204" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="w-12 h-12 rounded-full bg-[#7000FF]/20 flex items-center justify-center text-xl text-white hover:bg-[#7000FF]/40 transition-colors"
                  >
                    <FaGithub />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/mayur5204" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="w-12 h-12 rounded-full bg-[#7000FF]/20 flex items-center justify-center text-xl text-white hover:bg-[#7000FF]/40 transition-colors"
                  >
                    <FaLinkedin />
                  </a>

                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-[#0A0A1B] p-6 md:p-8 rounded-xl border border-[#7000FF]/20"
          >
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-5xl text-[#00FFFF] mb-4">✓</div>
                <h4 className="text-2xl font-semibold mb-2">Message Sent!</h4>
                <p className="text-neutral-300">
                  Thanks for reaching out. I&apos;ll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-semibold mb-6">Send Me a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#030014] border border-[#7000FF]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00FFFF] focus:border-transparent transition-colors text-white"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#030014] border border-[#7000FF]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00FFFF] focus:border-transparent transition-colors text-white"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-[#030014] border border-[#7000FF]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00FFFF] focus:border-transparent transition-colors text-white resize-none"
                      placeholder="I'd like to discuss a potential project..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-[#7000FF] to-[#00FFFF] text-white font-medium hover:opacity-90 transition-all disabled:opacity-70 flex items-center justify-center"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
