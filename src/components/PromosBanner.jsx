import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { banners } from '../data/banners';

export default function PromosBanner() {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);

    const go = useCallback((dir) => {
        setCurrent(prev =>
            dir === 'right'
                ? (prev + 1) % banners.length
                : (prev - 1 + banners.length) % banners.length
        );
    }, []);

    useEffect(() => {
        if (paused) return;
        const t = setInterval(() => go('right'), 5000);
        return () => clearInterval(t);
    }, [paused, go]);

    return (
        <section
            className="w-full px-4 sm:px-6 max-w-6xl mx-auto -mt-8 mb-14 relative z-10"
            aria-label="Banner de Promociones"
        >
            <div
                className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                {/* Image */}
                <a href="#promociones" aria-label={banners[current].alt}>
                    <div className="relative w-full" style={{ paddingTop: '33%' }}>
                        {banners.map((b, i) => (
                            <img
                                key={b.id}
                                src={b.image}
                                alt={b.alt}
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                    }`}
                                draggable={false}
                            />
                        ))}
                        {/* Gradient overlay bottom for dots readability */}
                        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                    </div>
                </a>

                {/* Prev arrow */}
                <button
                    onClick={() => go('left')}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/60
                     backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200
                     opacity-0 group-hover:opacity-100"
                    aria-label="Anterior"
                >
                    <ChevronLeft size={22} />
                </button>

                {/* Next arrow */}
                <button
                    onClick={() => go('right')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/60
                     backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200
                     opacity-0 group-hover:opacity-100"
                    aria-label="Siguiente"
                >
                    <ChevronRight size={22} />
                </button>

                {/* Dot indicators (always visible, bottom center) */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                    {banners.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`rounded-full transition-all duration-300 ${i === current
                                    ? 'w-6 h-2.5 bg-white'
                                    : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/75'
                                }`}
                            aria-label={`Banner ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
