import { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Eye, EyeOff, Edit3, Upload, X, Loader2 } from 'lucide-react';
import { fetchBanners, createBanner, updateBanner, deleteBanner } from '../../services/api';
import ConfirmDialog from '../components/ConfirmDialog';

export default function AdminBanners() {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editBannerData, setEditBannerData] = useState(null);
    const [formTitle, setFormTitle] = useState('');
    const [formImage, setFormImage] = useState('');
    const [dragOver, setDragOver] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [saving, setSaving] = useState(false);
    const fileRef = useRef(null);

    const loadBanners = async () => {
        try {
            setLoading(true);
            const data = await fetchBanners();
            setBanners(data);
        } catch (err) {
            console.error('Error cargando banners:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadBanners(); }, []);

    const resetForm = () => {
        setShowForm(false);
        setEditBannerData(null);
        setFormTitle('');
        setFormImage('');
    };

    const toggleActive = async (id, currentActive) => {
        try {
            await updateBanner(id, { activo: !currentActive });
            setBanners(prev => prev.map(b => b.id === id ? { ...b, activo: !currentActive } : b));
        } catch (err) {
            console.error('Error actualizando banner:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteBanner(id);
            setBanners(prev => prev.filter(b => b.id !== id));
        } catch (err) {
            console.error('Error eliminando banner:', err);
        }
        setDeleteTarget(null);
    };

    const handleEdit = (banner) => {
        setEditBannerData(banner);
        setFormTitle(banner.titulo);
        setFormImage(banner.imagen);
        setShowForm(true);
    };

    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => setFormImage(ev.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (ev) => setFormImage(ev.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        if (!formTitle.trim() || !formImage) return;
        setSaving(true);
        try {
            if (editBannerData) {
                const updated = await updateBanner(editBannerData.id, { titulo: formTitle, imagen: formImage });
                setBanners(prev => prev.map(b => b.id === editBannerData.id ? updated : b));
            } else {
                const created = await createBanner({ titulo: formTitle, imagen: formImage, activo: true });
                setBanners(prev => [...prev, created]);
            }
            resetForm();
        } catch (err) {
            console.error('Error guardando banner:', err);
        } finally {
            setSaving(false);
        }
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
                    <h1 className="text-2xl sm:text-3xl font-black text-zinc-900">Banners</h1>
                    <p className="text-sm text-zinc-500 mt-1">{banners.length} banners configurados</p>
                </div>
                <button onClick={() => { resetForm(); setShowForm(true); }} className="inline-flex items-center gap-2 bg-[#1A3C6E] text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-[#15325a] transition-all shadow-sm hover:shadow-md">
                    <Plus size={18} />
                    Nuevo Banner
                </button>
            </div>

            {showForm && (
                <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm p-6 mb-6 animate-fade-in">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-zinc-700">{editBannerData ? 'Editar Banner' : 'Nuevo Banner'}</h3>
                        <button onClick={resetForm} className="p-1.5 rounded-lg hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 transition-all"><X size={16} /></button>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-zinc-500 mb-1.5">Nombre (referencia interna)</label>
                            <input type="text" placeholder="Ej: Promo Laptops Diciembre" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-sm focus:outline-none focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/10 transition-all" autoFocus />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-zinc-500 mb-1.5">Imagen del banner</label>
                            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
                            <div
                                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={handleDrop}
                                onClick={() => fileRef.current?.click()}
                                className={`border-2 border-dashed rounded-xl cursor-pointer transition-all overflow-hidden ${dragOver ? 'border-[#1A3C6E] bg-blue-50' : 'border-zinc-200 hover:border-zinc-300 bg-zinc-50'}`}
                            >
                                {formImage ? (
                                    <div className="relative">
                                        <img src={formImage} alt="Preview" className="w-full h-40 object-cover" />
                                        <div className="absolute inset-0 bg-black/0 hover:bg-black/30 flex items-center justify-center transition-all group">
                                            <span className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Clic para cambiar imagen</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-8 flex flex-col items-center gap-2 text-zinc-400">
                                        <Upload size={28} />
                                        <span className="text-sm font-medium">Arrastra una imagen o haz clic aquí</span>
                                        <span className="text-xs">PNG, JPG — se recomienda 1200x400px</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-2">
                            <button onClick={resetForm} className="px-4 py-2.5 rounded-xl text-sm font-semibold text-zinc-500 hover:bg-zinc-100 transition-all">Cancelar</button>
                            <button onClick={handleSave} disabled={!formTitle.trim() || !formImage || saving} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#1A3C6E] hover:bg-[#15325a] transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                                {saving ? 'Guardando...' : editBannerData ? 'Guardar Cambios' : 'Crear Banner'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="space-y-4">
                {banners.map(b => (
                    <div key={b.id} className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${b.activo ? 'border-zinc-200/80' : 'border-zinc-200/60 opacity-60'}`}>
                        <div className="flex flex-col sm:flex-row">
                            <div className="sm:w-64 shrink-0"><img src={b.imagen} alt={b.titulo} className="w-full h-32 sm:h-full object-cover" /></div>
                            <div className="flex-1 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div>
                                    <h3 className="font-bold text-zinc-800 mb-1">{b.titulo}</h3>
                                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${b.activo ? 'bg-emerald-100 text-emerald-700' : 'bg-zinc-200 text-zinc-500'}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${b.activo ? 'bg-emerald-500' : 'bg-zinc-400'}`} />
                                        {b.activo ? 'Activo' : 'Inactivo'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button onClick={() => handleEdit(b)} className="p-2.5 rounded-lg text-zinc-400 hover:text-[#1A3C6E] hover:bg-blue-50 transition-all" title="Editar"><Edit3 size={16} /></button>
                                    <button onClick={() => toggleActive(b.id, b.activo)} className={`p-2.5 rounded-lg transition-all ${b.activo ? 'text-zinc-400 hover:text-amber-600 hover:bg-amber-50' : 'text-zinc-400 hover:text-emerald-600 hover:bg-emerald-50'}`} title={b.activo ? 'Desactivar' : 'Activar'}>
                                        {b.activo ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                    <button onClick={() => setDeleteTarget(b)} className="p-2.5 rounded-lg text-zinc-400 hover:text-[#E8232C] hover:bg-red-50 transition-all" title="Eliminar"><Trash2 size={16} /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {banners.length === 0 && (
                <div className="bg-white rounded-2xl border border-zinc-200/80 py-16 text-center">
                    <div className="text-4xl mb-3">🖼️</div>
                    <h3 className="font-bold text-zinc-700 mb-1">Sin banners</h3>
                    <p className="text-sm text-zinc-400">Crea un banner para promocionar tus productos.</p>
                </div>
            )}

            {deleteTarget && (
                <ConfirmDialog
                    title="Eliminar banner"
                    message={`¿Estás seguro de que quieres eliminar el banner "${deleteTarget.titulo}"? Esta acción no se puede deshacer.`}
                    onConfirm={() => handleDelete(deleteTarget.id)}
                    onCancel={() => setDeleteTarget(null)}
                />
            )}
        </div>
    );
}
