import {
  CONTACT_EMAIL_URL,
  SHOW_WHATSAPP,
  WHATSAPP_URL,
} from "./contacto";

export const categories = [
  { name: "Interior",
    path: "interior"
   }, 
  { name: "Exterior",
    path: "exterior"
   }, 
  { name: "Batería",
    path: "bateria"
   }, 
  { name: "Kits",
    path: "kits"
   }, 
  { name: "Análogas",
    path: "analogas"
   }, 
  { name: "Porteros",
    path: "porteros"
   }, 
   { name: "Almacenamiento" ,
     path: "almacenamiento"
   },
  { name: "Alarmas",
    path: "alarmas"
   }, 
]

/**
 * Título, h1 y meta description por categoría.
 *
 * Antes los tres salían del slug: el título de la pestaña decía "EXTERIOR |
 * VIGI", el h1 decía "EXTERIOR" y la descripción era la genérica de la tienda,
 * repetida igual en las ocho. Para Google eran ocho páginas casi idénticas que
 * no mencionaban ni una vez "cámara de seguridad".
 *
 * El h1 se escribe con las palabras con las que la gente busca, no con el
 * nombre interno de la categoría.
 */
export const CATEGORY_SEO: Record<
  string,
  { h1: string; title: string; description: string }
> = {
  interior: {
    h1: "Cámaras de seguridad para interior",
    title: "Cámaras de seguridad para interior | VIGI",
    description:
      "Cámaras de seguridad para interior con visión nocturna, audio y app en el celular. Hikvision, Dahua, Ezviz e Imou. Envíos a todo el país y cuotas.",
  },
  exterior: {
    h1: "Cámaras de seguridad para exterior",
    title: "Cámaras de seguridad para exterior | VIGI",
    description:
      "Cámaras de seguridad para exterior resistentes al agua, con visión nocturna y detección de movimiento. Hikvision, Dahua y Ezviz. Envíos a todo el país.",
  },
  bateria: {
    h1: "Cámaras a batería y solares",
    title: "Cámaras de seguridad a batería y solares | VIGI",
    description:
      "Cámaras de seguridad a batería y con panel solar: se instalan sin enchufe ni cables. Wi-Fi y 4G, visión nocturna a color. Envíos a todo el país.",
  },
  kits: {
    h1: "Kits de videovigilancia",
    title: "Kits de cámaras de seguridad y DVR | VIGI",
    description:
      "Kits completos de videovigilancia con DVR, cámaras, disco y accesorios. Listos para instalar en casa o en el negocio. Envíos a todo el país y cuotas.",
  },
  analogas: {
    h1: "Cámaras analógicas",
    title: "Cámaras de seguridad analógicas | VIGI",
    description:
      "Cámaras analógicas HD para sistemas con DVR: bala, domo y varifocales. La opción más económica para cubrir varios puntos. Envíos a todo el país.",
  },
  porteros: {
    h1: "Porteros eléctricos y videoporteros",
    title: "Porteros eléctricos y videoporteros | VIGI",
    description:
      "Videoporteros y porteros eléctricos para casa, departamento y edificio. Commax, Hikvision y Dahua, con visor en el celular. Envíos a todo el país.",
  },
  almacenamiento: {
    h1: "Discos y almacenamiento para videovigilancia",
    title: "Discos rígidos y memorias para CCTV | VIGI",
    description:
      "Discos rígidos de videovigilancia y memorias microSD preparadas para grabar 24/7 sin fallas. WD Purple y Seagate SkyHawk. Envíos a todo el país.",
  },
  alarmas: {
    h1: "Alarmas para casa y negocio",
    title: "Alarmas para casa y negocio | VIGI",
    description:
      "Kits de alarma inalámbrica con sensores de movimiento, apertura y sirena, controlados desde el celular. Sin obra ni cables. Envíos a todo el país.",
  },
};

