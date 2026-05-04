import { ArrowRight, Cpu, Monitor, ShieldCheck } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] min-h-[92vh] flex items-center">

            {/* Decorative grid */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Glowing orbs */}
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 right-0 w-80 h-80 rounded-full bg-teal/10 blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue/5 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 grid lg:grid-cols-2 gap-12 items-center w-full">

                {/* Left content */}
                <div className="text-white">
                    <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6 text-sm font-medium text-teal backdrop-blur-sm">
                        <img src="/logo.png" alt="" className="h-5 w-5 object-contain" />
                        Hardware &amp; Computadoras Premium
                    </div>

                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
                        Activa tu{' '}
                        <span className="relative">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#ff6b6b]">
                                setup
                            </span>
                        </span>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-[#00a8b5]">
                            ideal.
                        </span>
                    </h1>

                    <p className="text-white/60 text-lg sm:text-xl max-w-lg mb-10 leading-relaxed">
                        Los mejores componentes, laptops y periféricos gaming al mejor precio. Cotización directa por WhatsApp, sin rodeos.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <a
                            href="#catalogo"
                            className="group inline-flex items-center gap-2.5 bg-primary text-white font-bold px-8 py-4 rounded-2xl
                         text-lg transition-all duration-300 hover:shadow-glow hover:-translate-y-0.5"
                        >
                            Ver Catálogo
                            <ArrowRight size={20} className="transition-transform duration-200 group-hover:translate-x-1" />
                        </a>
                        <a
                            href="https://wa.me/591XXXXXXXXX"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-semibold
                         px-8 py-4 rounded-2xl text-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                        >
                            Consultar ahora
                        </a>
                    </div>

                    {/* Stats */}
                    <div className="mt-14 flex flex-wrap gap-8">
                        {[
                            { icon: Cpu, value: '500+', label: 'Productos' },
                            { icon: Monitor, value: '24/7', label: 'Soporte' },
                            { icon: ShieldCheck, value: '100%', label: 'Garantía' },
                        ].map(({ icon: Icon, value, label }) => (
                            <div key={label} className="flex items-center gap-3 text-white">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                    <Icon size={18} className="text-teal" />
                                </div>
                                <div>
                                    <div className="text-xl font-black">{value}</div>
                                    <div className="text-white/50 text-xs">{label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right visual */}
                <div className="hidden lg:flex items-center justify-center">
                    <div className="relative w-[420px] h-[420px]">
                        {/* Rings */}
                        <div className="absolute inset-0 rounded-full border border-white/5 animate-spin" style={{ animationDuration: '30s' }} />
                        <div className="absolute inset-8 rounded-full border border-teal/10 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
                        <div className="absolute inset-16 rounded-full border border-primary/20 animate-spin" style={{ animationDuration: '15s' }} />

                        {/* Center glow box */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-56 h-56 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-2xl">
                                <div className="text-center px-4">
                                    <img
                                        src="/logo.png"
                                        alt="NextOn"
                                        className="w-32 h-32 object-contain mx-auto drop-shadow-[0_0_16px_rgba(232,35,44,0.6)]"
                                    />
                                    <div className="text-teal text-xs mt-2 font-medium tracking-widest uppercase">Activa Tu Futuro</div>
                                </div>
                            </div>
                        </div>

                        {/* Floating badges */}
                        {[
                            { label: 'RTX 4060', sub: 'GPU Gaming', pos: 'top-4 right-0', color: 'text-primary' },
                            { label: '144Hz', sub: 'Monitor', pos: 'bottom-12 left-0', color: 'text-teal' },
                            { label: 'NVMe SSD', sub: '3500MB/s', pos: 'bottom-0 right-8', color: 'text-blue-300' },
                        ].map(({ label, sub, pos, color }) => (
                            <div
                                key={label}
                                className={`absolute ${pos} bg-white/10 border border-white/20 backdrop-blur-md rounded-xl px-3 py-2 shadow-xl`}
                            >
                                <div className={`text-sm font-bold ${color}`}>{label}</div>
                                <div className="text-white/50 text-xs">{sub}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-10 sm:h-16">
                    <path d="M0,60 C360,0 1080,0 1440,60 L1440,60 L0,60 Z" fill="#F9F9F9" />
                </svg>
            </div>
        </section>
    );
}
