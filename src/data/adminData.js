// ───────────────────────────────────────────────
// Mock data for the NextOn Admin Panel (Phase 1)
// ───────────────────────────────────────────────

export const STOCK_STATES = {
    NORMAL: 'normal',
    LOW: 'low',
    OUT: 'out',
    HIDDEN: 'hidden',
};

export const stockLabels = {
    [STOCK_STATES.NORMAL]: 'Normal',
    [STOCK_STATES.LOW]: 'Últimas Unidades',
    [STOCK_STATES.OUT]: 'Agotado',
    [STOCK_STATES.HIDDEN]: 'Oculto',
};

export const stockColors = {
    [STOCK_STATES.NORMAL]: { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    [STOCK_STATES.LOW]: { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' },
    [STOCK_STATES.OUT]: { bg: 'bg-gray-200', text: 'text-gray-600', dot: 'bg-gray-400' },
    [STOCK_STATES.HIDDEN]: { bg: 'bg-zinc-800', text: 'text-zinc-200', dot: 'bg-zinc-400' },
};

export const adminCategories = [
    { id: 1, nombre: 'Laptops', productos: 2, icono: '💻' },
    { id: 2, nombre: 'Monitores', productos: 2, icono: '🖥️' },
    { id: 3, nombre: 'Componentes', productos: 3, icono: '🔧' },
    { id: 4, nombre: 'Periféricos', productos: 3, icono: '🖱️' },
];

export const adminProducts = [
    {
        id: 1,
        nombre: 'Laptop Gamer Acer Nitro 5',
        precio: 7500,
        categoria: 'Laptops',
        estado: STOCK_STATES.NORMAL,
        imagen: 'https://placehold.co/80x80/e0e0e0/3a3a3a?text=Nitro5',
        descripcion: 'Laptop gamer con procesador Intel Core i7 de 11va generación y gráficos NVIDIA RTX 3050, ideal para los juegos más exigentes.',
        specs: [
            { key: 'Procesador', value: 'Intel Core i7-11800H' },
            { key: 'RAM', value: '16GB DDR4 3200MHz' },
            { key: 'GPU', value: 'NVIDIA RTX 3050 4GB' },
            { key: 'Almacenamiento', value: 'SSD 512GB NVMe' },
        ],
    },
    {
        id: 2,
        nombre: 'Monitor Samsung Odyssey 27"',
        precio: 1850,
        categoria: 'Monitores',
        estado: STOCK_STATES.LOW,
        imagen: 'https://placehold.co/80x80/e0e0e0/3a3a3a?text=Odyssey',
        descripcion: 'Monitor gaming de 27 pulgadas con panel IPS, 144Hz y 1ms de respuesta. Perfecto para e-sports y contenido multimedia.',
        specs: [
            { key: 'Panel', value: 'IPS 27"' },
            { key: 'Refresco', value: '144Hz' },
            { key: 'Respuesta', value: '1ms MPRT' },
        ],
    },
    {
        id: 3,
        nombre: 'GPU NVIDIA RTX 4060 8GB',
        precio: 3200,
        categoria: 'Componentes',
        estado: STOCK_STATES.NORMAL,
        imagen: 'https://placehold.co/80x80/e0e0e0/3a3a3a?text=RTX4060',
        descripcion: 'Tarjeta gráfica de última generación con arquitectura Ada Lovelace, Ray Tracing y DLSS 3 para un rendimiento excepcional.',
        specs: [
            { key: 'Memoria', value: '8GB GDDR6' },
            { key: 'Arquitectura', value: 'Ada Lovelace' },
            { key: 'Ray Tracing', value: 'Sí - DLSS 3' },
        ],
    },
    {
        id: 4,
        nombre: 'Teclado Mecánico Redragon K552',
        precio: 320,
        categoria: 'Periféricos',
        estado: STOCK_STATES.OUT,
        imagen: 'https://placehold.co/80x80/e0e0e0/3a3a3a?text=K552',
        descripcion: 'Teclado mecánico compacto TKL con switches Outemu Red, construcción robusta en metal y retroiluminación LED.',
        specs: [
            { key: 'Switches', value: 'Outemu Red' },
            { key: 'Formato', value: 'TKL 87 teclas' },
            { key: 'Iluminación', value: 'LED Roja' },
        ],
    },
    {
        id: 5,
        nombre: 'Headset HyperX Cloud Alpha',
        precio: 650,
        categoria: 'Periféricos',
        estado: STOCK_STATES.HIDDEN,
        imagen: 'https://placehold.co/80x80/e0e0e0/3a3a3a?text=CloudA',
        descripcion: 'Auriculares gaming con diseño de cámara doble para un audio superior, micrófono desmontable y comodidad para largas sesiones.',
        specs: [
            { key: 'Drivers', value: '50mm Dual Chamber' },
            { key: 'Audio', value: '7.1 Surround' },
            { key: 'Micrófono', value: 'Desmontable' },
        ],
    },
    {
        id: 6,
        nombre: 'SSD NVMe Samsung 970 EVO 1TB',
        precio: 480,
        categoria: 'Componentes',
        estado: STOCK_STATES.LOW,
        imagen: 'https://placehold.co/80x80/e0e0e0/3a3a3a?text=970EVO',
        descripcion: 'Unidad de estado sólido NVMe M.2 con velocidades de lectura de hasta 3,500 MB/s. Ideal para gaming y edición de video.',
        specs: [
            { key: 'Capacidad', value: '1TB' },
            { key: 'Lectura', value: '3,500 MB/s' },
            { key: 'Interfaz', value: 'PCIe Gen 3.0 x4' },
        ],
    },
    {
        id: 7,
        nombre: 'Laptop ASUS VivoBook 15',
        precio: 4900,
        categoria: 'Laptops',
        estado: STOCK_STATES.NORMAL,
        imagen: 'https://placehold.co/80x80/e0e0e0/3a3a3a?text=Vivo15',
        descripcion: 'Laptop versátil para trabajo y entretenimiento con procesador AMD Ryzen 5, pantalla NanoEdge y diseño ultraligero.',
        specs: [
            { key: 'Procesador', value: 'AMD Ryzen 5 5500U' },
            { key: 'RAM', value: '8GB DDR4' },
            { key: 'Almacenamiento', value: 'SSD 512GB NVMe' },
        ],
    },
    {
        id: 8,
        nombre: 'Mouse Gamer Logitech G502 Hero',
        precio: 520,
        categoria: 'Periféricos',
        estado: STOCK_STATES.NORMAL,
        imagen: 'https://placehold.co/80x80/e0e0e0/3a3a3a?text=G502',
        descripcion: 'Ratón gaming de alto rendimiento con sensor HERO 25K, 11 botones programables y sistema de pesas ajustable.',
        specs: [
            { key: 'Sensor', value: 'HERO 25K' },
            { key: 'Botones', value: '11 programables' },
            { key: 'Peso', value: 'Ajustable (5x 3.6g)' },
        ],
    },
];

export const adminBanners = [
    { id: 1, titulo: 'Laptops en Oferta', activo: true, imagen: 'https://placehold.co/600x200/1A3C6E/ffffff?text=Laptops+en+Oferta' },
    { id: 2, titulo: 'Componentes Gamer', activo: true, imagen: 'https://placehold.co/600x200/E8232C/ffffff?text=Componentes+Gamer' },
    { id: 3, titulo: 'Periféricos 2x1', activo: false, imagen: 'https://placehold.co/600x200/18181B/ffffff?text=Perifericos+2x1' },
];
