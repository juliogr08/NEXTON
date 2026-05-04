import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, Search, Edit3, Trash2, Eye, Loader2 } from 'lucide-react';
import { STOCK_STATES, stockLabels, stockColors } from '../../data/adminData';
import { fetchProductos, updateProductoStock, deleteProducto } from '../../services/api';
import ProductFormModal from '../components/ProductFormModal';
import ProductDetailModal from '../components/ProductDetailModal';
import ConfirmDialog from '../components/ConfirmDialog';

export default function AdminProducts() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filterCat, setFilterCat] = useState('Todos');
    const [showModal, setShowModal] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [viewProduct, setViewProduct] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await fetchProductos();
            setProducts(data);
            // Extract unique categories
            const cats = [...new Set(data.map(p => p.categoria))].filter(Boolean);
            setCategories(cats);
        } catch (err) {
            console.error('Error cargando productos:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    // Auto-open detail modal if navigated with ?view=ID
    useEffect(() => {
        const viewId = searchParams.get('view');
        if (viewId && products.length > 0) {
            const found = products.find(p => p.id === parseInt(viewId));
            if (found) setViewProduct(found);
            setSearchParams({}, { replace: true });
        }
    }, [products]);

    const filtered = products.filter(p => {
        const matchSearch = p.nombre.toLowerCase().includes(search.toLowerCase());
        const matchCat = filterCat === 'Todos' || p.categoria === filterCat;
        return matchSearch && matchCat;
    });

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateProductoStock(id, newStatus);
            setProducts(prev => prev.map(p => p.id === id ? { ...p, estado_stock: newStatus } : p));
        } catch (err) {
            console.error('Error actualizando stock:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteProducto(id);
            setProducts(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            console.error('Error eliminando producto:', err);
        }
        setDeleteTarget(null);
    };

    const handleSaveProduct = () => {
        setShowModal(false);
        setEditProduct(null);
        loadProducts(); // Reload from DB
    };

    const handleEdit = (product) => {
        setEditProduct(product);
        setShowModal(true);
    };

    const handleNewProduct = () => {
        setEditProduct(null);
        setShowModal(true);
    };

    const formatPrice = (price) => 
        new Intl.NumberFormat('es-BO', { style: 'currency', currency: 'BOB', minimumFractionDigits: 0 }).format(price);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-32">
                <Loader2 size={32} className="animate-spin text-[#1A3C6E]" />
            </div>
        );
    }

    return (
        <div>
            {/* Page header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-zinc-900">Productos</h1>
                    <p className="text-sm text-zinc-500 mt-1">{products.length} productos registrados</p>
                </div>
                <button
                    onClick={handleNewProduct}
                    className="inline-flex items-center gap-2 bg-[#1A3C6E] text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-[#15325a] transition-all shadow-sm hover:shadow-md"
                >
                    <Plus size={18} />
                    Nuevo Producto
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm mb-6 p-4 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                        type="text"
                        placeholder="Buscar producto..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-sm focus:outline-none focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/10 transition-all"
                    />
                </div>
                <select 
                    value={filterCat} 
                    onChange={(e) => setFilterCat(e.target.value)}
                    className="px-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-sm font-medium text-zinc-700 focus:outline-none focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/10 transition-all"
                >
                    <option value="Todos">Todas las categorías</option>
                    {categories.map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm overflow-hidden">
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-zinc-100">
                                <th className="text-left px-6 py-4 font-semibold text-zinc-500 text-xs uppercase tracking-wider">Producto</th>
                                <th className="text-left px-4 py-4 font-semibold text-zinc-500 text-xs uppercase tracking-wider">Categoría</th>
                                <th className="text-right px-4 py-4 font-semibold text-zinc-500 text-xs uppercase tracking-wider">Precio</th>
                                <th className="text-left px-4 py-4 font-semibold text-zinc-500 text-xs uppercase tracking-wider">Estado Stock</th>
                                <th className="text-right px-6 py-4 font-semibold text-zinc-500 text-xs uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-50">
                            {filtered.map(p => {
                                const sc = stockColors[p.estado_stock] || stockColors['normal'];
                                return (
                                    <tr key={p.id} className="hover:bg-zinc-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img src={p.imagen} alt={p.nombre} className="w-10 h-10 rounded-lg object-contain bg-zinc-100 shrink-0" />
                                                <span className="font-semibold text-zinc-800 truncate max-w-[200px]">{p.nombre}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className="text-zinc-600">{p.categoria}</span>
                                        </td>
                                        <td className="px-4 py-4 text-right">
                                            <span className="font-bold text-zinc-800">{formatPrice(p.precio)}</span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <select
                                                value={p.estado_stock}
                                                onChange={(e) => handleStatusChange(p.id, e.target.value)}
                                                className={`${sc.bg} ${sc.text} text-xs font-bold px-3 py-1.5 rounded-lg border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#1A3C6E]/30 transition-all`}
                                            >
                                                {Object.entries(stockLabels).map(([value, label]) => (
                                                    <option key={value} value={value}>{label}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button onClick={() => setViewProduct(p)} className="p-2 rounded-lg text-zinc-400 hover:text-[#1A3C6E] hover:bg-blue-50 transition-all" title="Ver detalles">
                                                    <Eye size={16} />
                                                </button>
                                                <button onClick={() => handleEdit(p)} className="p-2 rounded-lg text-zinc-400 hover:text-[#1A3C6E] hover:bg-blue-50 transition-all" title="Editar">
                                                    <Edit3 size={16} />
                                                </button>
                                                <button onClick={() => setDeleteTarget(p)} className="p-2 rounded-lg text-zinc-400 hover:text-[#E8232C] hover:bg-red-50 transition-all" title="Eliminar">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Mobile cards */}
                <div className="md:hidden divide-y divide-zinc-100">
                    {filtered.map(p => {
                        const sc = stockColors[p.estado_stock] || stockColors['normal'];
                        return (
                            <div key={p.id} className="p-4 flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <img src={p.imagen} alt={p.nombre} className="w-12 h-12 rounded-lg object-contain bg-zinc-100 shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <div className="font-semibold text-zinc-800 text-sm truncate">{p.nombre}</div>
                                        <div className="text-xs text-zinc-400">{p.categoria}</div>
                                    </div>
                                    <div className="font-bold text-zinc-800 text-sm">{formatPrice(p.precio)}</div>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <select
                                        value={p.estado_stock}
                                        onChange={(e) => handleStatusChange(p.id, e.target.value)}
                                        className={`${sc.bg} ${sc.text} text-xs font-bold px-3 py-1.5 rounded-lg border-0 cursor-pointer focus:outline-none transition-all`}
                                    >
                                        {Object.entries(stockLabels).map(([value, label]) => (
                                            <option key={value} value={value}>{label}</option>
                                        ))}
                                    </select>
                                    <div className="flex items-center gap-1">
                                        <button onClick={() => setViewProduct(p)} className="p-2 rounded-lg text-zinc-400 hover:text-[#1A3C6E] hover:bg-blue-50 transition-all"><Eye size={16} /></button>
                                        <button onClick={() => handleEdit(p)} className="p-2 rounded-lg text-zinc-400 hover:text-[#1A3C6E] hover:bg-blue-50 transition-all"><Edit3 size={16} /></button>
                                        <button onClick={() => setDeleteTarget(p)} className="p-2 rounded-lg text-zinc-400 hover:text-[#E8232C] hover:bg-red-50 transition-all"><Trash2 size={16} /></button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filtered.length === 0 && (
                    <div className="py-16 text-center">
                        <div className="text-4xl mb-3">📦</div>
                        <h3 className="font-bold text-zinc-700 mb-1">Sin resultados</h3>
                        <p className="text-sm text-zinc-400">No se encontraron productos con esos filtros.</p>
                    </div>
                )}
            </div>

            {showModal && (
                <ProductFormModal
                    product={editProduct}
                    onSave={handleSaveProduct}
                    onClose={() => { setShowModal(false); setEditProduct(null); }}
                />
            )}

            {viewProduct && (
                <ProductDetailModal
                    product={viewProduct}
                    onClose={() => setViewProduct(null)}
                    onEdit={handleEdit}
                />
            )}

            {deleteTarget && (
                <ConfirmDialog
                    title="Eliminar producto"
                    message={`¿Estás seguro de que quieres eliminar "${deleteTarget.nombre}"? Esta acción no se puede deshacer.`}
                    onConfirm={() => handleDelete(deleteTarget.id)}
                    onCancel={() => setDeleteTarget(null)}
                />
            )}
        </div>
    );
}
