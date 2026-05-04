import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';

const MOCK_CREDENTIALS = {
    email: 'admin@nexton.bo',
    password: 'admin123',
};

export default function AdminLogin({ onLogin }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!email.trim() || !password.trim()) {
            setError('Por favor completa todos los campos.');
            return;
        }

        setLoading(true);

        // Simulate API delay
        setTimeout(() => {
            if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
                onLogin();
                navigate('/admin');
            } else {
                setError('Credenciales incorrectas. Intenta de nuevo.');
            }
            setLoading(false);
        }, 800);
    };

    return (
        <div className="min-h-screen bg-[#F4F4F5] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#1A3C6E]/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#E8232C]/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

            <div className="relative w-full max-w-md">
                {/* Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-zinc-200/60 overflow-hidden">
                    
                    {/* Header */}
                    <div className="bg-[#18181B] px-8 py-10 text-center relative overflow-hidden">
                        {/* Subtle pattern overlay */}
                        <div className="absolute inset-0 opacity-5" 
                            style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} 
                        />
                        <div className="relative">
                            <div className="flex items-center justify-center gap-3 mb-3">
                                <img src="logo.png" alt="NextOn" className="h-10 w-auto object-contain" />
                                <span className="text-2xl font-black tracking-tight text-white">
                                    Next<span className="text-[#E8232C]">O</span>n
                                </span>
                            </div>
                            <p className="text-white/40 text-sm font-medium">Panel de Administración</p>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-5">
                        <div className="text-center mb-2">
                            <h1 className="text-xl font-bold text-zinc-900">Bienvenido de vuelta</h1>
                            <p className="text-sm text-zinc-400 mt-1">Ingresa tus credenciales para continuar</p>
                        </div>

                        {/* Error message */}
                        {error && (
                            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-[#E8232C] text-sm font-medium px-4 py-3 rounded-xl animate-fade-in">
                                <AlertCircle size={16} className="shrink-0" />
                                {error}
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-zinc-700 mb-2">Correo electrónico</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@nexton.bo"
                                autoComplete="email"
                                className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-800
                                    placeholder:text-zinc-300 focus:outline-none focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/10 transition-all"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-semibold text-zinc-700 mb-2">Contraseña</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    className="w-full px-4 py-3 pr-12 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-800
                                        placeholder:text-zinc-300 focus:outline-none focus:border-[#1A3C6E] focus:ring-2 focus:ring-[#1A3C6E]/10 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(v => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-zinc-400 hover:text-zinc-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-[#1A3C6E] text-white font-semibold py-3.5 rounded-xl
                                hover:bg-[#15325a] transition-all shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <LogIn size={18} />
                                    Iniciar Sesión
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Helper text */}
                <div className="mt-6 text-center">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-zinc-200/60 px-5 py-3 inline-block">
                        <p className="text-xs text-zinc-400">
                            <span className="font-semibold text-zinc-500">Demo:</span>{' '}
                            admin@nexton.bo / admin123
                        </p>
                    </div>
                </div>

                {/* Back to store */}
                <div className="mt-4 text-center">
                    <button
                        onClick={() => navigate('/')}
                        className="text-sm text-zinc-400 hover:text-[#1A3C6E] font-medium transition-colors"
                    >
                        ← Volver a la tienda
                    </button>
                </div>
            </div>
        </div>
    );
}
