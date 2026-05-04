import { X, ShieldCheck } from 'lucide-react';
import { stockLabels, stockColors } from '../../data/adminData';

export default function ProductDetailModal({ product, onClose, onEdit }) {
    if (!product) return null;

    const stockKey = product.estado_stock || product.estado || 'normal';
    const sc = stockColors[stockKey] || stockColors['normal'];

    const formatPrice = (price) =>
        new Intl.NumberFormat('es-BO', { style: 'currency', currency: 'BOB', minimumFractionDigits: 0 }).format(price);

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 animate-fade-in" onClick={onClose} />

            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-zinc-100 px-6 py-4 flex items-center justify-between z-10 rounded-t-2xl">
                    <h2 className="text-lg font-bold text-zinc-900">Detalles del Producto</h2>
                    <button onClick={onClose} className="p-2 rounded-lg hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 transition-all">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Image + basic info */}
                    <div className="flex items-start gap-4">
                        <img 
                            src={product.imagen} 
                            alt={product.nombre} 
                            className="w-20 h-20 rounded-xl object-contain bg-zinc-100 shrink-0" 
                        />
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-zinc-900 leading-tight mb-1">{product.nombre}</h3>
                            <p className="text-sm text-zinc-400 mb-2">{product.categoria}</p>
                            <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg ${sc.bg} ${sc.text}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                                {stockLabels[stockKey]}
                            </span>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-100">
                        <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Precio</div>
                        <div className="text-2xl font-black text-zinc-900">{formatPrice(product.precio)}</div>
                    </div>

                    {/* Description */}
                    {product.descripcion && (
                        <div>
                            <h4 className="text-sm font-semibold text-zinc-700 mb-2">Descripción</h4>
                            <p className="text-sm text-zinc-500 leading-relaxed">{product.descripcion}</p>
                        </div>
                    )}

                    {/* Specs */}
                    {product.specs && product.specs.length > 0 && (
                        <div>
                            <h4 className="text-sm font-semibold text-zinc-700 mb-3">Especificaciones Técnicas</h4>
                            <div className="bg-zinc-50 rounded-xl border border-zinc-100 divide-y divide-zinc-100 overflow-hidden">
                                {product.specs.map((spec, idx) => (
                                    <div key={idx} className="flex items-center px-4 py-3">
                                        <span className="text-xs font-semibold text-zinc-400 w-32 shrink-0">{spec.key}</span>
                                        <span className="text-sm font-medium text-zinc-800">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-2 border-t border-zinc-100">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-zinc-600 hover:bg-zinc-100 transition-all"
                        >
                            Cerrar
                        </button>
                        {onEdit && (
                            <button
                                onClick={() => { onClose(); onEdit(product); }}
                                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#1A3C6E] hover:bg-[#15325a] transition-all"
                            >
                                Editar Producto
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
