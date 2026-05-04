import { supabase } from '../lib/supabase';

// ─── CATEGORÍAS ──────────────────────────────

export async function fetchCategorias() {
    const { data, error } = await supabase
        .from('categorias')
        .select('*')
        .order('id');
    if (error) throw error;
    return data;
}

export async function createCategoria({ nombre, icono }) {
    const { data, error } = await supabase
        .from('categorias')
        .insert({ nombre, icono })
        .select()
        .single();
    if (error) throw error;
    return data;
}

export async function updateCategoria(id, { nombre, icono }) {
    const { data, error } = await supabase
        .from('categorias')
        .update({ nombre, icono })
        .eq('id', id)
        .select()
        .single();
    if (error) throw error;
    return data;
}

export async function deleteCategoria(id) {
    const { error } = await supabase.from('categorias').delete().eq('id', id);
    if (error) throw error;
}

// ─── PRODUCTOS ───────────────────────────────

export async function fetchProductos() {
    const { data, error } = await supabase
        .from('productos')
        .select(`
            *,
            categorias ( id, nombre ),
            producto_specs ( id, key, value ),
            producto_imagenes ( id, url, orden )
        `)
        .order('id');
    if (error) throw error;

    return data.map(p => ({
        ...p,
        categoria: p.categorias?.nombre || 'Sin categoría',
        categoria_id: p.categoria_id,
        specs: p.producto_specs || [],
        imagenes: (p.producto_imagenes || []).sort((a, b) => a.orden - b.orden).map(i => i.url),
    }));
}

export async function fetchProductoById(id) {
    const { data, error } = await supabase
        .from('productos')
        .select(`
            *,
            categorias ( id, nombre ),
            producto_specs ( id, key, value ),
            producto_imagenes ( id, url, orden )
        `)
        .eq('id', id)
        .single();
    if (error) throw error;

    return {
        ...data,
        categoria: data.categorias?.nombre || 'Sin categoría',
        specs: data.producto_specs || [],
        imagenes: (data.producto_imagenes || []).sort((a, b) => a.orden - b.orden).map(i => i.url),
    };
}

export async function createProducto({ nombre, descripcion, precio, categoria_id, estado_stock, imagen, specs }) {
    const { data: producto, error } = await supabase
        .from('productos')
        .insert({ nombre, descripcion, precio, categoria_id, estado_stock, imagen })
        .select()
        .single();
    if (error) throw error;

    if (specs && specs.length > 0) {
        const specsData = specs.filter(s => s.key && s.value).map(s => ({
            producto_id: producto.id,
            key: s.key,
            value: s.value,
        }));
        if (specsData.length > 0) {
            const { error: specErr } = await supabase.from('producto_specs').insert(specsData);
            if (specErr) throw specErr;
        }
    }

    return fetchProductoById(producto.id);
}

export async function updateProducto(id, { nombre, descripcion, precio, categoria_id, estado_stock, imagen, specs }) {
    const { error } = await supabase
        .from('productos')
        .update({ nombre, descripcion, precio, categoria_id, estado_stock, imagen })
        .eq('id', id);
    if (error) throw error;

    // Replace specs: delete old, insert new
    await supabase.from('producto_specs').delete().eq('producto_id', id);
    if (specs && specs.length > 0) {
        const specsData = specs.filter(s => s.key && s.value).map(s => ({
            producto_id: id,
            key: s.key,
            value: s.value,
        }));
        if (specsData.length > 0) {
            const { error: specErr } = await supabase.from('producto_specs').insert(specsData);
            if (specErr) throw specErr;
        }
    }

    return fetchProductoById(id);
}

export async function updateProductoStock(id, estado_stock) {
    const { error } = await supabase
        .from('productos')
        .update({ estado_stock })
        .eq('id', id);
    if (error) throw error;
}

export async function deleteProducto(id) {
    const { error } = await supabase.from('productos').delete().eq('id', id);
    if (error) throw error;
}

// ─── BANNERS ─────────────────────────────────

export async function fetchBanners() {
    const { data, error } = await supabase
        .from('banners')
        .select('*')
        .order('id');
    if (error) throw error;
    return data;
}

export async function fetchBannersActivos() {
    const { data, error } = await supabase
        .from('banners')
        .select('*')
        .eq('activo', true)
        .order('id');
    if (error) throw error;
    return data;
}

export async function createBanner({ titulo, imagen, activo }) {
    const { data, error } = await supabase
        .from('banners')
        .insert({ titulo, imagen, activo: activo ?? true })
        .select()
        .single();
    if (error) throw error;
    return data;
}

export async function updateBanner(id, fields) {
    const { data, error } = await supabase
        .from('banners')
        .update(fields)
        .eq('id', id)
        .select()
        .single();
    if (error) throw error;
    return data;
}

export async function deleteBanner(id) {
    const { error } = await supabase.from('banners').delete().eq('id', id);
    if (error) throw error;
}
