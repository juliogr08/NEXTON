import { useState, useEffect } from 'react';
import { X, Plus, Trash2, Upload } from 'lucide-react';
import { STOCK_STATES, stockLabels } from '../../data/adminData';
import { fetchCategorias, createProducto, updateProducto } from '../../services/api';

export default function ProductFormModal({ product, onSave, onClose }) {
    const isEdit = !!product;
    const [categories, setCategories] = useState([]);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        id: product?.id || null,
        nombre: product?.nombre || '',
        descripcion: product?.descripcion || '',
        precio: product?.precio || '',
        categoria_id: product?.categoria_id || '',
        estado_stock: product?.estado_stock || STOCK_STATES.NORMAL,
        imagen: product?.imagen || '',
        specs: product?.specs?.length > 0 ? product.specs : [{ key: '', value: '' }],
    });

    const [dragOver, setDragOver] = useState(false);

    useEffect(() => {
        fetchCategorias().then(setCategories).catch(console.error);
    }, []);

    // Set default category once loaded
    useEffect(() => {
        if (categories.length > 0 && !form.categoria_id) {
            setForm(prev => ({ ...prev, categoria_id: categories[0].id }));
        }
    }, [categories]);

    const updateField = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

    const addSpec = () => setForm(prev => ({ ...prev, specs: [...prev.specs, { key: '', value: '' }] }));

    const removeSpec = (idx) => setForm(prev => ({
        ...prev,
        specs: prev.specs.filter((_, i) => i !== idx),
    }));

    const updateSpec = (idx, field, value) => {
        setForm(prev => ({
            ...prev,
            specs: prev.specs.map((s, i) => i === idx ? { ...s, [field]: value } : s),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.nombre.trim() || !form.precio) return;

        setSaving(true);
        try {
            const payload = {
                nombre: form.nombre,
                descripcion: form.descripcion,
                precio: Number(form.precio),
                categoria_id: Number(form.categoria_id),
                estado_stock: form.estado_stock,
                imagen: form.imagen || `https://placehold.co/400x300/e0e0e0/3a3a3a?text=${encodeURIComponent(form.nombre.slice(0, 8))}`,
                specs: form.specs.filter(s => s.key.trim() && s.value.trim()),
            };

            if (isEdit) {
                await updateProducto(form.id, payload);
            } else {
                await createProducto(payload);
            }
            onSave();
        } catch (err) {
            console.error('Error guardando producto:', err);
        } finally {
            setSaving(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        updateField('imagen', 'https://placehold.co/400x300/1A3C6E/ffffff?text=Imagen');
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 animate-fade-in" onClick={onClose} />

            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in">
                <div className="sticky top-0 bg-white border-b border-zinc-100 px-6 py-4 flex items-center justify-between z-10 rounded-t-2xl">
                    <h2 className="text-lg font-bold text-zinc-900">
                        {isEdit ? 'Editar Producto' : 'Nuevo Producto'}
                    </h2>
                    <button onClick={onClose} className="p-2 rounded-lg hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 transition-all">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Image upload zone */}
                    <div>
                        <label className="block text-sm font-semibold text-zinc-700 mb-2">Imagen del producto</label>
                        <div
                            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={handleDrop}
                            onClick={() => updateField('imagen', 'https://placehold.co/400x300/1A3C6E/ffffff?text=Imagen')}
                            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
                                ${dragOver ? 'border-[#1A3C6E] bg-blue-50' : 'border-zinc-200 hover:border-zinc-300 bg-zinc-50'}`}
                        >
                            {form.imagen ? (
                                <div className="flex flex-col items-center gap-2">
                                    <img src={form.imagen} alt="Preview" className="w-16 h-16 rounded-lg object-contain" />
                                    <span className="text-xs text-zinc-400">Clic o arrastra para cambiar</span>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-2 text-zinc-400">
                                    <Upload size={28} />
                                    <span className="text-sm font-medium">Arrastra una imagen o haz clic aquí</span>
                                    <span className="text-xs">PNG, JPG hasta 5MB</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-semibold text-zinc-700 mb-2">Nombre del producto</label>
                        <input
                            type="text"
                            required
                            value={form.nombre}
                            onChange={(e) => updateField('nombre', e.target.value)}
                            placeholder="Ej: Laptop Gamer Acer Nitro 5"
                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-sm focus:outline-none focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/10 transition-all"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-zinc-700 mb-2">Descripción</label>
                        <textarea
                            value={form.descripcion}
                            onChange={(e) => updateField('descripcion', e.target.value)}
                            placeholder="Descripción corta del producto para la tienda..."
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-sm focus:outline-none focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/10 transition-all resize-none"
                        />
                    </div>

                    {/* Price + Category */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-zinc-700 mb-2">Precio (BOB)</label>
                            <input
                                type="number"
                                required
                                min="0"
                                value={form.precio}
                                onChange={(e) => updateField('precio', e.target.value)}
                                placeholder="0"
                                className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-sm focus:outline-none focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/10 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-zinc-700 mb-2">Categoría</label>
                            <select
                                value={form.categoria_id}
                                onChange={(e) => updateField('categoria_id', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-sm font-medium focus:outline-none focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/10 transition-all"
                            >
                                {categories.map(c => (
                                    <option key={c.id} value={c.id}>{c.nombre}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Estado */}
                    <div>
                        <label className="block text-sm font-semibold text-zinc-700 mb-2">Estado de Stock</label>
                        <select
                            value={form.estado_stock}
                            onChange={(e) => updateField('estado_stock', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-sm font-medium focus:outline-none focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/10 transition-all"
                        >
                            {Object.entries(stockLabels).map(([value, label]) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Dynamic Specs */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <label className="text-sm font-semibold text-zinc-700">Especificaciones Técnicas</label>
                            <button type="button" onClick={addSpec} className="inline-flex items-center gap-1 text-xs font-semibold text-[#1A3C6E] hover:text-[#15325a] transition-colors">
                                <Plus size={14} />
                                Agregar
                            </button>
                        </div>
                        <div className="space-y-2">
                            {form.specs.map((spec, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="Ej: Procesador"
                                        value={spec.key}
                                        onChange={(e) => updateSpec(idx, 'key', e.target.value)}
                                        className="flex-1 px-3 py-2.5 rounded-lg border border-zinc-200 bg-zinc-50 text-sm focus:outline-none focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/10 transition-all"
                                    />
                                    <span className="text-zinc-300">→</span>
                                    <input
                                        type="text"
                                        placeholder="Ej: i7 12th Gen"
                                        value={spec.value}
                                        onChange={(e) => updateSpec(idx, 'value', e.target.value)}
                                        className="flex-1 px-3 py-2.5 rounded-lg border border-zinc-200 bg-zinc-50 text-sm focus:outline-none focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/10 transition-all"
                                    />
                                    {form.specs.length > 1 && (
                                        <button type="button" onClick={() => removeSpec(idx)} className="p-2 rounded-lg text-zinc-300 hover:text-[#E8232C] hover:bg-red-50 transition-all shrink-0">
                                            <Trash2 size={14} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100">
                        <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-zinc-600 hover:bg-zinc-100 transition-all">
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#1A3C6E] hover:bg-[#15325a] shadow-sm hover:shadow-md transition-all disabled:opacity-60"
                        >
                            {saving ? 'Guardando...' : isEdit ? 'Guardar Cambios' : 'Crear Producto'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
