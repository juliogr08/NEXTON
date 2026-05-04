import { useState, useEffect } from 'react';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { mockProducts } from '../data/products';

const navLinks = [
    { href: '/#catalogo', label: 'Catálogo' },
    { href: '/#promociones', label: 'Promociones' },
    { href: '/#sucursales', label: 'Sucursales' },
    { href: '/#nosotros', label: 'Nosotros' },
];

export default function Navbar({ searchTerm, setSearchTerm }) {
    const { totalCount, openCart } = useCart();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
    }, []);

    const filteredProducts = searchTerm.trim() === '' ? [] : mockProducts.filter(p => 
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.specs.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    ).slice(0, 5);

    const handleSearchSubmit = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setShowSuggestions(false);
            navigate('/');
            setTimeout(() => {
                document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    };

    const handleSelectProduct = (product) => {
        setShowSuggestions(false);
        setSearchTerm('');
        navigate(`/producto/${product.id}`);
    };

    // Close mobile menu on link click
    const handleNavClick = (e, href) => {
        setMobileMenu(false);
        if (href.startsWith('/#')) {
            const targetId = href.replace('/#', '');
            if (window.location.pathname === '/') {
                e.preventDefault();
                document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const SuggestionsDropdown = () => {
        if (!showSuggestions || filteredProducts.length === 0) return null;
        
        return (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-bgCard overflow-hidden z-50 max-h-80 overflow-y-auto">
                {filteredProducts.map(p => (
                    <div 
                        key={p.id} 
                        className="px-4 py-3 hover:bg-bgCard cursor-pointer flex items-center gap-3 transition-colors border-b border-bgCard last:border-b-0"
                        onMouseDown={(e) => {
                            e.preventDefault(); // Prevents onBlur from firing before onClick
                            handleSelectProduct(p);
                        }}
                    >
                        <img src={p.imagen} alt={p.nombre} className="w-10 h-10 object-contain mix-blend-multiply rounded-md" />
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-dark line-clamp-1">{p.nombre}</span>
                            <span className="text-xs text-teal font-semibold">{p.categoria}</span>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${scrolled ? 'glass shadow-md py-2' : 'bg-white/90 py-3'
                }`}
            style={{ backdropFilter: scrolled ? undefined : 'none' }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-4">

                {/* Logo */}
                <a href="/" className="flex items-center gap-2 shrink-0">
                    <img src="/logo.png" alt="NextOn" className="h-10 w-auto object-contain" />
                    <span className="text-xl font-black tracking-tight text-dark">
                        Next<span className="text-primary">O</span>n
                    </span>
                </a>

                {/* Desktop nav links */}
                <nav className="hidden lg:flex items-center gap-1 ml-2">
                    {navLinks.map(({ href, label }) => (
                        <a
                            key={href}
                            href={href}
                            onClick={(e) => handleNavClick(e, href)}
                            className="px-4 py-2 rounded-xl text-sm font-semibold text-dark/60 hover:text-primary hover:bg-primary/5 transition-all duration-200"
                        >
                            {label}
                        </a>
                    ))}
                </nav>

                {/* Search Bar */}
                <div className="flex-1 max-w-xl mx-auto relative hidden sm:block">
                    <Search
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark/40 pointer-events-none"
                    />
                    <input
                        type="search"
                        placeholder="Buscar laptops, monitores, componentes..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setShowSuggestions(false)}
                        onKeyDown={handleSearchSubmit}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-bgCard bg-bgMain text-sm text-dark
                       placeholder:text-dark/40 focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20
                       transition-all duration-200"
                    />
                    <SuggestionsDropdown />
                </div>

                {/* Right controls */}
                <div className="flex items-center gap-2 ml-auto lg:ml-0">
                    {/* Cart Button */}
                    <button
                        id="cart-button"
                        onClick={openCart}
                        className="relative p-2.5 rounded-xl bg-bgMain border border-bgCard hover:border-primary
                       hover:text-primary transition-all duration-200 group"
                        aria-label="Carrito de compras"
                    >
                        <ShoppingCart size={20} className="transition-transform duration-200 group-hover:scale-110" />
                        {totalCount > 0 && (
                            <span className="cart-badge animate-fade-in">{totalCount > 9 ? '9+' : totalCount}</span>
                        )}
                    </button>

                    {/* CTA Desktop */}
                    <a
                        href="/#catalogo"
                        className="hidden md:inline-flex btn-primary text-sm items-center gap-1.5"
                    >
                        Ver Catálogo
                    </a>

                    {/* Mobile hamburger */}
                    <button
                        className="lg:hidden p-2 rounded-xl hover:bg-bgCard transition-colors"
                        onClick={() => setMobileMenu(v => !v)}
                        aria-label="Menú"
                    >
                        {mobileMenu ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile search bar */}
            <div className="sm:hidden px-4 pb-3 pt-1">
                <div className="relative">
                    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark/40 pointer-events-none" />
                    <input
                        type="search"
                        placeholder="Buscar productos..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setShowSuggestions(false)}
                        onKeyDown={handleSearchSubmit}
                        className="w-full pl-9 pr-4 py-2 rounded-xl border border-bgCard bg-bgMain text-sm
                       focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all duration-200"
                    />
                    <SuggestionsDropdown />
                </div>
            </div>

            {/* Mobile nav menu */}
            {mobileMenu && (
                <div className="lg:hidden bg-white border-t border-bgCard px-4 py-4 flex flex-col gap-1 animate-fade-in">
                    {navLinks.map(({ href, label }) => (
                        <a
                            key={href}
                            href={href}
                            onClick={(e) => handleNavClick(e, href)}
                            className="px-4 py-3 rounded-xl text-sm font-semibold text-dark/70 hover:text-primary hover:bg-primary/5 transition-all"
                        >
                            {label}
                        </a>
                    ))}
                </div>
            )}
        </header>
    );
}
