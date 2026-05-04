import { ShoppingCart, Flame } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
    const { addItem } = useCart();
    const navigate = useNavigate();
    const isLowStock = product.estado_stock === 2;

    const formatPrice = (price) =>
        new Intl.NumberFormat('es-BO', { style: 'currency', currency: 'BOB', minimumFractionDigits: 0 }).format(price);

    const handleCardClick = () => {
        navigate(`/producto/${product.id}`);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addItem(product);
    };

    const handleBuyNow = (e) => {
        e.stopPropagation();
        addItem(product);
        const drawerBtn = document.getElementById('cart-toggle-btn');
        if (drawerBtn) drawerBtn.click();
    };

    return (
        <article 
            className="product-card group relative flex flex-col cursor-pointer transition-all hover:shadow-lg" 
            id={`product-${product.id}`}
            onClick={handleCardClick}
        >
            {/* Stock badge */}
            {isLowStock && (
                <div className="badge-stock flex items-center gap-1">
                    <Flame size={12} className="shrink-0" />
                    Últimas unidades
                </div>
            )}

            {/* Product image */}
            <div className="overflow-hidden bg-bgCard">
                <img
                    src={product.imagen}
                    alt={product.nombre}
                    loading="lazy"
                    className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Card body */}
            <div className="flex flex-col flex-1 p-4 gap-3">
                {/* Category */}
                <span className="text-xs font-semibold text-teal uppercase tracking-wider">{product.categoria}</span>

                {/* Name */}
                <h3 className="text-sm font-bold text-dark leading-snug line-clamp-2 group-hover:text-primary transition-colors">{product.nombre}</h3>

                {/* Specs */}
                <ul className="flex flex-wrap gap-1.5">
                    {product.specs.map(spec => (
                        <li key={spec} className="spec-tag">{spec}</li>
                    ))}
                </ul>

                {/* Price + actions */}
                <div className="mt-auto pt-2 border-t border-bgCard/60 flex items-center justify-between gap-2">
                    <div>
                        {isLowStock && (
                            <div className="text-[10px] text-primary font-bold uppercase mb-0.5">¡Oferta limitada!</div>
                        )}
                        <div className="text-xl font-black text-dark">{formatPrice(product.precio)}</div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Add to cart (icon) */}
                        <button
                            onClick={handleAddToCart}
                            aria-label="Añadir al carrito"
                            className="btn-secondary p-2.5 rounded-xl z-10"
                            id={`add-cart-${product.id}`}
                        >
                            <ShoppingCart size={17} />
                        </button>

                        {/* Buy CTA */}
                        <button
                            onClick={handleBuyNow}
                            className="btn-primary text-xs px-3 py-2.5 whitespace-nowrap z-10"
                            id={`buy-${product.id}`}
                        >
                            Comprar Ya
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}
