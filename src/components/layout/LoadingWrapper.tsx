'use client';

import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/ui/LoadingScreen';

interface LoadingWrapperProps {
    children: React.ReactNode;
    minimumLoadTimeMs?: number;
}

export default function LoadingWrapper({
    children,
    minimumLoadTimeMs = 3000
}: LoadingWrapperProps) {
    const [loading, setLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        // Add a class to the body to prevent scrolling while loading
        document.body.classList.add('overflow-hidden');

        // Set minimum loading time
        const timer = setTimeout(() => {
            setLoading(false);

            // Add a small delay before showing content to ensure smooth transition
            setTimeout(() => {
                setShowContent(true);
                document.body.classList.remove('overflow-hidden');
            }, 800); // This matches the exit animation duration
        }, minimumLoadTimeMs);

        return () => {
            clearTimeout(timer);
            document.body.classList.remove('overflow-hidden');
        };
    }, [minimumLoadTimeMs]);

    return (
        <>
            <LoadingScreen loading={loading} minimumLoadTimeMs={minimumLoadTimeMs} />
            <div
                className={`transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0 invisible'}`}
            >
                {children}
            </div>
        </>
    );
}
