import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { mockProducts } from '../data/products';
import ProductCard from './ProductCard';
import Sidebar from './Sidebar';

export default function Catalog({ searchTerm }) {
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [showMobileFilter, setShowMobileFilter] = useState(false);

    const filtered = mockProducts.filter(p => {
        const matchCat = activeCategory === 'Todos' || p.categoria === activeCategory;
        const matchSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.specs.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchCat && matchSearch;
    });

    return (
        <section id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 py-16">

            {/* Section header */}
            <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
                <div>
                    <p className="text-xs font-bold text-teal uppercase tracking-widest mb-1">Catálogo</p>
                    <h2 className="text-3xl sm:text-4xl font-black text-dark">
                        Nuestros <span className="text-primary">Productos</span>
                    </h2>
                </div>
                <div className="flex items-center gap-2 text-sm text-dark/50">
                    <span className="font-semibold text-dark">{filtered.length}</span>
                    {filtered.length === 1 ? 'producto encontrado' : 'productos encontrados'}
                </div>
            </div>

            <div className="flex gap-8 relative">

                {/* Desktop sidebar */}
                <aside className="hidden lg:block w-60 shrink-0">
                    <div className="sticky top-24 bg-white rounded-2xl shadow-card border border-bgCard/50 overflow-hidden">
                        <Sidebar
                            activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}
                            isMobile={false}
                        />
                    </div>
                </aside>

                {/* Product grid */}
                <div className="flex-1 min-w-0">
                    {filtered.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                            {filtered.map(p => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-28 text-center">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-xl font-bold text-dark mb-2">Sin resultados</h3>
                            <p className="text-dark/50 text-sm max-w-xs">
                                No encontramos productos que coincidan con tu búsqueda. Intenta con otros términos.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile filter button (FAB) */}
            <button
                id="mobile-filter-btn"
                onClick={() => setShowMobileFilter(true)}
                className="lg:hidden fixed bottom-6 right-6 z-20 btn-primary flex items-center gap-2 shadow-glow px-5 py-3 rounded-full text-sm font-bold"
            >
                <SlidersHorizontal size={16} />
                Filtros
                {activeCategory !== 'Todos' && (
                    <span className="bg-white text-primary text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">1</span>
                )}
            </button>

            {/* Mobile bottom sheet */}
            {showMobileFilter && (
                <>
                    <div
                        className="drawer-overlay lg:hidden"
                        onClick={() => setShowMobileFilter(false)}
                    />
                    <div className="bottom-sheet lg:hidden">
                        <div className="w-10 h-1 bg-bgCard rounded-full mx-auto mt-3 mb-1" />
                        <Sidebar
                            activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}
                            onClose={() => setShowMobileFilter(false)}
                            isMobile
                        />
                    </div>
                </>
            )}
        </section>
    );
}
