import gsap from 'gsap';

/**
 * Animation utilities for consistent animations across the website
 */

// Standard animation durations
export const durations = {
    fast: 0.3,
    medium: 0.6,
    slow: 1.0,
    extraSlow: 1.5
};

// Standard easing functions
export const easings = {
    smooth: 'power2.out',
    bounce: 'bounce.out',
    elastic: 'elastic.out(1, 0.3)',
    back: 'back.out(1.7)',
    slowStart: 'power3.inOut'
};

// Predefined animations for common elements
export const animations = {
    // Fade in from bottom
    fadeInUp: (element: Element, delay = 0, duration = durations.medium) => {
        return gsap.fromTo(
            element,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration,
                delay,
                ease: easings.smooth
            }
        );
    },

    // Fade in with scale
    fadeInScale: (element: Element, delay = 0, duration = durations.medium) => {
        return gsap.fromTo(
            element,
            { scale: 0.8, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration,
                delay,
                ease: easings.back
            }
        );
    },

    // Staggered animation for lists
    staggerItems: (elements: Element[], stagger = 0.1, delay = 0) => {
        return gsap.fromTo(
            elements,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger,
                delay,
                duration: durations.medium,
                ease: easings.smooth
            }
        );
    },

    // Text reveal character by character
    textReveal: (element: Element, delay = 0) => {
        const text = element.textContent || '';
        const characters = text.split('');

        // Clear the element
        element.textContent = '';

        // Create span for each character
        characters.forEach(char => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.opacity = '0';
            span.style.display = 'inline-block';
            element.appendChild(span);
        });

        // Animate each character
        gsap.to(
            element.childNodes,
            {
                opacity: 1,
                stagger: 0.03,
                delay,
                duration: durations.fast,
                ease: easings.smooth
            }
        );
    },

    // Parallax effect
    parallax: (element: Element, scrollAmount = 0.2) => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const offset = scrollPosition * scrollAmount;
            gsap.to(element, {
                y: offset,
                ease: "none",
                duration: 0.1
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial position

        // Return cleanup function
        return () => window.removeEventListener('scroll', handleScroll);
    },

    // Continuous floating animation
    float: (element: Element, amount = 15, duration = 2) => {
        gsap.to(element, {
            y: `+=${amount}`,
            duration,
            repeat: -1,
            yoyo: true,
            ease: easings.smooth
        });
    },

    // Pulse animation
    pulse: (element: Element) => {
        gsap.to(element, {
            scale: 1.05,
            duration: 0.8,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut'
        });
    }
};

export default animations;
