import { X, SlidersHorizontal } from 'lucide-react';
import { categories } from '../data/products';

export default function Sidebar({ activeCategory, setActiveCategory, onClose, isMobile }) {
    const content = (
        <div className="flex flex-col gap-5 p-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-dark text-base">
                    <SlidersHorizontal size={17} className="text-primary" />
                    Filtros
                </div>
                {isMobile && (
                    <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-bgCard transition-colors" aria-label="Cerrar filtros">
                        <X size={18} />
                    </button>
                )}
            </div>

            {/* Divider */}
            <hr className="border-bgCard" />

            {/* Categories */}
            <div>
                <p className="text-xs font-bold text-dark/40 uppercase tracking-widest mb-3">Categorías</p>
                <ul className="flex flex-col gap-1.5">
                    {categories.map(cat => (
                        <li key={cat}>
                            <button
                                onClick={() => { setActiveCategory(cat); if (isMobile) onClose(); }}
                                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${activeCategory === cat
                                        ? 'bg-primary text-white shadow-glowSm'
                                        : 'text-dark hover:bg-bgCard hover:text-primary'
                                    }`}
                                id={`filter-${cat.toLowerCase().replace(' ', '-')}`}
                            >
                                {cat}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Divider */}
            <hr className="border-bgCard" />

            {/* Stock filter (decorative in Phase 1) */}
            <div>
                <p className="text-xs font-bold text-dark/40 uppercase tracking-widest mb-3">Disponibilidad</p>
                <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-5 h-5 rounded-md border-2 border-primary bg-primary flex items-center justify-center">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 7L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <span className="text-sm text-dark group-hover:text-primary transition-colors">En stock</span>
                </label>
            </div>

            {/* Price range hint */}
            <div>
                <p className="text-xs font-bold text-dark/40 uppercase tracking-widest mb-3">Precio (Bs.)</p>
                <div className="flex gap-2">
                    <input type="number" placeholder="Min" className="w-full border border-bgCard rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal transition-colors" />
                    <input type="number" placeholder="Max" className="w-full border border-bgCard rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal transition-colors" />
                </div>
            </div>
        </div>
    );

    return content;
}
