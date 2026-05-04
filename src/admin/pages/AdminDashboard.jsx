import { useState, useEffect } from 'react';
import { Package, AlertTriangle, Layers, ChevronRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchProductos, fetchCategorias } from '../../services/api';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const [prods, cats] = await Promise.all([fetchProductos(), fetchCategorias()]);
                setProducts(prods);
                setCategories(cats);
            } catch (err) {
                console.error('Error cargando dashboard:', err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-32">
                <Loader2 size={32} className="animate-spin text-[#1A3C6E]" />
            </div>
        );
    }

    const outOrHidden = products.filter(p => p.estado_stock === 'out' || p.estado_stock === 'hidden').length;

    const statCards = [
        { label: 'Total Productos', value: products.length, icon: Package, iconBg: 'bg-[#1A3C6E]/10', iconColor: 'text-[#1A3C6E]' },
        { label: 'Agotados / Ocultos', value: outOrHidden, icon: AlertTriangle, iconBg: 'bg-[#E8232C]/10', iconColor: 'text-[#E8232C]' },
        { label: 'Total Categorías', value: categories.length, icon: Layers, iconBg: 'bg-emerald-100', iconColor: 'text-emerald-700' },
    ];

    const recentProducts = products.slice(0, 5);

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-black text-zinc-900">Dashboard</h1>
                <p className="text-sm text-zinc-500 mt-1">Resumen general de NextOn</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
                {statCards.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
                    <div key={label} className="bg-white rounded-2xl p-6 border border-zinc-200/80 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
                                <Icon size={22} className={iconColor} />
                            </div>
                            <div>
                                <div className="text-3xl font-black text-zinc-900">{value}</div>
                                <div className="text-sm text-zinc-500 font-medium">{label}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-zinc-900">Productos Recientes</h2>
                    <button onClick={() => navigate('/admin/productos')} className="text-xs font-semibold text-[#1A3C6E] hover:underline">Ver todos →</button>
                </div>
                <div className="divide-y divide-zinc-100">
                    {recentProducts.map(p => (
                        <div key={p.id} onClick={() => navigate(`/admin/productos?view=${p.id}`)} className="px-6 py-4 flex items-center gap-4 hover:bg-zinc-50 transition-colors cursor-pointer group">
                            <img src={p.imagen} alt={p.nombre} className="w-10 h-10 rounded-lg object-contain bg-zinc-100" />
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold text-zinc-800 truncate">{p.nombre}</div>
                                <div className="text-xs text-zinc-400">{p.categoria}</div>
                            </div>
                            <div className="text-sm font-bold text-zinc-700 whitespace-nowrap">BOB {Number(p.precio).toLocaleString()}</div>
                            <ChevronRight size={16} className="text-zinc-300 group-hover:text-zinc-500 transition-colors shrink-0" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
