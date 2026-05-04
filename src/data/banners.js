// ── Banner de Promociones ───────────────────────────────────────────────────
// Para agregar o cambiar banners el administrador debe:
//   1. Subir la imagen a public/banners/  (formato JPG/PNG, ancho ~1400px)
//   2. Agregar un objeto al array con { image, alt, promoId }
// Al hacer clic en el banner se navega a la sección #promociones.
// ────────────────────────────────────────────────────────────────────────────

export const banners = [
    {
        id: 1,
        image: '/banners/banner1.jpg',
        alt: 'Flash Sale — RTX 4060 al mejor precio, stock limitado',
    },
    {
        id: 2,
        image: '/banners/banner2.jpg',
        alt: 'Laptops Gamer desde Bs. 4.900 — Acer, ASUS, HP',
    },
    {
        id: 3,
        image: '/banners/banner3.jpg',
        alt: 'Armá tu setup completo — combo Monitor + Teclado + Mouse',
    },
];
