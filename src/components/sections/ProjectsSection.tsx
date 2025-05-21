'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: "AI Image Generation System",
    description: "A deep learning model that generates realistic images from text prompts using a custom GAN architecture with attention mechanisms.",
    image: "/project1.jpg",
    technologies: ["Python", "PyTorch", "TensorFlow", "React"],
    githubUrl: "https://github.com/mayur5204/ai-image-gen",
    liveUrl: "https://ai-image-gen-demo.vercel.app",
    featured: true
  },
  {
    id: 2,
    title: "Neural Network Visualizer",
    description: "Interactive 3D visualization tool for neural networks that helps users understand how deep learning models process and transform data.",
    image: "/project2.jpg",
    technologies: ["JavaScript", "Three.js", "React", "TensorFlow.js"],
    githubUrl: "https://github.com/mayur5204/nn-visualizer",
    liveUrl: "https://nn-visualizer.vercel.app",
    featured: true
  },
  {
    id: 3,
    title: "Sentiment Analysis API",
    description: "Real-time sentiment analysis API that processes text and social media data to determine emotional tone and intent using transformer models.",
    image: "/project3.jpg",
    technologies: ["Python", "FastAPI", "Hugging Face", "Docker"],
    githubUrl: "https://github.com/mayur5204/sentiment-api",
    featured: false
  },
  {
    id: 4,
    title: "Reinforcement Learning Environment",
    description: "Custom reinforcement learning environment for testing and benchmarking different RL algorithms in simulated robotics tasks.",
    image: "/project4.jpg",
    technologies: ["Python", "PyTorch", "Gymnasium", "NumPy"],
    githubUrl: "https://github.com/mayur5204/rl-env",
    featured: true
  },
  {
    id: 5,
    title: "Speech Emotion Recognition",
    description: "System that identifies emotions in speech using a combination of traditional ML and deep learning techniques with audio processing.",
    image: "/project5.jpg", 
    technologies: ["Python", "TensorFlow", "Librosa", "Scikit-learn"],
    githubUrl: "https://github.com/mayur5204/speech-emotion",
    featured: false
  },
  {
    id: 6,
    title: "Automated ML Pipeline",
    description: "End-to-end machine learning pipeline that automates data preprocessing, feature engineering, model selection, and hyperparameter tuning.",
    image: "/project6.jpg",
    technologies: ["Python", "MLflow", "Scikit-learn", "Pandas"],
    githubUrl: "https://github.com/mayur5204/auto-ml-pipeline",
    featured: false
  }
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`bg-[#0A0A1B] rounded-xl overflow-hidden border border-[#7000FF]/20 hover:border-[#7000FF] transition-all duration-300 h-full flex flex-col ${
        project.featured ? 'md:col-span-2' : ''
      }`}
    >
      <div className="relative h-48 overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-t from-[#030014] to-transparent z-10 opacity-60 group-hover:opacity-30 transition-opacity"></div>
        <div 
          className="w-full h-full bg-[#121212] bg-gradient-to-br from-[#7000FF]/20 to-[#00FFFF]/20"
          style={{
            backgroundImage: `url(${project.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <p className="text-neutral-300 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, i) => (
            <span key={i} className="text-xs py-1 px-2 rounded-full bg-[#7000FF]/20 text-[#00FFFF]">
              {tech}
            </span>
          ))}
        </div>
        
        <div className="mt-auto flex space-x-4">
          <a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-white hover:text-[#7000FF] transition-colors"
          >
            <FaGithub /> Code
          </a>
          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-white hover:text-[#00FFFF] transition-colors"
            >
              <FaExternalLinkAlt /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const [filter, setFilter] = useState<'all' | 'featured'>('all');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.featured);
  
  const filterButtonVariants = {
    active: {
      backgroundColor: 'rgba(112, 0, 255, 0.8)',
      color: 'white',
      scale: 1.05,
      transition: { duration: 0.3 }
    },
    inactive: {
      backgroundColor: 'rgba(112, 0, 255, 0.1)',
      color: 'white',
      scale: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section id="projects" className="py-24 relative">
      <div ref={sectionRef} className="container mx-auto px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h4 className="text-md font-medium text-[#00FFFF] mb-2">MY WORK</h4>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Projects & Experiments
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#7000FF] to-[#00FFFF] mx-auto"></div>
          <p className="mt-6 max-w-2xl mx-auto text-neutral-300">
            Explore my collection of projects focused on AI, machine learning, and creative coding. 
            Each project represents my exploration of new technologies and concepts.
          </p>
        </motion.div>
        
        {/* Filter buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <motion.button
            variants={filterButtonVariants}
            animate={filter === 'all' ? 'active' : 'inactive'}
            onClick={() => setFilter('all')}
            className="px-6 py-2 rounded-full"
          >
            All Projects
          </motion.button>
          <motion.button
            variants={filterButtonVariants}
            animate={filter === 'featured' ? 'active' : 'inactive'}
            onClick={() => setFilter('featured')}
            className="px-6 py-2 rounded-full"
          >
            Featured
          </motion.button>
        </div>
        
        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        
        {/* More projects link */}
        <div className="text-center mt-12">
          <a 
            href="https://github.com/mayur5204"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#00FFFF] hover:text-white transition-colors"
          >
            <span>View more on GitHub</span>
            <FaGithub />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