export const quantity = [
    {
        id: 1,
        value: 1,
        descripcion: '1 Unidad'
    },
    {
        id: 2,
        value: 2,
        descripcion: '2 Unidades'
    },
    {
        id: 3,
        value: 3,
        descripcion: '3 Unidades'
    },
    {
        id: 4,
        value: 4,
        descripcion: '4 Unidades'
    },
    {
        id: 5,
        value: 5,
        descripcion: '5 Unidades'
    },
    {
        id: 6,
        value: 6,
        descripcion: '6 Unidades o más'
    }
];


export const faq = [
    {
        id: 1,
        question: '¿Cuáles son los métodos de pago aceptados?',
        answer: 'Procesamos los pagos de manera segura y aceptamos tarjetas de crédito (Visa, Mastercard, American Express) y tarjetas de débito. En el carrito vas a ver dos botones, uno por cada procesador: elegí el que prefieras y completás el pago en su pantalla.'
    },
    {
        id: 2,
        question: '¿Cuánto tiempo tarda en llegar mi pedido?',
        answer: 'El tiempo de entrega varía según tu ubicación y el método de envío seleccionado. Por lo general, los pedidos tardan entre algunas horas y 2 o 3 días hábiles en llegar después de haber sido despachados.'
    },
    {
        id: 3,
        question: '¿Tienen servicio de atención al cliente? ¿Cómo puedo contactarlos?',
        answer: `Sí, tenemos un equipo de atención al cliente disponible para ayudarte con cualquier pregunta o inquietud. Puedes contactarnos por correo electrónico a contacto@vigi.com.ar${SHOW_WHATSAPP ? ' o por WhatsApp al 11 2603 9243' : ''}.`
    },
    {
        id: 4,
        question: '¿Cómo puedo rastrear mi pedido?',
        answer: 'Una vez que tu pedido haya sido despachado, recibirás un correo electrónico. Puedes iniciar sesión en tu cuenta y ver el estado de tu pedido en la sección "Pedidos".'
    },
    {
        id: 5,
        question: '¿Puedo modificar o cancelar mi pedido después de realizarlo?',
        answer: 'Si necesitas modificar o cancelar tu pedido, contáctanos lo antes posible. Haremos todo lo posible para ayudarte, pero ten en cuenta que una vez que el pedido haya sido procesado y despachado, es posible que no podamos realizar cambios.'
    },
    {
        id: 6,
        question: '¿Tienen alguna opción de envío express? ¿Cuál es su costo?',
        answer: 'Sí, ofrecemos opciones de envío express con tarifas y tiempos de entrega variables según la ubicación. Puedes ver las opciones disponibles durante el proceso de compra antes de finalizar tu pedido.'
    },
    {
        id: 7,
        question: '¿Ofrecen garantía en sus productos?',
        answer: 'Ofrecemos garantía en todos nuestros productos contra defectos de fabricación en un período entre 6 meses y 2 años dependiendo de la marca. Si experimentas algún problema con tu producto dentro de este período, por favor contáctanos para obtener asistencia.'
    },
    {
        id: 8,
        question: '¿Tienen una tienda física donde pueda ver los productos personalmente?',
        answer: `Actualmente operamos exclusivamente como un e-commerce y no tenemos tiendas físicas. Sin embargo, puedes ver fotos detalladas y descripciones de nuestros productos en nuestro sitio web. Puedes contactarnos por correo electrónico a contacto@vigi.com.ar${SHOW_WHATSAPP ? ' o por WhatsApp al 11 2603 9243' : ''}.`
    }
];

