'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaCode, FaRobot, FaMagic, FaBrain, FaLightbulb, FaTools } from 'react-icons/fa';
import gsap from 'gsap';

const AISection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const codeBlockRef = useRef<HTMLPreElement>(null);
  
  // Create typing effect for code block
  useEffect(() => {
    if (!isInView || !codeBlockRef.current) return;
    
    const codeElement = codeBlockRef.current;
    const codeText = `// Using VS Code Agent to generate a 3D AI-powered portfolio
import { VSCodeAgent } from '@agents/vscode';
import { ThreeJS, ReactThreeFiber } from '@3d/engines';

const Portfolio = async () => {
  // Initialize VS Code Agent
  const agent = new VSCodeAgent({
    prompt: "Create a 3D AI portfolio website",
    tools: ['react', 'three.js', 'gsap', 'framer-motion']
  });
  
  // Generate components and structure with AI
  const components = await agent.generateCode({
    layout: ['Navbar', 'Hero', 'About', 'Projects'],
    features: {
      animation: true,
      3d: true,
      responsive: true
    }
  });
  
  // Assemble and deploy
  return new Portfolio({
    components,
    style: 'futuristic',
    performance: 'optimized'
  });
};

// Execute
Portfolio().then(site => site.deploy());`;
    
    // Reset the content
    codeElement.textContent = '';
    
    // Set up GSAP animation for typing effect
    const characters = codeText.split('');
    let currentIndex = 0;
    
    gsap.to({}, {
      duration: 5,
      onUpdate: function() {
        const progress = this.progress();
        const newIndex = Math.floor(characters.length * progress);
        
        if (newIndex > currentIndex) {
          for (let i = currentIndex; i < newIndex; i++) {
            if (codeElement) {
              codeElement.textContent += characters[i];
            }
          }
          currentIndex = newIndex;
        }
      }
    });
    
  }, [isInView]);

  const featureItems = [
    {
      icon: <FaRobot />,
      title: "Code Generation",
      description: "VS Code Agent generated the scaffolding and base components of this portfolio, including 3D visualizations and layouts."
    },
    {
      icon: <FaBrain />,
      title: "AI Design Assistance",
      description: "The color schemes, animations, and UI elements were suggested and improved through AI-powered design recommendations."
    },
    {
      icon: <FaCode />,
      title: "Problem Solving",
      description: "When facing challenges with Three.js integration, AI provided solutions and optimizations for better performance."
    },
    {
      icon: <FaMagic />,
      title: "Creative Collaboration",
      description: "The portfolio represents a synergy between human creativity and AI capabilities, demonstrating the power of collaboration."
    },
    {
      icon: <FaLightbulb />,
      title: "Ideation",
      description: "Many features of this site were brainstormed through AI-assisted ideation, expanding the creative possibilities."
    },
    {
      icon: <FaTools />,
      title: "Refactoring & Optimization",
      description: "AI helped identify and fix performance issues, improve code quality, and suggest better architectural patterns."
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <section 
      id="ai-you" 
      ref={sectionRef}
      className="py-24 relative bg-[#05051A] overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#7000FF]/20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#00FFFF]/10 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h4 className="text-md font-medium text-[#00FFFF] mb-2">AI + YOU</h4>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How This Portfolio Was Built With AI
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#7000FF] to-[#00FFFF] mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-semibold mb-4">VS Code Agent Collaboration</h3>
            <p className="text-neutral-300 mb-6">
              This entire portfolio was created in collaboration with VS Code Agent, showcasing how AI and human creativity can work together to build impressive projects.
            </p>
            <p className="text-neutral-300 mb-6">
              From generating the initial code structure to creating complex 3D visualizations with Three.js, AI acted as a pair programmer, design consultant, and problem solver throughout the development process.
            </p>
            <p className="text-neutral-300">
              The result demonstrates how AI can enhance human capabilities and accelerate the development process without replacing the creative vision and technical decision-making that makes each project unique.
            </p>
          </div>
          
          <div className="bg-[#030014] rounded-lg border border-[#7000FF]/30 overflow-hidden shadow-lg">
            <div className="bg-[#0A0A1B] p-2 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-neutral-400 ml-2">portfolio-website.tsx</span>
            </div>
            <pre 
              ref={codeBlockRef} 
              className="p-6 text-sm font-mono text-[#00FFFF] overflow-x-auto"
            ></pre>
          </div>
        </div>
        
        <h3 className="text-2xl font-semibold mb-8 text-center">How AI Assisted This Project</h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureItems.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="bg-[#0A0A1B] p-6 rounded-lg border border-[#7000FF]/20"
            >
              <div className="text-3xl mb-4 text-[#00FFFF]">{item.icon}</div>
              <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
              <p className="text-neutral-400">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h4 className="text-xl font-semibold mb-4">Ready to Build Your AI-Powered Projects?</h4>
          <p className="text-neutral-300 max-w-2xl mx-auto mb-8">
            AI agents like GitHub Copilot and VS Code Agent are changing how developers work, allowing for faster development and more creative solutions.
          </p>
          <a 
            href="#contact"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#7000FF] to-[#00FFFF] text-white font-medium hover:opacity-90 transition-opacity"
          >
            Let&apos;s Collaborate
          </a>
        </div>
      </div>
    </section>
  );
};

export default AISection;
