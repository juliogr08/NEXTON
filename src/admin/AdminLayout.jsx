import { useState } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { 
    LayoutDashboard, Package, Layers, Image, LogOut, Menu, X, ChevronRight 
} from 'lucide-react';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminCategories from './pages/AdminCategories';
import AdminBanners from './pages/AdminBanners';

const sidebarLinks = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/admin/productos', icon: Package, label: 'Productos' },
    { to: '/admin/categorias', icon: Layers, label: 'Categorías' },
    { to: '/admin/banners', icon: Image, label: 'Banners' },
];

export default function AdminLayout({ onLogout }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="admin-layout flex min-h-screen bg-[#F4F4F5]">

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden animate-fade-in" 
                    onClick={() => setSidebarOpen(false)} 
                />
            )}

            {/* Sidebar */}
            <aside className={`
                admin-sidebar fixed lg:sticky top-0 left-0 z-50 h-screen w-64 
                bg-[#18181B] text-white flex flex-col transition-transform duration-300
                lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Logo */}
                <div className="flex items-center justify-between px-6 h-16 border-b border-white/10 shrink-0">
                    <div className="flex items-center gap-2.5">
                        <img src="/logo.png" alt="NextOn" className="h-8 w-auto object-contain" />
                        <span className="text-lg font-black tracking-tight">
                            Next<span className="text-[#E8232C]">O</span>n
                        </span>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/60 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                {/* Nav links */}
                <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                    {sidebarLinks.map(({ to, icon: Icon, label, end }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={end}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) => `
                                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                                ${isActive 
                                    ? 'bg-white/10 text-white shadow-sm' 
                                    : 'text-white/50 hover:text-white hover:bg-white/5'
                                }
                            `}
                        >
                            <Icon size={18} />
                            {label}
                            <ChevronRight size={14} className="ml-auto opacity-40" />
                        </NavLink>
                    ))}
                </nav>

                {/* Footer */}
                <div className="px-3 pb-4 border-t border-white/10 pt-4 space-y-1">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all w-full"
                    >
                        <LogOut size={18} />
                        Ir a la Tienda
                    </button>
                    <button
                        onClick={() => { onLogout?.(); navigate('/admin/login'); }}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all w-full"
                    >
                        <LogOut size={18} />
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top bar */}
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-zinc-200 h-16 flex items-center px-4 sm:px-6 gap-4 shrink-0">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden p-2 rounded-lg hover:bg-zinc-100 transition-colors"
                    >
                        <Menu size={20} />
                    </button>
                    <div className="flex items-center gap-3 ml-auto">
                        <div className="w-8 h-8 rounded-full bg-[#1A3C6E] text-white flex items-center justify-center text-xs font-bold">
                            AD
                        </div>
                        <span className="text-sm font-semibold text-zinc-700 hidden sm:block">Admin</span>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                    <Routes>
                        <Route index element={<AdminDashboard />} />
                        <Route path="productos" element={<AdminProducts />} />
                        <Route path="categorias" element={<AdminCategories />} />
                        <Route path="banners" element={<AdminBanners />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
}
