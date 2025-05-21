'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

// Text animation component for percentage
const ProgressText: React.FC<{
    percentages: string[];
    duration: number;
    className?: string;
}> = ({ percentages, duration, className }) => {
    const [currentText, setCurrentText] = useState(percentages[0]);

    useEffect(() => {
        if (!percentages.length) return;

        const totalSteps = percentages.length - 1;
        const stepDuration = duration / totalSteps;

        // Create timeline for text updates
        const timeline = gsap.timeline();

        // Setup animations for each step
        percentages.forEach((percentage, index) => {
            if (index === 0) return; // Skip first item as it's the initial state

            timeline.to({}, {
                duration: stepDuration,
                onComplete: () => setCurrentText(percentage)
            }, index * stepDuration);
        });

        return () => {
            timeline.kill();
        };
    }, [percentages, duration]);

    return <span className={className}>{currentText}</span>;
};

interface LoadingScreenProps {
    minimumLoadTimeMs?: number;  // Minimum time to show loading screen
    loading?: boolean;           // Control loading state from outside
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
    minimumLoadTimeMs = 3800,
    loading = true
}) => {
    const particlesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Only run on client side to avoid hydration errors
        if (typeof window === 'undefined' || !loading) return;

        // GSAP animations for sci-fi effect
        const masterTl = gsap.timeline();

        // Rotating logo animation
        masterTl.to('.loading-brain', {
            rotation: 360,
            duration: 8,
            ease: 'linear',
            repeat: -1
        }, 0);

        // Outer rings animation
        masterTl.to('.outer-ring', {
            rotation: -360,
            duration: 12,
            ease: 'linear',
            repeat: -1
        }, 0);

        masterTl.to('.middle-ring', {
            rotation: 180,
            duration: 10,
            ease: 'linear',
            repeat: -1
        }, 0);

        // Create particles for sci-fi effect
        if (particlesRef.current) {
            const container = particlesRef.current;

            // Clear existing particles
            container.innerHTML = '';

            // Create particles
            for (let i = 0; i < 40; i++) {
                const particle = document.createElement('div');
                const size = Math.random() * 4 + 1;

                // Random position around the circle
                const radius = 140 + Math.random() * 60;
                const angle = Math.random() * Math.PI * 2;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                // Apply styles
                particle.style.position = 'absolute';
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.borderRadius = '50%';
                particle.style.left = '50%';
                particle.style.top = '50%';
                particle.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;

                // Random color from palette
                const colors = ['#7000FF', '#00FFFF', '#FF007A', '#FFFFFF'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                particle.style.backgroundColor = color;
                particle.style.opacity = `${Math.random() * 0.7 + 0.3}`;

                container.appendChild(particle);

                // Animate each particle with GSAP
                gsap.to(particle, {
                    x: `+=${(Math.random() - 0.5) * 30}`,
                    y: `+=${(Math.random() - 0.5) * 30}`,
                    opacity: Math.random() * 0.5 + 0.1,
                    duration: Math.random() * 2 + 1,
                    repeat: -1,
                    yoyo: true,
                    ease: 'power2.inOut' // Fixed invalid easing type
                });
            }
        }

        // Generate background particles
        const particlesContainer = document.getElementById('particles-container');
        if (particlesContainer) {
            // Clear any existing particles
            particlesContainer.innerHTML = '';

            // Create fixed number of particles
            for (let i = 0; i < 15; i++) {
                const particle = document.createElement('div');

                // Position using predefined coordinates based on index
                const positions = [
                    { left: '10%', top: '20%' },
                    { left: '25%', top: '80%' },
                    { left: '40%', top: '35%' },
                    { left: '60%', top: '70%' },
                    { left: '75%', top: '15%' },
                    { left: '90%', top: '45%' },
                    { left: '15%', top: '55%' },
                    { left: '35%', top: '90%' },
                    { left: '50%', top: '25%' },
                    { left: '70%', top: '50%' },
                    { left: '85%', top: '85%' },
                    { left: '5%', top: '40%' },
                    { left: '30%', top: '60%' },
                    { left: '55%', top: '10%' },
                    { left: '80%', top: '30%' }
                ];

                const position = positions[i % positions.length];

                // Set styles
                particle.className = 'absolute rounded-full w-1 h-1 bg-[#00FFFF]';
                particle.style.left = position.left;
                particle.style.top = position.top;
                particle.style.opacity = '0';

                particlesContainer.appendChild(particle);

                // Animate with GSAP
                gsap.to(particle, {
                    opacity: 0.8,
                    scale: 1.5,
                    duration: 1,
                    repeat: -1,
                    yoyo: true,
                    delay: i * 0.2,
                    ease: 'power2.inOut'
                });
            }
        }

        return () => {
            masterTl.kill();
            gsap.killTweensOf('.particle');
        };
    }, [loading]);

    // Characters for the name text animation
    const nameText = "MAYUR PATIL";
    const roleText = "AI & ML ENGINEER";

    return (
        <AnimatePresence mode="wait">
            {loading && (
                <motion.div
                    key="loading-screen"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.8, ease: [0.45, 0, 0.55, 1] }
                    }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030014] overflow-hidden"
                >
                    {/* Neural network background lines - creates a matrix/grid effect */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="grid-bg w-full h-full"
                            style={{
                                backgroundImage: `
                                    linear-gradient(to right, rgba(112, 0, 255, 0.1) 1px, transparent 1px),
                                    linear-gradient(to bottom, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
                                `,
                                backgroundSize: '40px 40px'
                            }}
                        />
                    </div>

                    {/* Scanner light effect */}
                    <motion.div
                        className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-[rgba(0,255,255,0.03)] to-transparent"
                        animate={{
                            y: ['-100%', '100%'],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 2.5,
                            ease: 'linear'
                        }}
                    />

                    {/* Fixed position particles in background */}
                    <div id="particles-container" className="absolute inset-0 overflow-hidden">
                        {/* Particles will be added by useEffect client-side only */}
                    </div>

                    {/* Main loading animation - futuristic orb */}
                    <div className="relative" style={{ width: '300px', height: '300px' }}>
                        {/* Dynamic particles */}
                        <div ref={particlesRef} className="absolute inset-0" />

                        {/* Outer animated rings */}
                        <motion.div
                            className="outer-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full"
                            style={{
                                background: 'linear-gradient(90deg, transparent 50%, rgba(0, 255, 255, 0.5) 60%, transparent 70%)',
                                boxShadow: '0 0 30px rgba(0, 255, 255, 0.2)'
                            }}
                        />

                        <motion.div
                            className="middle-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full"
                            style={{
                                background: 'linear-gradient(210deg, transparent 40%, rgba(255, 0, 122, 0.5) 50%, transparent 60%)',
                                boxShadow: '0 0 30px rgba(255, 0, 122, 0.2)'
                            }}
                        />

                        {/* Rotating light beams */}
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px]"
                            style={{
                                transform: `translate(-50%, -50%) rotate(0deg)`,
                                filter: 'blur(4px)'
                            }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                                <div
                                    key={`beam-${i}`}
                                    className="absolute top-1/2 left-1/2 w-[5px] h-[120px] bg-gradient-to-t from-[#00FFFF] via-[rgba(112,0,255,0.3)] to-transparent"
                                    style={{
                                        transformOrigin: 'bottom center',
                                        transform: `translate(-50%, -100%) rotate(${angle}deg)`
                                    }}
                                />
                            ))}
                        </motion.div>

                        {/* Energy field effect */}
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] rounded-full opacity-70"
                            style={{
                                background: 'radial-gradient(circle, rgba(112, 0, 255, 0.8) 0%, rgba(0, 255, 255, 0.4) 50%, transparent 70%)'
                            }}
                            animate={{
                                opacity: [0.4, 0.8, 0.4],
                                scale: [0.9, 1.1, 0.9]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Core with logo */}
                        <div className="w-32 h-32 relative loading-brain flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full border-t-4 border-b-4 border-[#00FFFF] opacity-80"
                                style={{ filter: 'blur(1px)' }}
                            />
                            <div className="absolute inset-0 rounded-full border-l-4 border-r-4 border-[#7000FF] opacity-80"
                                style={{ filter: 'blur(1px)' }}
                            />

                            {/* Digital scan effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(0,255,255,0.15)] to-transparent"
                                style={{ height: '200%', top: '-50%' }}
                                animate={{ y: ['0%', '100%', '0%'] }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear",
                                    times: [0, 0.5, 1]
                                }}
                            />

                            {/* Main logo */}
                            <motion.div
                                className="w-24 h-24 rounded-full flex items-center justify-center relative bg-[#030014] z-10"
                                style={{
                                    boxShadow: 'inset 0 0 20px rgba(112, 0, 255, 0.5), 0 0 30px rgba(0, 255, 255, 0.5)'
                                }}
                                initial={{ scale: 0.8 }}
                                animate={{ scale: [0.85, 1, 0.85] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                {/* Digital circuit lines */}
                                <div className="absolute inset-0 rounded-full overflow-hidden opacity-20">
                                    <div className="w-full h-full" style={{
                                        backgroundImage: 'radial-gradient(circle, transparent 0%, transparent 70%, #00FFFF 71%, transparent 72%), linear-gradient(90deg, transparent 49%, #7000FF 50%, transparent 51%)',
                                        backgroundSize: '20px 20px, 10px 10px'
                                    }} />
                                </div>

                                {/* MP logo with holographic effect */}
                                <motion.div
                                    className="text-3xl font-bold relative"
                                    animate={{ textShadow: ['0 0 8px rgba(0,255,255,0.7)', '0 0 12px rgba(112,0,255,0.7)', '0 0 8px rgba(0,255,255,0.7)'] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <span className="bg-gradient-to-r from-[#7000FF] via-[#00FFFF] to-[#FF007A] bg-clip-text text-transparent relative z-10">MP</span>
                                    {/* Digital glitch effect */}
                                    <motion.span
                                        className="absolute inset-0 bg-gradient-to-r from-[#00FFFF] to-[#FF007A] bg-clip-text text-transparent opacity-70 z-0"
                                        style={{ filter: 'blur(4px)' }}
                                        animate={{ x: [-3, 0, 3, 0], opacity: [0.3, 0.7, 0.3] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        MP
                                    </motion.span>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Loading text with holographic effect */}
                    <div className="mt-12 relative">
                        {/* Digital noise overlay */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none noise-texture"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                                mixBlendMode: 'overlay'
                            }}
                        />

                        {/* Name text with futuristic typing effect */}
                        <div className="relative mb-2 overflow-hidden">
                            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#00FFFF] to-transparent mb-3" />

                            <div className="loading-text flex justify-center items-center space-x-2 text-xl sm:text-2xl font-bold h-10 overflow-hidden tracking-widest">
                                {/* Vertical scan line */}
                                <motion.div
                                    className="absolute h-full w-[2px] bg-[#00FFFF] opacity-70 z-10"
                                    animate={{
                                        left: ['-10%', '110%'],
                                        opacity: [0, 0.9, 0]
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        times: [0, 0.8, 1],
                                        repeat: Infinity,
                                        repeatDelay: 3
                                    }}
                                    style={{ filter: 'blur(2px)' }}
                                />

                                {/* Character animation */}
                                {nameText.split('').map((char, index) => (
                                    <motion.span
                                        key={`name-${index}`}
                                        initial={{ y: 40, opacity: 0, scale: 1.2 }}
                                        animate={{ y: 0, opacity: 1, scale: 1 }}
                                        transition={{
                                            duration: 0.4,
                                            ease: [0.215, 0.61, 0.355, 1],
                                            delay: 0.3 + index * 0.08
                                        }}
                                        className="inline-block relative"
                                        style={{ textShadow: '0 0 8px rgba(0, 255, 255, 0.6)' }}
                                    >
                                        {char === ' ' ? '\u00A0' : char}

                                        {/* Character glitch effect */}
                                        {char !== ' ' && (
                                            <motion.div
                                                className="absolute top-0 left-0 text-[#FF007A] opacity-0"
                                                animate={{
                                                    opacity: [0, 0.8, 0],
                                                    x: [0, -2, 0, 2, 0],
                                                    y: [0, 1, 0, -1, 0],
                                                }}
                                                transition={{
                                                    duration: 0.3,
                                                    repeat: Infinity,
                                                    repeatDelay: Math.random() * 5 + 5
                                                }}
                                                style={{ textShadow: '0 0 5px #FF007A' }}
                                            >
                                                {char}
                                            </motion.div>
                                        )}
                                    </motion.span>
                                ))}
                            </div>

                            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#00FFFF] to-transparent mt-3" />
                        </div>

                        {/* Subtitle with digital effect */}
                        <div className="relative">
                            <div className="loading-text flex justify-center space-x-1 text-sm sm:text-base font-medium h-6 overflow-hidden">
                                {roleText.split('').map((char, index) => (
                                    <motion.div
                                        key={`role-${index}`}
                                        className="relative"
                                    >
                                        <motion.span
                                            initial={{ y: 30, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{
                                                duration: 0.5,
                                                ease: [0.215, 0.61, 0.355, 1],
                                                delay: 1 + index * 0.05
                                            }}
                                            className="inline-block text-[#00FFFF]"
                                            style={{ textShadow: '0 0 5px rgba(0, 255, 255, 0.5)' }}
                                        >
                                            {char === ' ' ? '\u00A0' : char}
                                        </motion.span>

                                        {/* Deterministic "bits" animation based on index */}
                                        {char !== ' ' && [1, 4, 6, 11, 13].includes(index) && (
                                            <motion.div
                                                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-[8px] font-mono opacity-60 text-[#7000FF]"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: [0, 0.8, 0] }}
                                                transition={{
                                                    repeat: Infinity,
                                                    duration: 2,
                                                    delay: index * 0.3 % 2
                                                }}
                                            >
                                                {index % 2 === 0 ? '1' : '0'}
                                            </motion.div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sci-fi progress indicators */}
                    <div className="mt-10 relative w-[300px]">
                        {/* Data processing text */}
                        <div className="flex justify-between text-xs text-[#00FFFF] mb-2 font-mono">
                            <motion.span
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                INITIALIZING SYSTEM
                            </motion.span>

                            <motion.div
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                className="flex items-center"
                            >
                                <span className="mr-1">LOADING</span>
                                <motion.span
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                >
                                    ●
                                </motion.span>
                            </motion.div>
                        </div>

                        {/* Main progress bar */}
                        <div className="h-[3px] w-full bg-neutral-800 overflow-hidden relative">
                            {/* Progress fill */}
                            <motion.div
                                initial={{ width: '0%', x: 0 }}
                                animate={{ width: '100%' }}
                                transition={{
                                    duration: minimumLoadTimeMs / 1000 - 0.8,
                                    ease: "linear"
                                }}
                                className="absolute top-0 left-0 h-full bg-[#00FFFF]"
                                style={{ boxShadow: '0 0 10px rgba(0, 255, 255, 0.8)' }}
                            />

                            {/* Scan effect */}
                            <motion.div
                                className="absolute top-0 h-full w-[15px] bg-white"
                                style={{ filter: 'blur(10px)' }}
                                animate={{ left: ['-5%', '105%'] }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatDelay: 0.5
                                }}
                            />
                        </div>

                        {/* Segmented indicators */}
                        <div className="grid grid-cols-5 gap-1 mt-2">
                            {[0, 1, 2, 3, 4].map((i) => (
                                <motion.div
                                    key={`segment-${i}`}
                                    className="h-[2px] bg-[#7000FF]"
                                    initial={{ opacity: 0.3 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                        delay: 1 + i * 0.5,
                                        duration: 0.2
                                    }}
                                />
                            ))}
                        </div>

                        {/* Progress percentage */}
                        <div className="flex justify-between text-xs text-neutral-400 mt-2 font-mono">
                            <span>SYSTEM BOOT</span>
                            <motion.span
                                animate={{
                                    opacity: [0.7, 1, 0.7]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <motion.span>
                                    QUANTUM SYNC:
                                </motion.span>{' '}
                                <ProgressText
                                    percentages={['00%', '20%', '36%', '58%', '84%', '99%', '100%']}
                                    duration={minimumLoadTimeMs / 1000}
                                    className="text-[#00FFFF]"
                                />
                            </motion.span>
                        </div>
                    </div>

                    {/* Binary stream effect at the bottom */}
                    <div className="absolute bottom-6 w-full overflow-hidden h-6">
                        <motion.div
                            className="whitespace-nowrap font-mono text-xs text-[#00FFFF]/30"
                            animate={{ x: [0, -1000] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            {/* Fixed binary pattern instead of random generation */}
                            10110010 01101001 10010110 10101010 01010101 11001100 10101010 00110011 01010101 10011001
                            01010101 10110010 01101001 10010110 10101010 01010101 11001100 10101010 00110011 01010101
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
