import { Shield, Cpu, HeartHandshake, Zap, Users, Award } from 'lucide-react';

const values = [
    {
        icon: Shield,
        title: 'Confianza garantizada',
        desc: 'Todos nuestros productos tienen garantía oficial. Si algo falla, lo resolvemos sin rodeos.',
        color: 'text-blue',
        bg: 'bg-blue/10',
    },
    {
        icon: Cpu,
        title: 'Hardware real',
        desc: 'Solo trabajamos con marcas reconocidas y componentes con especificaciones verificadas.',
        color: 'text-teal',
        bg: 'bg-teal/10',
    },
    {
        icon: HeartHandshake,
        title: 'Asesoría honesta',
        desc: 'Te ayudamos a armar el setup que necesitás, sin venderte lo que no te sirve.',
        color: 'text-primary',
        bg: 'bg-primary/10',
    },
];

const stats = [
    { value: '5+', label: 'Años en el mercado' },
    { value: '2', label: 'Sucursales' },
    { value: '500+', label: 'Clientes satisfechos' },
    { value: '100%', label: 'Garantía en productos' },
];

export default function AboutUs() {
    return (
        <section id="nosotros" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-xs font-bold text-teal uppercase tracking-widest mb-2">Quiénes somos</p>
                    <h2 className="text-3xl sm:text-5xl font-black text-dark mb-5">
                        Más que una tienda,<br />
                        <span className="text-primary">somos tu aliado tech.</span>
                    </h2>
                    <p className="text-dark/60 text-lg max-w-2xl mx-auto leading-relaxed">
                        NextOn nació con una misión simple: que cualquier persona en Bolivia pueda acceder al hardware que merece,
                        con asesoría real, precio justo y garantía sin letras pequeñas.
                    </p>
                </div>

                {/* Main content grid */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">

                    {/* Left — text */}
                    <div>
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
                            <Users size={15} />
                            Nuestro equipo
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-black text-dark mb-5 leading-tight">
                            Apasionados por la tecnología, comprometidos con vos.
                        </h3>
                        <p className="text-dark/60 leading-relaxed mb-5">
                            Somos un equipo de entusiastas del hardware con años de experiencia en el mercado boliviano.
                            Conocemos cada componente que vendemos porque los hemos probado, armado y recomendado para builds reales.
                        </p>
                        <p className="text-dark/60 leading-relaxed mb-8">
                            Desde un simple mouse hasta una workstation completa, nuestro objetivo es que salgas con la solución
                            exacta que necesitás, sin pagar de más.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            {stats.map(({ value, label }) => (
                                <div key={label} className="bg-bgMain rounded-2xl p-5 border border-bgCard">
                                    <div className="text-3xl font-black text-primary mb-1">{value}</div>
                                    <div className="text-sm text-dark/60 font-medium">{label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right — visual card */}
                    <div className="relative">
                        {/* Background decoration */}
                        <div className="absolute -top-6 -right-6 w-72 h-72 rounded-full bg-primary/5 blur-2xl pointer-events-none" />
                        <div className="absolute -bottom-4 -left-4 w-48 h-48 rounded-full bg-teal/5 blur-2xl pointer-events-none" />

                        <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] rounded-3xl p-8 text-white shadow-2xl">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                                    <img src="/logo.png" alt="NextOn" className="w-8 h-8 object-contain" />
                                </div>
                                <div>
                                    <div className="font-black text-xl">Next<span className="text-primary">O</span>n</div>
                                    <div className="text-white/50 text-xs">Tech Store · Bolivia</div>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                                    <Award size={18} className="text-teal shrink-0" />
                                    <div>
                                        <div className="text-sm font-semibold">Distribuidores autorizados</div>
                                        <div className="text-white/40 text-xs">Samsung, Kingston, Acer, ASUS y más</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                                    <Shield size={18} className="text-primary shrink-0" />
                                    <div>
                                        <div className="text-sm font-semibold">Garantía oficial</div>
                                        <div className="text-white/40 text-xs">Respaldo directo del fabricante</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                                    <HeartHandshake size={18} className="text-[#25D366] shrink-0" />
                                    <div>
                                        <div className="text-sm font-semibold">Soporte por WhatsApp</div>
                                        <div className="text-white/40 text-xs">Lun–Sáb de 9:00 a 19:00</div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-white/10 pt-5 text-center">
                                <div className="text-white/40 text-xs mb-1">Cotización inmediata vía</div>
                                <div className="text-[#25D366] font-bold text-sm">WhatsApp · Sin esperas</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Values */}
                <div className="grid sm:grid-cols-3 gap-6">
                    {values.map(({ icon: Icon, title, desc, color, bg }) => (
                        <div
                            key={title}
                            className="bg-bgMain rounded-2xl p-7 border border-bgCard hover:-translate-y-1 hover:shadow-card transition-all duration-300"
                        >
                            <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center mb-5`}>
                                <Icon size={22} className={color} />
                            </div>
                            <h4 className="font-bold text-dark text-base mb-2">{title}</h4>
                            <p className="text-dark/55 text-sm leading-relaxed">{desc}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