export const footerData = [
    {
        id: 1,
        title: 'Acerca de Nosotros',
        redirects: [
            {
                id: 1,
                title: 'Quiénes Somos',
                url: '/nosotros'
            }
        ]
    },
    // {
    //     id: 2,
    //     title: 'Envíos y Devoluciones',
    //     redirects: [
    //         {
    //             id: 1,
    //             title: 'Política de Envíos',
    //             url: '/legales/envios'
    //         },
    //         {
    //             id: 2,
    //             title: 'Política de Devoluciones',
    //             url: '/legales/devoluciones'
    //         }
    //     ]
    // },
    {
        id: 3,
        title: 'Soporte',
        redirects: [
            {
                id: 1,
                title: 'Preguntas Frecuentes',
                url: '/#faq'
            },
            {
                id: 2,
                title: 'Contacto',
                url: SHOW_WHATSAPP ? WHATSAPP_URL : CONTACT_EMAIL_URL
            }
        ]
    },
    {
        id: 4,
        title: 'Redes Sociales',
        redirects: [
            {
                id: 1,
                title: 'Facebook',
                url: 'https://www.facebook.com'
            },
            {
                id: 2,
                title: 'Instagram',
                url: 'https://www.instagram.com/vigi.cam_'
            },
            // Con WhatsApp apagado la fila no aparece: un link muerto en el
            // footer es peor que una red social menos.
            ...(SHOW_WHATSAPP
                ? [{
                    id: 3,
                    title: 'Whatsapp',
                    url: WHATSAPP_URL
                }]
                : [])
        ]
    },
    {
        id: 5,
        title: 'Legal',
        redirects: [
            {
                id: 3,
                title: 'Términos y Condiciones',
                url: '/legales/terminos'
            },
            {
                id: 4,
                title: 'Política de Privacidad',
                url: '/legales/privacidad'
            },
        ]   
    },
    {
        id: 6,
        title: 'Navegar',
        redirects: [
            {
                id: 1,
                title: 'Inicio',
                url: '/'
            },
            {
                id: 2,
                title: 'Carrito',
                url: '/cart'
            },
            {
                id: 3,
                title: 'Perfil',
                url: '/profile'
            }
        ]
    }
];

