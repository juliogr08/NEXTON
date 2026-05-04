export const mockProducts = [
    {
        id: 1,
        nombre: "Monitor Samsung Odyssey 27\"",
        categoria: "Monitores",
        precio: 1850,
        estado_stock: 1,
        specs: ["144Hz", "1ms", "Panel IPS"],
        imagen: "https://placehold.co/400x300/e0e0e0/3a3a3a?text=Monitor",
        imagenes: [
            "https://placehold.co/800x600/e0e0e0/3a3a3a?text=Monitor+Vista+Frontal",
            "https://placehold.co/800x600/e0e0e0/3a3a3a?text=Monitor+Vista+Trasera",
            "https://placehold.co/800x600/e0e0e0/3a3a3a?text=Monitor+Conexiones"
        ],
        descripcion: "Experimenta un juego fluido y sin interrupciones con este monitor diseñado para e-sports. Con una frecuencia de actualización de 144Hz y un tiempo de respuesta de 1ms, nunca te perderás de la acción. El panel IPS garantiza colores vivos desde cualquier ángulo.",
        componentes: [
            "Panel IPS de 27 pulgadas",
            "Resolución Full HD (1920x1080)",
            "Frecuencia de actualización 144Hz",
            "Tiempo de respuesta 1ms (MPRT)",
            "AMD FreeSync Premium",
            "2x HDMI, 1x DisplayPort, 1x Audio Out"
        ]
    },
    {
        id: 2,
        nombre: "Laptop Gamer Acer Nitro 5",
        categoria: "Laptops",
        precio: 7500,
        estado_stock: 2,
        specs: ["Core i7", "16GB RAM", "RTX 3050"],
        imagen: "https://placehold.co/400x300/e0e0e0/3a3a3a?text=Laptop",
        imagenes: [
            "https://placehold.co/800x600/e0e0e0/3a3a3a?text=Acer+Nitro+Frontal",
            "https://placehold.co/800x600/e0e0e0/3a3a3a?text=Acer+Nitro+Teclado",
            "https://placehold.co/800x600/e0e0e0/3a3a3a?text=Acer+Nitro+Lado"
        ],
        descripcion: "Domina el juego con la Acer Nitro 5. Equipada con un procesador Intel Core i7 de 11va Generación y gráficos NVIDIA GeForce RTX 3050, esta laptop te brinda el rendimiento que necesitas para los juegos más exigentes de hoy.",
        componentes: [
            "Procesador Intel Core i7-11800H",
            "Memoria RAM 16GB DDR4 3200MHz",
            "Almacenamiento SSD 512GB NVMe PCIe",
            "Tarjeta Gráfica NVIDIA GeForce RTX 3050 4GB",
            "Pantalla 15.6\" FHD IPS 144Hz",
            "Teclado retroiluminado RGB"
        ]
    },
    {
        id: 3,
        nombre: "Memoria RAM Kingston Fury 8GB",
        categoria: "Componentes",
        precio: 250,
        estado_stock: 1,
        specs: ["3200MHz", "DDR4", "RGB"],
        imagen: "https://placehold.co/400x300/e0e0e0/3a3a3a?text=RAM",
        imagenes: [
            "https://placehold.co/800x600/e0e0e0/3a3a3a?text=RAM+Kingston+Fury",
            "https://placehold.co/800x600/e0e0e0/3a3a3a?text=RAM+RGB+Encendido"
        ],
        descripcion: "Mejora el rendimiento de tu sistema y dale un toque de estilo con la memoria RAM Kingston Fury Beast RGB. Con velocidades de 3200MHz, es la actualización ideal para gamers y creadores de contenido.",
        componentes: [
            "Capacidad 8GB (1x8GB)",
            "Tipo de memoria DDR4",
            "Velocidad 3200MHz",
            "Iluminación RGB personalizable",
            "Disipador de calor de perfil bajo",
            "Compatible con Intel XMP y AMD Ryzen"
        ]
    },
    {
        id: 4,
        nombre: "SSD NVMe Samsung 970 EVO 1TB",
        categoria: "Componentes",
        precio: 480,
        estado_stock: 2,
        specs: ["3500MB/s", "NVMe", "Form M.2"],
        imagen: "https://placehold.co/400x300/e0e0e0/3a3a3a?text=SSD",
        imagenes: [
            "https://placehold.co/800x600/e0e0e0/3a3a3a?text=SSD+Samsung+M.2",
            "https://placehold.co/800x600/e0e0e0/3a3a3a?text=SSD+Packaging"
        ],
        descripcion: "Experimenta velocidades de lectura y escritura ultrarrápidas con el SSD Samsung 970 EVO Plus NVMe M.2. Ideal para juegos pesados, edición de video 4K y flujos de trabajo intensivos.",
        componentes: [
            "Capacidad 1TB",
            "Factor de forma M.2 (2280)",
            "Interfaz PCIe Gen 3.0 x4, NVMe 1.3",
            "Velocidad de lectura secuencial hasta 3,500 MB/s",
            "Velocidad de escritura secuencial hasta 3,300 MB/s",
            "Tecnología V-NAND"
        ]
    },
    {
        id: 5,
        nombre: "Teclado Mecánico Redragon K552",
        categoria: "Periféricos",
        precio: 320,
        estado_stock: 1,
        specs: ["Switch Red", "TKL", "Anti-ghosting"],
        imagen: "https://placehold.co/400x300/e0e0e0/3a3a3a?text=Teclado",
        imagenes: [
            "https://placehold.co/800x600/e0e0e0/3a3a3a?text=Teclado+Redragon",
            "https://placehold.co/800x600/e0e0e0/3a3a3a?text=Teclado+Detalle+Switch",
            "https://placehold.co/800x600/e0e0e0/3a3a3a?text=Teclado+RGB"
        ],
        descripcion: "El Redragon K552 Kumara es un teclado mecánico TKL (Tenkeyless) robusto y compacto. Equipado con switches mecánicos Outemu Red para una respuesta lineal y silenciosa, es perfecto para largas sesiones de juego.",
        componentes: [
            "Formato TKL (Tenkeyless) 87 teclas",
            "Switches mecánicos Outemu Red (Lineales)",
            "Retroiluminación LED Roja",
            "Construcción en metal y ABS",
            "100% Anti-Ghosting con Full Key Rollover",
            "Cable USB enchapado en oro"
        ]
    },
    {
        id: 6,
        nombre: "Mouse Gamer Logitech G502 Hero",
        categoria: "Periféricos",
        precio: 520,
        estado_stock: 2,
        specs: ["25K DPI", "11 Botones", "RGB"],
        imagen: "https://placehold.co/400x300/e0e0e0/3a3a3a?text=Mouse",
        imagenes: [
            "https://placehold.co/800x600/e0e0e0/3a3a3a?text=Mouse+G502",
            "https://placehold.co/800x600/e0e0e0/3a3a3a?text=Mouse+Botones",
            "https://placehold.co/800x600/e0e0e0/3a3a3a?text=Mouse+Pesas"
        ],
        descripcion: "El ratón para juegos de alto rendimiento favorito de todos, ahora con el sensor HERO 25K para una máxima precisión y seguimiento. Personaliza su peso y equilibrio, y programa sus 11 botones a tu medida.",
        componentes: [
            "Sensor óptico HERO 25K",
            "Resolución: 100 - 25,600 DPI",
            "11 botones programables",
            "Sistema de pesas ajustable (5x 3.6g)",
            "Iluminación RGB LIGHTSYNC",
            "Rueda de desplazamiento superrápida con dos modos"
        ]
    },
    {
        id: 7,
        nombre: "GPU NVIDIA RTX 4060 8GB",
        categoria: "Componentes",
        precio: 3200,
        estado_stock: 2,
        specs: ["8GB GDDR6", "DLSS 3", "Ray Tracing"],
        imagen: "https://placehold.co/400x300/e0e0e0/3a3a3a?text=GPU",
        imagenes: [
            "https://placehold.co/800x600/e0e0e0/3a3a3a?text=GPU+RTX+4060",
            "https://placehold.co/800x600/e0e0e0/3a3a3a?text=GPU+Ventiladores",
            "https://placehold.co/800x600/e0e0e0/3a3a3a?text=GPU+Conectores"
        ],
        descripcion: "Juega, haz streaming y crea con la NVIDIA GeForce RTX 4060. Basada en la ultra eficiente arquitectura NVIDIA Ada Lovelace, experimenta Ray Tracing de alta velocidad y rendimiento acelerado por IA con DLSS 3.",
        componentes: [
            "Arquitectura NVIDIA Ada Lovelace",
            "8GB de memoria GDDR6 a 128-bit",
            "NVIDIA DLSS 3 y Ray Tracing",
            "Conectores: 3x DisplayPort 1.4a, 1x HDMI 2.1a",
            "Diseño de refrigeración de doble ventilador",
            "Fuente de alimentación recomendada: 550W"
        ]
    },
    {
        id: 8,
        nombre: "Laptop ASUS VivoBook 15",
        categoria: "Laptops",
        precio: 4900,
        estado_stock: 1,
        specs: ["Ryzen 5", "8GB RAM", "512GB SSD"],
        imagen: "https://placehold.co/400x300/e0e0e0/3a3a3a?text=VivoBook",
        imagenes: [
            "https://placehold.co/800x600/e0e0e0/3a3a3a?text=VivoBook+Frontal",
            "https://placehold.co/800x600/e0e0e0/3a3a3a?text=VivoBook+Perfil",
            "https://placehold.co/800x600/e0e0e0/3a3a3a?text=VivoBook+Teclado"
        ],
        descripcion: "Ya sea para el trabajo o el juego, ASUS VivoBook 15 es la laptop de entrada que ofrece un rendimiento potente y efectos visuales envolventes. Su pantalla NanoEdge cuenta con amplios ángulos de visión.",
        componentes: [
            "Procesador AMD Ryzen 5 5500U",
            "Memoria RAM 8GB DDR4",
            "Almacenamiento SSD 512GB PCIe NVMe",
            "Pantalla 15.6\" FHD (1920x1080) antirreflejos",
            "Gráficos integrados AMD Radeon",
            "Teclado ergonómico de tamaño completo"
        ]
    },
    {
        id: 9,
        nombre: "Headset HyperX Cloud Alpha",
        categoria: "Periféricos",
        precio: 650,
        estado_stock: 1,
        specs: ["7.1 Surround", "Micrófono", "50mm"],
        imagen: "https://placehold.co/400x300/e0e0e0/3a3a3a?text=Headset",
        imagenes: [
            "https://placehold.co/800x600/e0e0e0/3a3a3a?text=Headset+Cloud+Alpha",
            "https://placehold.co/800x600/e0e0e0/3a3a3a?text=Headset+Detalle+Mic",
            "https://placehold.co/800x600/e0e0e0/3a3a3a?text=Headset+Diadema"
        ],
        descripcion: "El revolucionario diseño de cámara doble de los HyperX Cloud Alpha te ofrece un audio con mayor distinción y claridad al reducir la distorsión. Comodidad característica de HyperX para largas sesiones.",
        componentes: [
            "Controladores de cámara doble de 50 mm",
            "Sonido envolvente 7.1 virtual",
            "Marco de aluminio duradero con diadema expandida",
            "Cable trenzado extraíble con control de audio integrado",
            "Micrófono extraíble con cancelación de ruido",
            "Compatibilidad multiplataforma"
        ]
    },
    {
        id: 10,
        nombre: "Monitor Curvo LG 32\" UltraWide",
        categoria: "Monitores",
        precio: 2100,
        estado_stock: 2,
        specs: ["2560x1080", "75Hz", "FreeSync"],
        imagen: "https://placehold.co/400x300/e0e0e0/3a3a3a?text=UltraWide",
        imagenes: [
            "https://placehold.co/800x600/e0e0e0/3a3a3a?text=Monitor+LG+Curvo",
            "https://placehold.co/800x600/e0e0e0/3a3a3a?text=Monitor+LG+Perfil",
            "https://placehold.co/800x600/e0e0e0/3a3a3a?text=Monitor+LG+Conexiones"
        ],
        descripcion: "Aumenta tu productividad y sumérgete en tus juegos con la pantalla ultra ancha 21:9. La curvatura te envuelve, proporcionando un campo de visión más amplio y reduciendo la fatiga visual.",
        componentes: [
            "Pantalla curva de 32 pulgadas 21:9",
            "Resolución WFHD (2560 x 1080)",
            "Panel VA con sRGB 95%",
            "Frecuencia de actualización 75Hz",
            "AMD FreeSync",
            "Modo Juego y Black Stabilizer"
        ]
    }
];

export const categories = ["Todos", "Laptops", "Monitores", "Componentes", "Periféricos"];
