'use client';

import { useEffect, useState, useRef } from 'react';
import SearchForm from './SearchForm';

export default function Hero() {
    const [isVisible, setIsVisible] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        setIsVisible(true);

        // Try to play video programmatically
        if (videoRef.current) {
            const video = videoRef.current;
            const playPromise = video.play();

            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log('Video is playing');
                    })
                    .catch((error) => {
                        console.log('Video autoplay failed:', error);
                        // Video autoplay failed, but that's okay
                    });
            }
        }
    }, []);

    const handleVideoError = () => {
        setVideoError(true);
    };

    return (
        <div className="relative h-[45vh] lg:h-[80vh]">
            {/* Background Video */}
            <div className="absolute inset-0">
                {!videoError ? (
                    <video
                        ref={videoRef}
                        className="absolute inset-0 w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        onError={handleVideoError}
                        onLoadStart={() => console.log('Video loading started')}
                        onCanPlay={() => console.log('Video can play')}
                    >
                        <source src="https://assets.chorcha.net/BagkzB0IMsm8iIb6kx2CD.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    // Fallback background image if video fails
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80')`
                        }}
                    />
                )}
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center pt-16 md:pt-52  text-center px-4">
                <div className={`max-w-4xl mx-auto mt-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}>
                    <h1 className="text-xl md:text-5xl font-bold text-white mb-2">
                        Explora California
                    </h1>
                    <p className="text-lg md:text-xl text-white font-medium opacity-90">
                        Descansa, Reconecta y Crea Recuerdos Inolvidables
                    </p>
                </div>

                {/* Search Form */}
                {/* <div className={`w-full z-[200] relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}>
                    <SearchForm compact={false} />
                </div> */}
            </div>
        </div>
    );
}
