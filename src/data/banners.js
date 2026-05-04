// ── Banner de Promociones ───────────────────────────────────────────────────
// Para agregar o cambiar banners el administrador debe:
//   1. Subir la imagen a public/banners/  (formato JPG/PNG, ancho ~1400px)
//   2. Agregar un objeto al array con { image, alt, promoId }
// Al hacer clic en el banner se navega a la sección #promociones.
// ────────────────────────────────────────────────────────────────────────────

export const banners = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=1400&q=80',
        alt: 'Flash Sale — RTX 4060 al mejor precio, stock limitado',
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=1400&q=80',
        alt: 'Laptops Gamer desde Bs. 4.900 — Acer, ASUS, HP',
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1400&q=1400&q=80',
        alt: 'Armá tu setup completo — combo Monitor + Teclado + Mouse',
    },
];
