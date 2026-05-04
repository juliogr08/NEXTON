import { Globe, Share2, MessageCircle } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#1a1a2e] text-white mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid md:grid-cols-3 gap-10">

                {/* Brand */}
                <div>
                    <div className="flex items-center mb-4">
                        <img src="logo.png" alt="NextOn" className="h-12 w-auto object-contain" />
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                        Tu tienda de confianza para hardware, laptops y periféricos gaming. Calidad garantizada.
                    </p>
                    <div className="flex gap-3 mt-5">
                        <a href="#" className="w-9 h-9 rounded-xl bg-white/10 hover:bg-primary/80 flex items-center justify-center transition-colors" aria-label="Redes sociales">
                            <Share2 size={16} />
                        </a>
                        <a href="https://wa.me/591XXXXXXXXX" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#25D366] flex items-center justify-center transition-colors" aria-label="WhatsApp">
                            <MessageCircle size={16} />
                        </a>
                        <a href="#" className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" aria-label="Sitio web">
                            <Globe size={16} />
                        </a>
                    </div>
                </div>

                {/* Links */}
                <div>
                    <h4 className="font-bold text-sm mb-4 text-white/70 uppercase tracking-widest">Categorías</h4>
                    <ul className="space-y-2">
                        {['Laptops', 'Monitores', 'Componentes', 'Periféricos'].map(l => (
                            <li key={l}>
                                <a href="#catalogo" className="text-white/50 hover:text-teal text-sm transition-colors">{l}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="font-bold text-sm mb-4 text-white/70 uppercase tracking-widest">Contacto</h4>
                    <ul className="space-y-2 text-white/50 text-sm">
                        <li>📍 Bolivia</li>
                        <li>📞 +591 XXX-XXXXX</li>
                        <li>⏰ Lun–Sáb: 9:00 – 19:00</li>
                    </ul>
                    <a
                        href="https://wa.me/591XXXXXXXXX"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-5 bg-[#25D366] text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-[#1ebe5d] transition-colors"
                    >
                        <MessageCircle size={15} />
                        Escribir por WhatsApp
                    </a>
                </div>
            </div>

            <div className="border-t border-white/10 py-5 px-4 text-center text-white/30 text-xs">
                © {new Date().getFullYear()} NextOn – Todos los derechos reservados.
            </div>
        </footer>
    );
}
