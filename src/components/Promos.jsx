import { Tag, Clock, Flame, MessageCircle } from 'lucide-react';

// ── Datos de promociones ────────────────────────────────────────────────────
// El administrador puede editar este array para agregar, quitar o modificar
// las promociones que aparecen en esta sección.
// ────────────────────────────────────────────────────────────────────────────
const promos = [
    {
        id: 1,
        badge: '🔥 Flash Sale',
        badgeColor: 'bg-primary/10 text-primary',
        title: 'RTX 4060 Gaming',
        desc: 'La GPU del momento para 1080p y 1440p. Stock muy limitado.',
        price: 'Bs. 2.800',
        oldPrice: 'Bs. 3.300',
        discount: '-15%',
        image: '/banners/banner1.jpg',
        limited: true,
        whatsapp: 'Hola, quiero información sobre la RTX 4060 en oferta',
    },
    {
        id: 2,
        badge: '⚡ Oferta especial',
        badgeColor: 'bg-blue/10 text-blue',
        title: 'Laptops Gamer',
        desc: 'Acer Nitro 5 y ASUS VivoBook con Core i7, 16GB RAM y RTX 3050.',
        price: 'Desde Bs. 4.900',
        oldPrice: null,
        discount: null,
        image: '/banners/banner2.jpg',
        limited: false,
        whatsapp: 'Hola, me interesan las laptops gamer en oferta',
    },
    {
        id: 3,
        badge: '🎁 Combo especial',
        badgeColor: 'bg-teal/10 text-teal',
        title: 'Setup Completo',
        desc: 'Monitor 27" FHD + Teclado mecánico + Mouse gamer RGB. Todo en uno.',
        price: 'Bs. 1.950',
        oldPrice: 'Bs. 2.400',
        discount: '-19%',
        image: '/banners/banner3.jpg',
        limited: true,
        whatsapp: 'Hola, quiero información sobre el combo setup completo',
    },
];

export default function Promos() {
    return (
        <section id="promociones" className="py-20 bg-bgMain">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="text-center mb-12">
                    <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Ofertas vigentes</p>
                    <h2 className="text-3xl sm:text-5xl font-black text-dark mb-4">
                        Nuestras <span className="text-primary">Promociones</span>
                    </h2>
                    <p className="text-dark/55 text-lg max-w-xl mx-auto">
                        Precios especiales por tiempo limitado. Consultá disponibilidad directo por WhatsApp.
                    </p>
                </div>

                {/* Promo grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {promos.map((promo) => (
                        <div
                            key={promo.id}
                            className="bg-white rounded-3xl overflow-hidden shadow-card border border-bgCard
                         hover:-translate-y-1 hover:shadow-cardHov transition-all duration-300 flex flex-col"
                        >
                            {/* Banner image */}
                            <div className="relative h-44 overflow-hidden">
                                <img
                                    src={promo.image}
                                    alt={promo.title}
                                    className="w-full h-full object-cover"
                                />
                                {/* Badges */}
                                <div className="absolute top-3 left-3 flex gap-2">
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm bg-white/90 ${promo.badgeColor}`}>
                                        {promo.badge}
                                    </span>
                                </div>
                                {promo.discount && (
                                    <div className="absolute top-3 right-3 bg-primary text-white text-xs font-black px-2 py-1 rounded-xl">
                                        {promo.discount}
                                    </div>
                                )}
                                {promo.limited && (
                                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm
                                  text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                                        <Clock size={11} />
                                        Últimas unidades
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-1">
                                <h3 className="text-lg font-black text-dark mb-2">{promo.title}</h3>
                                <p className="text-dark/60 text-sm leading-relaxed mb-4 flex-1">{promo.desc}</p>

                                <div className="flex items-end justify-between mb-5">
                                    <div>
                                        <div className="text-2xl font-black text-dark">{promo.price}</div>
                                        {promo.oldPrice && (
                                            <div className="text-sm text-dark/40 line-through">{promo.oldPrice}</div>
                                        )}
                                    </div>
                                    {!promo.limited && (
                                        <div className="flex items-center gap-1 text-teal text-xs font-semibold">
                                            <Tag size={12} />
                                            Disponible
                                        </div>
                                    )}
                                    {promo.limited && (
                                        <div className="flex items-center gap-1 text-primary text-xs font-semibold">
                                            <Flame size={12} />
                                            Limitado
                                        </div>
                                    )}
                                </div>

                                <a
                                    href={`https://wa.me/591XXXXXXXXX?text=${encodeURIComponent(promo.whatsapp)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl
                             bg-[#25D366] text-white font-bold text-sm hover:bg-[#1ebe5d] transition-all duration-200"
                                >
                                    <MessageCircle size={16} />
                                    Consultar por WhatsApp
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom note */}
                <p className="text-center text-dark/40 text-sm mt-8">
                    💬 Todos los precios incluyen garantía oficial. Las ofertas son por tiempo limitado y sujetas a disponibilidad.
                </p>

            </div>
        </section>
    );
}