export const provinces = [
    {
      "id": "02",
      "name": "Ciudad Autónoma de Buenos Aires",
      "coordinates": {
        "lon": -58.4458763250916,
        "lat": -34.6144420654301
      },
      "iso_id": "AR-C"
    },
    {
      "id": "58",
      "name": "Neuquén",
      "coordinates": {
        "lon": -70.1198972237318,
        "lat": -38.6419828626673
      },
      "iso_id": "AR-Q"
    },
    {
      "id": "74",
      "name": "San Luis",
      "coordinates": {
        "lon": -66.0252312714021,
        "lat": -33.7611035381154
      },
      "iso_id": "AR-D"
    },
    {
      "id": "82",
      "name": "Santa Fe",
      "coordinates": {
        "lon": -60.9506872769706,
        "lat": -30.7088227091528
      },
      "iso_id": "AR-S"
    },
    {
      "id": "46",
      "name": "La Rioja",
      "coordinates": {
        "lon": -67.1817575814487,
        "lat": -29.6849372775783
      },
      "iso_id": "AR-F"
    },
    {
      "id": "10",
      "name": "Catamarca",
      "coordinates": {
        "lon": -66.9478972451295,
        "lat": -27.3359537960762
      },
      "iso_id": "AR-K"
    },
    {
      "id": "90",
      "name": "Tucumán",
      "coordinates": {
        "lon": -65.3647655803683,
        "lat": -26.948283501723
      },
      "iso_id": "AR-T"
    },
    {
      "id": "22",
      "name": "Chaco",
      "coordinates": {
        "lon": -60.765116260356,
        "lat": -26.3869871835867
      },
      "iso_id": "AR-H"
    },
    {
      "id": "34",
      "name": "Formosa",
      "coordinates": {
        "lon": -59.9321901121647,
        "lat": -24.8950871761481
      },
      "iso_id": "AR-P"
    },
    {
      "id": "78",
      "name": "Santa Cruz",
      "coordinates": {
        "lon": -69.9557619144913,
        "lat": -48.8155471830527
      },
      "iso_id": "AR-Z"
    },
    {
      "id": "26",
      "name": "Chubut",
      "coordinates": {
        "lon": -68.5267363339818,
        "lat": -43.7886271389083
      },
      "iso_id": "AR-U"
    },
    {
      "id": "50",
      "name": "Mendoza",
      "coordinates": {
        "lon": -68.5829456019867,
        "lat": -34.6303887067166
      },
      "iso_id": "AR-M"
    },
    {
      "id": "30",
      "name": "Entre Ríos",
      "coordinates": {
        "lon": -59.201262616496,
        "lat": -32.0589278938558
      },
      "iso_id": "AR-E"
    },
    {
      "id": "70",
      "name": "San Juan",
      "coordinates": {
        "lon": -68.8881597071776,
        "lat": -30.8656607015096
      },
      "iso_id": "AR-J"
    },
    {
      "id": "38",
      "name": "Jujuy",
      "coordinates": {
        "lon": -65.764423919292,
        "lat": -23.3199750616583
      },
      "iso_id": "AR-Y"
    },
    {
      "id": "86",
      "name": "Santiago del Estero",
      "coordinates": {
        "lon": -63.2526268856462,
        "lat": -27.7834318817521
      },
      "iso_id": "AR-G"
    },
    {
      "id": "62",
      "name": "Río Negro",
      "coordinates": {
        "lon": -67.2296757996036,
        "lat": -40.4050796306359
      },
      "iso_id": "AR-R"
    },
    {
      "id": "18",
      "name": "Corrientes",
      "coordinates": {
        "lon": -57.8010818603331,
        "lat": -28.7742044813623
      },
      "iso_id": "AR-W"
    },
    {
      "id": "54",
      "name": "Misiones",
      "coordinates": {
        "lon": -54.6515705627219,
        "lat": -26.8753025989034
      },
      "iso_id": "AR-N"
    },
    {
      "id": "66",
      "name": "Salta",
      "coordinates": {
        "lon": -64.8141586574346,
        "lat": -24.2992838957201
      },
      "iso_id": "AR-A"
    },
    {
      "id": "14",
      "name": "Córdoba",
      "coordinates": {
        "lon": -63.801973466573,
        "lat": -32.1447993873859
      },
      "iso_id": "AR-X"
    },
    {
      "id": "06",
      "name": "Buenos Aires",
      "coordinates": {
        "lon": -60.5584771084959,
        "lat": -36.6773920760823
      },
      "iso_id": "AR-B"
    },
    {
      "id": "42",
      "name": "La Pampa",
      "coordinates": {
        "lon": -65.4476439990213,
        "lat": -37.1350652212898
      },
      "iso_id": "AR-L"
    },
    {
      "id": "94",
      "name": "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
      "coordinates": {
        "lon": -50.7428606764691,
        "lat": -82.5211345211545
      },
      "iso_id": "AR-V"
    }
  ]
// --- Rediseño e-commerce -----------------------------------------------------

/**
 * Hora de corte para el despacho del mismo día. Estaba en tres lugares con dos
 * valores distintos: el modal de envíos decía 14:00 y el cálculo del badge
 * usaba 17:00. Ahora sale de acá.
 */
// Conjunto de datos "Vigi pixeles conjunto", en la cuenta publicitaria Vigi ads
// (1090717675557808). Es público: viaja al navegador en cada carga.
export const META_PIXEL_ID = "378250695246633";

/**
 * Google Analytics 4. Vacío = apagado, no se dispara nada.
 *
 * Está para leer los UTM. El píxel de Meta y Google Ads no sirven para eso:
 * miden sus propias campañas, no de dónde viene el tráfico en general. Sin
 * GA4, una visita que entra desde `?utm_source=newsletter` llega con la
 * etiqueta en la barra de direcciones y la etiqueta se pierde en el siguiente
 * click, porque no hay nadie que la lea.
 *
 * El id sale de Google Analytics → Administrar → Flujos de datos → Web. Tiene
 * la forma `G-XXXXXXXXXX`. Es público, igual que el del píxel: viaja al
 * navegador en cada carga.
 *
 * **Lo que GA4 no arregla:** se carga desde `googletagmanager.com`, que es el
 * dominio más bloqueado que existe. La compra de prueba de esta tienda se hizo
 * en Chrome y en Edge y los dos bloquearon el píxel de fábrica — a GA4 le pasa
 * lo mismo. Sirve para ver de dónde viene el tráfico y cómo navega, pero va a
 * contar de menos las compras. El número de ventas que no miente sigue siendo
 * el de la base.
 */
