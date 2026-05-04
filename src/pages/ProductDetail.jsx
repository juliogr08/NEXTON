import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Check, ShieldCheck, Truck } from 'lucide-react';
import { mockProducts } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addItem } = useCart();
    
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        const foundProduct = mockProducts.find(p => p.id === parseInt(id));
        if (foundProduct) {
            setProduct(foundProduct);
            setMainImage(foundProduct.imagen);
        }
        setLoading(false);
    }, [id]);

    if (loading) return <div className="min-h-[60vh] flex items-center justify-center text-dark">Cargando producto...</div>;
    
    if (!product) return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
            <h2 className="text-3xl font-black text-dark">Producto no encontrado</h2>
            <p className="text-dark/60 max-w-md">Lo sentimos, el producto que buscas no existe o ha sido removido del catálogo.</p>
            <button onClick={() => navigate('/')} className="btn-primary px-6 py-3 mt-4">
                Volver al inicio
            </button>
        </div>
    );

    const formatPrice = (price) =>
        new Intl.NumberFormat('es-BO', { style: 'currency', currency: 'BOB', minimumFractionDigits: 0 }).format(price);

    const isLowStock = product.estado_stock === 2;

    const handleBuyNow = () => {
        addItem(product);
        // Podríamos redirigir al carrito o abrir el drawer, por ahora solo añadimos
        const drawerBtn = document.getElementById('cart-toggle-btn');
        if (drawerBtn) drawerBtn.click();
    };

    // Colección completa de imágenes para la galería
    const allImages = [product.imagen, ...(product.imagenes || [])];

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
            {/* Back button */}
            <button 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-dark/60 hover:text-primary transition-colors font-semibold text-sm mb-8"
            >
                <ArrowLeft size={16} />
                Volver al catálogo
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                
                {/* Left Column: Images */}
                <div className="flex flex-col gap-4">
                    {/* Main Image */}
                    <div className="bg-white rounded-3xl p-6 flex items-center justify-center shadow-card border border-bgCard/50 aspect-[4/3] overflow-hidden">
                        <img 
                            src={mainImage} 
                            alt={product.nombre} 
                            className="w-full h-full object-contain mix-blend-multiply"
                        />
                    </div>
                    
                    {/* Thumbnails */}
                    {allImages.length > 1 && (
                        <div className="grid grid-cols-4 gap-3 sm:gap-4">
                            {allImages.map((img, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => setMainImage(img)}
                                    className={`bg-white rounded-xl p-2 aspect-square border-2 flex items-center justify-center overflow-hidden transition-all ${
                                        mainImage === img ? 'border-primary shadow-glow' : 'border-transparent hover:border-bgCard'
                                    }`}
                                >
                                    <img src={img} alt={`Vista ${idx + 1}`} className="w-full h-full object-contain mix-blend-multiply" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Column: Product Info */}
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-teal uppercase tracking-widest mb-2">{product.categoria}</span>
                    <h1 className="text-3xl md:text-4xl font-black text-dark leading-tight mb-4">
                        {product.nombre}
                    </h1>

                    {/* Stock Status */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className={`px-3 py-1 text-xs font-bold rounded-full border ${isLowStock ? 'bg-primary/10 text-primary border-primary/20' : 'bg-teal/10 text-teal border-teal/20'}`}>
                            {isLowStock ? '¡Últimas unidades!' : 'En Stock'}
                        </div>
                        <span className="text-sm text-dark/50">SKU: NX-{product.id.toString().padStart(4, '0')}</span>
                    </div>

                    {/* Price */}
                    <div className="mb-8">
                        <div className="text-4xl md:text-5xl font-black text-dark">{formatPrice(product.precio)}</div>
                        <div className="text-sm text-dark/50 mt-1">Precio incluye impuestos</div>
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-dark mb-2">Descripción</h3>
                        <p className="text-dark/70 leading-relaxed">
                            {product.descripcion || 'Producto de alta calidad disponible en NextOn. Mejora tu experiencia con lo último en tecnología.'}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-10 pb-10 border-b border-dark/10">
                        <button 
                            onClick={handleBuyNow}
                            className="flex-1 btn-primary text-base py-4 flex items-center justify-center gap-2 shadow-glow"
                        >
                            Comprar Ahora
                        </button>
                        <button 
                            onClick={() => addItem(product)}
                            className="flex-1 btn-secondary text-base py-4 flex items-center justify-center gap-2"
                        >
                            <ShoppingCart size={20} />
                            Añadir al Carrito
                        </button>
                    </div>

                    {/* Specifications / Components */}
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-dark mb-4">Especificaciones Técnicas</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {(product.componentes || product.specs).map((comp, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                    <Check size={18} className="text-teal shrink-0 mt-0.5" />
                                    <span className="text-sm text-dark/80">{comp}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Guarantees */}
                    <div className="bg-bgCard/50 rounded-2xl p-5 grid grid-cols-2 gap-4 mt-auto">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shrink-0 shadow-sm">
                                <ShieldCheck size={20} />
                            </div>
                            <span className="text-xs font-bold text-dark leading-tight">Garantía oficial<br/>de 1 año</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-teal shrink-0 shadow-sm">
                                <Truck size={20} />
                            </div>
                            <span className="text-xs font-bold text-dark leading-tight">Envíos seguros<br/>a todo el país</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
