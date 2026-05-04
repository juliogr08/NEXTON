import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { MapPin, Clock, Phone, MessageCircle } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// ── Placeholder coordinates — replace with real ones ──────────────────────
// Sucursal 1: La Paz (Centro)
// Sucursal 2: La Paz (Sur / Calacoto)  ← adjust to your real cities/addresses
const branches = [
    {
        id: 1,
        name: 'NextOn — Sucursal Centro',
        address: 'Av. Mariscal Santa Cruz #123, La Paz',
        phone: '+591 XXX-XXXXX',
        hours: 'Lun–Vie 9:00–19:00 · Sáb 9:00–14:00',
        coords: [-16.4955, -68.1336],
        color: '#E8232C',
    },
    {
        id: 2,
        name: 'NextOn — Sucursal Sur',
        address: 'Calle 21 de Calacoto #456, La Paz',
        phone: '+591 XXX-XXXXX',
        hours: 'Lun–Vie 9:00–19:00 · Sáb 9:00–14:00',
        coords: [-16.5376, -68.0704],
        color: '#1A3C6E',
    },
];

// Custom SVG marker
function makeIcon(color) {
    const svg = `
    <div style="
      width:36px;height:44px;
      display:flex;flex-direction:column;align-items:center;
    ">
      <div style="
        width:36px;height:36px;border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        background:${color};
        box-shadow:0 4px 14px ${color}88;
        display:flex;align-items:center;justify-content:center;
      ">
        <div style="transform:rotate(45deg);color:white;font-size:16px;font-weight:900;">N</div>
      </div>
    </div>`;
    return divIcon({
        html: svg,
        className: '',
        iconSize: [36, 44],
        iconAnchor: [18, 44],
        popupAnchor: [0, -44],
    });
}

const centerCoords = [-16.5165, -68.1019]; // midpoint between both branches

export default function Branches() {
    return (
        <section id="sucursales" className="py-24 bg-bgMain">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="text-center mb-14">
                    <p className="text-xs font-bold text-teal uppercase tracking-widest mb-2">Dónde encontrarnos</p>
                    <h2 className="text-3xl sm:text-5xl font-black text-dark mb-4">
                        Nuestras <span className="text-primary">Sucursales</span>
                    </h2>
                    <p className="text-dark/55 text-lg max-w-xl mx-auto">
                        Visitanos en cualquiera de nuestros locales o cotizá directo por WhatsApp y pasás a retirar.
                    </p>
                </div>

                {/* Branch cards */}
                <div className="grid sm:grid-cols-2 gap-6 mb-10">
                    {branches.map((b) => (
                        <div
                            key={b.id}
                            className="bg-white rounded-2xl shadow-card border border-bgCard overflow-hidden hover:-translate-y-1 hover:shadow-cardHov transition-all duration-300"
                        >
                            {/* Color bar */}
                            <div className="h-2 w-full" style={{ background: b.color }} />

                            <div className="p-7">
                                <div className="flex items-start gap-4 mb-5">
                                    <div
                                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg shrink-0"
                                        style={{ background: b.color }}
                                    >
                                        {b.id}
                                    </div>
                                    <div>
                                        <h3 className="font-black text-dark text-lg leading-tight">{b.name}</h3>
                                        <p className="text-dark/50 text-sm mt-0.5">Sucursal #{b.id}</p>
                                    </div>
                                </div>

                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-sm text-dark/70">
                                        <MapPin size={16} className="text-primary shrink-0" />
                                        {b.address}
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-dark/70">
                                        <Clock size={16} className="text-teal shrink-0" />
                                        {b.hours}
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-dark/70">
                                        <Phone size={16} className="text-blue shrink-0" />
                                        {b.phone}
                                    </li>
                                </ul>

                                <div className="flex gap-3 mt-6">
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${b.coords[0]},${b.coords[1]}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-bgCard text-sm font-semibold
                               text-dark hover:border-primary hover:text-primary transition-all duration-200"
                                    >
                                        <MapPin size={15} />
                                        Cómo llegar
                                    </a>
                                    <a
                                        href={`https://wa.me/591XXXXXXXXX?text=${encodeURIComponent(`Hola, quiero información sobre la ${b.name}`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#25D366] text-white text-sm font-semibold
                               hover:bg-[#1ebe5d] transition-all duration-200"
                                    >
                                        <MessageCircle size={15} />
                                        WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Map */}
                <div className="rounded-3xl overflow-hidden shadow-cardHov border border-bgCard" style={{ height: '420px' }}>
                    <MapContainer
                        center={centerCoords}
                        zoom={13}
                        style={{ height: '100%', width: '100%' }}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {branches.map((b) => (
                            <Marker key={b.id} position={b.coords} icon={makeIcon(b.color)}>
                                <Popup>
                                    <div style={{ fontFamily: 'Inter, sans-serif', minWidth: '180px' }}>
                                        <strong style={{ display: 'block', marginBottom: '4px', color: b.color }}>{b.name}</strong>
                                        <span style={{ fontSize: '12px', color: '#666' }}>{b.address}</span>
                                        <br />
                                        <span style={{ fontSize: '12px', color: '#666' }}>{b.hours}</span>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>

                {/* Tip */}
                <p className="text-center text-dark/40 text-sm mt-4">
                    💡 Hacé clic en los marcadores del mapa para ver los detalles de cada sucursal.
                </p>

            </div>
        </section>
    );
}