export const GA4_MEASUREMENT_ID = "";

export const SHIPPING_CUTOFF_HOUR = 17;

/**
 * Compra mínima para el envío gratis a todo el país.
 *
 * Está duplicado a propósito: el número que manda es
 * `FREE_SHIPPING_MIN_PURCHASE` en `vigi-api/src/services/shipping.js`, que es
 * el que decide lo que se cobra. Esta copia solo pinta los carteles del home y
 * del catálogo, que se arman en el build y no pueden esperar a la API. El
 * resumen del carrito no la usa: ahí el número viene en la respuesta del
 * cotizador. Si cambia allá, cambiarlo acá.
 */
export const FREE_SHIPPING_MIN_PURCHASE = 450000;

export const FREE_SHIPPING_LABEL = FREE_SHIPPING_MIN_PURCHASE.toLocaleString(
  "es-AR",
  { style: "currency", currency: "ARS", minimumFractionDigits: 0 }
);

export const FEATURED_MODEL = "";

export const brands = [
  { name: "Hikvision", slug: "hikvision" },
  { name: "Dahua", slug: "dahua" },
  { name: "Ezviz", slug: "ezviz" },
  { name: "Intelbras", slug: "intelbras" },
  { name: "Commax", slug: "commax" },
  { name: "Hilook", slug: "hilook" },
  { name: "TP-Link", slug: "tp-link" },
  { name: "Imou", slug: "imou" },
];

/**
 * Preguntas del asistente del home ("Encontrá la tuya").
 *
 * Cada respuesta mapea a una faceta real que la API sabe filtrar
 * (`GET /api/search/recommend`), no a un atajo hacia una categoría. La versión
 * anterior preguntaba tres cosas, usaba una sola para elegir una categoría y
 * dejaba al cliente frente a 300 cámaras sin filtrar — y no había forma de
 * llegar a las alarmas, porteros ni cerraduras.
 *
 * `onlyFor` esconde la pregunta cuando no viene al caso: dónde va y cómo se
 * alimenta son preguntas de cámara, no de cerradura.
 *
 * Los tramos de precio salen de la distribución real del catálogo: hay 75
 * productos con ubicación por debajo de $60.000, 120 entre 60 y 120, 98 entre
 * 120 y 250. Tramos que dejan todo de un lado no ayudan a nadie a decidir.
 */
export const assistantSteps = [
  {
    id: "categoria",
    question: "¿Qué estás buscando?",
    options: [
      { value: "camaras", label: "Cámaras" },
      { value: "alarmas", label: "Una alarma" },
      { value: "porteros", label: "Portero eléctrico" },
      { value: "cerraduras", label: "Cerradura inteligente" },
    ],
  },
  {
    id: "donde",
    question: "¿Dónde la vas a poner?",
    onlyFor: "camaras",
    options: [
      { value: "interior", label: "Adentro" },
      { value: "exterior", label: "Afuera" },
      { value: "ambas", label: "En las dos" },
    ],
  },
  {
    id: "energia",
    question: "¿Tenés un enchufe cerca?",
    onlyFor: "camaras",
    options: [
      { value: "enchufe", label: "Sí, hay toma" },
      { value: "bateria", label: "No, mejor a batería" },
    ],
  },
  {
    id: "presupuesto",
    question: "¿Cuánto querés gastar?",
    options: [
      { value: "60000", label: "Hasta $60.000" },
      { value: "120000", label: "Hasta $120.000" },
      { value: "250000", label: "Hasta $250.000" },
      { value: "", label: "Sin límite" },
    ],
  },
];
