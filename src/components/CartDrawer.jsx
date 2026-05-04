import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const WA_NUMBER = '591XXXXXXXXX';

function buildWAMessage(items, total) {
    const lines = items.map(i =>
        `• ${i.nombre} x${i.qty} = Bs. ${(i.precio * i.qty).toFixed(2)}`
    );
    lines.push('');
    lines.push(`💰 Total: Bs. ${total.toFixed(2)}`);
    lines.push('');
    lines.push('Hola, me gustaría cotizar los siguientes productos de NextOn:');
    const msg = ['Hola, me gustaría cotizar los siguientes productos de NextOn:', '', ...items.map(i =>
        `• ${i.nombre} x${i.qty} — Bs. ${(i.precio * i.qty).toFixed(2)}`
    ), '', `💰 *Total: Bs. ${total.toFixed(2)}*`, '', '¿Podría darme más información?'].join('\n');
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export default function CartDrawer() {
    const { items, isOpen, closeCart, removeItem, updateQty, totalAmount } = useCart();

    const formatPrice = (n) =>
        new Intl.NumberFormat('es-BO', { style: 'currency', currency: 'BOB', minimumFractionDigits: 0 }).format(n);

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div className="drawer-overlay" onClick={closeCart} />

            {/* Drawer panel */}
            <div className="drawer-panel" id="cart-drawer">

                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-bgCard">
                    <div className="flex items-center gap-2 font-black text-dark text-lg">
                        <ShoppingBag size={20} className="text-primary" />
                        Mi Carrito
                        {items.length > 0 && (
                            <span className="text-sm font-semibold text-dark/40">({items.length})</span>
                        )}
                    </div>
                    <button
                        onClick={closeCart}
                        className="p-2 rounded-xl hover:bg-bgCard transition-colors"
                        aria-label="Cerrar carrito"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto scrollbar-thin px-5 py-4 space-y-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                            <ShoppingBag size={56} className="text-bgCard mb-4" />
                            <h3 className="font-bold text-dark text-lg mb-1">Carrito vacío</h3>
                            <p className="text-dark/40 text-sm">Agrega algunos productos para cotizar.</p>
                            <button onClick={closeCart} className="mt-6 btn-secondary text-sm px-5 py-2.5">
                                Ver catálogo
                            </button>
                        </div>
                    ) : (
                        items.map(item => (
                            <div
                                key={item.id}
                                className="flex gap-3 bg-bgMain rounded-xl p-3 border border-bgCard/60"
                            >
                                {/* Thumbnail */}
                                <img
                                    src={item.imagen}
                                    alt={item.nombre}
                                    className="w-16 h-16 rounded-lg object-cover bg-bgCard shrink-0"
                                />

                                {/* Details */}
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs font-bold text-teal mb-0.5">{item.categoria}</div>
                                    <p className="text-sm font-semibold text-dark leading-snug line-clamp-2">{item.nombre}</p>
                                    <div className="text-base font-black text-primary mt-1">{formatPrice(item.precio * item.qty)}</div>

                                    {/* Quantity controls */}
                                    <div className="flex items-center gap-2 mt-2">
                                        <button
                                            onClick={() => updateQty(item.id, -1)}
                                            className="w-7 h-7 rounded-lg bg-bgCard hover:bg-gray-300 flex items-center justify-center transition-colors"
                                            aria-label="Restar"
                                        >
                                            <Minus size={13} />
                                        </button>
                                        <span className="text-sm font-bold w-5 text-center">{item.qty}</span>
                                        <button
                                            onClick={() => updateQty(item.id, 1)}
                                            className="w-7 h-7 rounded-lg bg-bgCard hover:bg-gray-300 flex items-center justify-center transition-colors"
                                            aria-label="Sumar"
                                        >
                                            <Plus size={13} />
                                        </button>

                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="ml-auto p-1.5 rounded-lg text-dark/30 hover:text-primary hover:bg-red-50 transition-colors"
                                            aria-label="Eliminar"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t border-bgCard px-5 py-5 space-y-4">
                        {/* Subtotal */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-dark/60 font-medium">Subtotal</span>
                            <span className="text-2xl font-black text-dark">{formatPrice(totalAmount)}</span>
                        </div>

                        {/* WhatsApp CTA */}
                        <a
                            href={buildWAMessage(items, totalAmount)}
                            target="_blank"
                            rel="noopener noreferrer"
                            id="whatsapp-cta"
                            className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl font-bold text-white text-base
                         bg-[#25D366] hover:bg-[#1ebe5d] transition-all duration-300 hover:shadow-[0_0_20px_4px_rgba(37,211,102,0.45)]
                         hover:-translate-y-0.5"
                        >
                            <MessageCircle size={20} />
                            Cotizar por WhatsApp
                        </a>

                        <p className="text-center text-xs text-dark/30">
                            Se abrirá WhatsApp con tu lista de productos
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}
