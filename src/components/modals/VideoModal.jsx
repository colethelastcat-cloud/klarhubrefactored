import React, { useState } from 'react';
import Modal from './Modal';

const VideoModal = ({ videoUrls, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const getYoutubeVideoId = (url) => {
        let videoId = null;
        try {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            const match = url.match(regExp);
            videoId = (match && match[2].length === 11) ? match[2] : null;
        } catch (error) { console.error("Invalid URL:", url, error); }
        return videoId;
    };

    const handlePrev = () => setCurrentIndex(prev => (prev === 0 ? videoUrls.length - 1 : prev - 1));
    const handleNext = () => setCurrentIndex(prev => (prev === videoUrls.length - 1 ? 0 : prev + 1));

    return (
        <Modal onClose={onClose}>
            {(handleClose) => (
                <div className="w-screen h-screen flex items-center justify-center relative group">
                    <button onClick={handleClose} className="absolute top-6 right-6 z-50 bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-2xl hover:bg-black/80 transition-colors">×</button>
                    <button onClick={handlePrev} className="absolute left-4 md:left-16 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-14 h-14 flex items-center justify-center transition-all z-40 hover:bg-black/70 hover:scale-110">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button onClick={handleNext} className="absolute right-4 md:right-16 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-14 h-14 flex items-center justify-center transition-all z-40 hover:bg-black/70 hover:scale-110">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                    <div className="w-full h-full flex items-center justify-center perspective-1000">
                        <div className="relative w-full h-[60vh] flex items-center justify-center transform-style-3d">
                             {videoUrls.map((url, index) => {
                                const videoId = getYoutubeVideoId(url);
                                const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : 'https://placehold.co/1280x720/121212/A0A0A0?text=Video';
                                let offset = index - currentIndex;
                                const numItems = videoUrls.length;
                                if (Math.abs(offset) > numItems / 2) {
                                    offset = offset > 0 ? offset - numItems : offset + numItems;
                                }
                                const isActive = offset === 0;
                                const isVisible = Math.abs(offset) <= 1;
                                const style = {
                                    transform: `translateX(${offset * 80}%) scale(${isActive ? 1 : 0.7}) rotateY(${-offset * 40}deg)`,
                                    opacity: isVisible ? (isActive ? 1 : 0.3) : 0,
                                    zIndex: numItems - Math.abs(offset),
                                    pointerEvents: isActive ? 'auto' : 'none',
                                    filter: isActive ? 'blur(0px)' : 'blur(5px)',
                                    transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                };
                                return (
                                    <div key={index} className="absolute w-[70%] md:w-[60%] aspect-video" style={style}>
                                        {isActive ? (
                                            <iframe
                                                className="w-full h-full rounded-lg shadow-2xl border-2 border-klar"
                                                src={url}
                                                title={`Klar Hub Demo Video ${index + 1}`}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        ) : (
                                            <div
                                                className="w-full h-full cursor-pointer"
                                                onClick={() => isVisible && setCurrentIndex(index)}
                                                style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
                                            >
                                                <img
                                                    src={thumbnailUrl}
                                                    className="w-full h-full object-cover rounded-lg shadow-lg"
                                                    alt={`Video thumbnail ${index + 1}`}
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default VideoModal;
