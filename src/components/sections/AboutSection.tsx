'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaLaptopCode, FaBrain, FaRobot, FaDatabase } from 'react-icons/fa';
import gsap from 'gsap';

interface SkillItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const SkillItem = ({ icon, title, description, delay }: SkillItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className="bg-[#0A0A1B] p-6 rounded-xl border border-[#7000FF]/20 hover:border-[#7000FF]/50 transition-all"
    >
      <div className="mb-4 text-3xl text-[#00FFFF]">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-neutral-400">{description}</p>
    </motion.div>
  );
};

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  
  // Timeline animation with GSAP
  useEffect(() => {
    if (!isInView || !timelineRef.current) return;
    
    const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
    
    gsap.fromTo(
      timelineItems,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.3,
        duration: 0.8,
        ease: "power2.out"
      }
    );
  }, [isInView]);

  // Heading animation
  useEffect(() => {
    if (!isInView || !headingRef.current) return;
    
    const chars = headingRef.current.innerText.split('');
    headingRef.current.innerHTML = '';
    
    chars.forEach((char, index) => {
      const span = document.createElement('span');
      span.innerText = char;
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      span.style.display = char === ' ' ? 'inline-block' : 'inline-block';
      span.style.width = char === ' ' ? '0.5em' : 'auto';
      span.style.transition = `all 0.5s ${index * 0.03}s ease`;
      headingRef.current?.appendChild(span);
    });
    
    setTimeout(() => {
      const spans = headingRef.current?.querySelectorAll('span');
      spans?.forEach(span => {
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
      });
    }, 100);
  }, [isInView]);

  const skills = [
    {
      icon: <FaLaptopCode />,
      title: "Software Development",
      description: "Proficient in Python, TypeScript, and C++. Experienced with web development using React and Next.js.",
      delay: 0.1
    },
    {
      icon: <FaBrain />,
      title: "Machine Learning",
      description: "Implemented various ML algorithms and models using TensorFlow, PyTorch, and scikit-learn.",
      delay: 0.2
    },
    {
      icon: <FaRobot />,
      title: "AI Systems",
      description: "Experience building conversational AI, recommendation systems, and computer vision applications.",
      delay: 0.3
    },
    {
      icon: <FaDatabase />,
      title: "Data Processing",
      description: "Skilled in data cleaning, visualization, and analysis using Pandas, NumPy, and other data tools.",
      delay: 0.4
    }
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h4 className="text-md font-medium text-[#00FFFF] mb-2">ABOUT ME</h4>
          <h2 ref={headingRef} className="text-4xl md:text-5xl font-bold mb-4">
            My Journey & Expertise
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#7000FF] to-[#00FFFF] mx-auto"></div>
        </motion.div>

        {/* Bio section */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-4">Who Am I?</h3>
            <p className="text-neutral-300 mb-4">
              I&apos;m Mayur Machhindra Patil, a 3rd-year AI & ML Engineering student passionate about pushing the boundaries of what&apos;s possible with artificial intelligence.
            </p>
            <p className="text-neutral-300 mb-6">
              My fascination with AI began when I first encountered machine learning algorithms during my freshman year. Since then, I&apos;ve been on a mission to develop solutions that combine cutting-edge AI research with practical applications.
            </p>
            <p className="text-neutral-300">
              When I&apos;m not coding or training models, you can find me exploring the latest research papers, contributing to open-source projects, or mentoring fellow students in AI development.
            </p>
          </motion.div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-6">My Journey</h3>
            <div ref={timelineRef} className="relative border-l-2 border-[#7000FF] pl-8 ml-4">
              <div className="timeline-item mb-8 relative">
                <div className="absolute -left-[41px] w-6 h-6 rounded-full bg-[#00FFFF] border-4 border-[#030014] z-10"></div>
                <h4 className="text-lg font-medium text-[#00FFFF]">2022 - Present</h4>
                <p className="font-semibold">AI & ML Engineering</p>
                <p className="text-neutral-400">Indian Institute of Technology</p>
              </div>
              <div className="timeline-item mb-8 relative">
                <div className="absolute -left-[41px] w-6 h-6 rounded-full bg-[#00FFFF] border-4 border-[#030014] z-10"></div>
                <h4 className="text-lg font-medium text-[#00FFFF]">2023 - 2024</h4>
                <p className="font-semibold">ML Research Intern</p>
                <p className="text-neutral-400">AI Research Lab</p>
              </div>
              <div className="timeline-item mb-8 relative">
                <div className="absolute -left-[41px] w-6 h-6 rounded-full bg-[#00FFFF] border-4 border-[#030014] z-10"></div>
                <h4 className="text-lg font-medium text-[#00FFFF]">2022 - 2023</h4>
                <p className="font-semibold">Software Development Intern</p>
                <p className="text-neutral-400">Tech Innovation Inc</p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <h3 className="text-2xl font-semibold mb-8 text-center">My Skills & Expertise</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <SkillItem 
              key={index} 
              icon={skill.icon} 
              title={skill.title} 
              description={skill.description} 
              delay={skill.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
