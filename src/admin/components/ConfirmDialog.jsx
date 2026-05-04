import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmDialog({ title, message, onConfirm, onCancel, danger = true }) {
    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 animate-fade-in" onClick={onCancel} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm animate-fade-in">
                <div className="p-6 text-center">
                    <div className={`w-14 h-14 rounded-full ${danger ? 'bg-red-100' : 'bg-blue-100'} flex items-center justify-center mx-auto mb-4`}>
                        <AlertTriangle size={24} className={danger ? 'text-[#E8232C]' : 'text-[#1A3C6E]'} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 mb-2">{title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">{message}</p>
                </div>
                <div className="flex items-center gap-3 px-6 pb-6">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-zinc-600 bg-zinc-100 hover:bg-zinc-200 transition-all"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all ${
                            danger 
                                ? 'bg-[#E8232C] hover:bg-red-700' 
                                : 'bg-[#1A3C6E] hover:bg-[#15325a]'
                        }`}
                    >
                        Sí, eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}
