import { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, Eye, X, Package, Loader2 } from 'lucide-react';
import { fetchCategorias, createCategoria, updateCategoria, deleteCategoria, fetchProductos } from '../../services/api';
import ConfirmDialog from '../components/ConfirmDialog';

export default function AdminCategories() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editCat, setEditCat] = useState(null);
    const [formName, setFormName] = useState('');
    const [formIcon, setFormIcon] = useState('📦');
    const [viewCat, setViewCat] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [saving, setSaving] = useState(false);

    const iconOptions = ['💻', '🖥️', '🔧', '🖱️', '⌨️', '🎧', '📦', '🔌', '🎮', '📡'];

    const loadData = async () => {
        try {
            setLoading(true);
            const [cats, prods] = await Promise.all([fetchCategorias(), fetchProductos()]);
            setCategories(cats);
            setProducts(prods);
        } catch (err) {
            console.error('Error cargando datos:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadData(); }, []);

    const handleSave = async () => {
        if (!formName.trim()) return;
        setSaving(true);
        try {
            if (editCat) {
                await updateCategoria(editCat.id, { nombre: formName, icono: formIcon });
            } else {
                await createCategoria({ nombre: formName, icono: formIcon });
            }
            await loadData();
            resetForm();
        } catch (err) {
            console.error('Error guardando categoría:', err);
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (cat) => {
        setEditCat(cat);
        setFormName(cat.nombre);
        setFormIcon(cat.icono || '📦');
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteCategoria(id);
            setCategories(prev => prev.filter(c => c.id !== id));
        } catch (err) {
            console.error('Error eliminando categoría:', err);
        }
        setDeleteTarget(null);
    };

    const resetForm = () => {
        setShowForm(false);
        setEditCat(null);
        setFormName('');
        setFormIcon('📦');
    };

    const getProductsForCategory = (catName) => {
        return products.filter(p => p.categoria === catName);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-32">
                <Loader2 size={32} className="animate-spin text-[#1A3C6E]" />
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-zinc-900">Categorías</h1>
                    <p className="text-sm text-zinc-500 mt-1">{categories.length} categorías registradas</p>
                </div>
                <button onClick={() => { resetForm(); setShowForm(true); }} className="inline-flex items-center gap-2 bg-[#1A3C6E] text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-[#15325a] transition-all shadow-sm hover:shadow-md">
                    <Plus size={18} />
                    Nueva Categoría
                </button>
            </div>

            {showForm && (
                <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm p-5 mb-6 animate-fade-in">
                    <h3 className="text-sm font-bold text-zinc-700 mb-4">{editCat ? 'Editar Categoría' : 'Nueva Categoría'}</h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input type="text" placeholder="Nombre de la categoría" value={formName} onChange={(e) => setFormName(e.target.value)} className="flex-1 px-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-sm focus:outline-none focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/10 transition-all" autoFocus />
                        <div className="flex items-center gap-1.5">
                            {iconOptions.map(icon => (
                                <button key={icon} type="button" onClick={() => setFormIcon(icon)} className={`w-9 h-9 rounded-lg flex items-center justify-center text-base border-2 transition-all ${formIcon === icon ? 'border-[#1A3C6E] bg-blue-50 scale-110' : 'border-transparent hover:border-zinc-200'}`}>{icon}</button>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <button onClick={handleSave} disabled={saving} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#1A3C6E] hover:bg-[#15325a] transition-all disabled:opacity-60">
                                {saving ? 'Guardando...' : editCat ? 'Guardar' : 'Crear'}
                            </button>
                            <button onClick={resetForm} className="px-4 py-2.5 rounded-xl text-sm font-semibold text-zinc-500 hover:bg-zinc-100 transition-all">Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map(cat => {
                    const catProducts = getProductsForCategory(cat.nombre);
                    return (
                        <div key={cat.id} className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm p-5 hover:shadow-md transition-all group">
                            <div className="flex items-start justify-between mb-3">
                                <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center text-2xl">{cat.icono || '📦'}</div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => setViewCat(cat)} className="p-2 rounded-lg text-zinc-400 hover:text-[#1A3C6E] hover:bg-blue-50 transition-all" title="Ver productos"><Eye size={14} /></button>
                                    <button onClick={() => handleEdit(cat)} className="p-2 rounded-lg text-zinc-400 hover:text-[#1A3C6E] hover:bg-blue-50 transition-all" title="Editar"><Edit3 size={14} /></button>
                                    <button onClick={() => setDeleteTarget(cat)} className="p-2 rounded-lg text-zinc-400 hover:text-[#E8232C] hover:bg-red-50 transition-all" title="Eliminar"><Trash2 size={14} /></button>
                                </div>
                            </div>
                            <h3 className="font-bold text-zinc-800 mb-1">{cat.nombre}</h3>
                            <p className="text-xs text-zinc-400">{catProducts.length} productos</p>
                        </div>
                    );
                })}
            </div>

            {viewCat && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50 animate-fade-in" onClick={() => setViewCat(null)} />
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in">
                        <div className="sticky top-0 bg-white border-b border-zinc-100 px-6 py-4 flex items-center justify-between z-10 rounded-t-2xl">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{viewCat.icono || '📦'}</span>
                                <div><h2 className="text-lg font-bold text-zinc-900">{viewCat.nombre}</h2><p className="text-xs text-zinc-400">Productos en esta categoría</p></div>
                            </div>
                            <button onClick={() => setViewCat(null)} className="p-2 rounded-lg hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 transition-all"><X size={20} /></button>
                        </div>
                        <div className="divide-y divide-zinc-100">
                            {getProductsForCategory(viewCat.nombre).length > 0 ? (
                                getProductsForCategory(viewCat.nombre).map(p => (
                                    <div key={p.id} className="px-6 py-4 flex items-center gap-4">
                                        <img src={p.imagen} alt={p.nombre} className="w-10 h-10 rounded-lg object-contain bg-zinc-100 shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-semibold text-zinc-800 truncate">{p.nombre}</div>
                                            <div className="text-xs text-zinc-400">BOB {Number(p.precio).toLocaleString()}</div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="py-12 text-center"><Package size={32} className="text-zinc-300 mx-auto mb-3" /><p className="text-sm text-zinc-400">No hay productos en esta categoría.</p></div>
                            )}
                        </div>
                        <div className="px-6 py-4 border-t border-zinc-100"><button onClick={() => setViewCat(null)} className="w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-zinc-600 hover:bg-zinc-100 transition-all">Cerrar</button></div>
                    </div>
                </div>
            )}

            {deleteTarget && (
                <ConfirmDialog
                    title="Eliminar categoría"
                    message={`¿Estás seguro de que quieres eliminar la categoría "${deleteTarget.nombre}"? Esta acción no se puede deshacer.`}
                    onConfirm={() => handleDelete(deleteTarget.id)}
                    onCancel={() => setDeleteTarget(null)}
                />
            )}
        </div>
    );
}
