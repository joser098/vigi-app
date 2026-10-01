/**
 * Texto propio de las páginas de categoría y de marca.
 *
 * Una categoría era un h1 y una grilla: para Google, una lista de links sin
 * nada que diga de qué trata ni por qué elegir una cosa u otra. Las búsquedas
 * con las que entra la gente ("qué cámara exterior comprar", "cámara wifi o
 * con dvr") se responden con texto, y una grilla no tiene.
 *
 * Reglas para editar esto:
 * - Solo marcas que de verdad están en la categoría. Si se agrega o se baja
 *   una marca del catálogo, revisar acá.
 * - Plazos, envío gratis y garantía: los mismos de `faq` en const.ts y de
 *   /legales/envios. Merchant Center marca como engañosa una tienda que
 *   promete cosas distintas en dos páginas.
 * - El texto se muestra solo en la página 1. En la 2, 3... sería el mismo
 *   bloque repetido en trece URLs.
 */

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SeoSection {
  heading: string;
  paragraphs: string[];
}

export interface PageContent {
  /** Una o dos oraciones debajo del h1. */
  intro: string;
  /** Guía de compra, debajo de los productos. */
  sections: SeoSection[];
  faq: FaqItem[];
}

const ENVIO =
  "En CABA te llega en 24 h hábiles, en el resto del AMBA en hasta 4 días hábiles y al resto del país en 8 a 12 días hábiles. El envío es gratis en CABA y en compras desde $450.000 a todo el país.";

export const CATEGORY_CONTENT: Record<string, PageContent> = {
  interior: {
    intro:
      "Cámaras para cuidar el living, la habitación de los chicos, la mascota o el local desde el celular. Wi-Fi, con audio de dos vías y visión nocturna, de Hikvision, Dahua, Ezviz, TP-Link e Intelbras.",
    sections: [
      {
        heading: "Cómo elegir una cámara de seguridad para interior",
        paragraphs: [
          "Lo primero es definir qué querés ver. Para un ambiente chico alcanza con una cámara fija de 1080p o 2K con lente de 2,8 a 4 mm. Si querés cubrir un ambiente grande o seguir a alguien que se mueve, conviene una cámara motorizada (PT) que gira desde la app y puede cubrir hasta 340°–360°.",
          "El audio de dos vías sirve para hablar con quien está del otro lado: un chico, un empleado o la mascota. La detección de personas evita que el celular suene cada vez que cambia la luz o pasa el gato.",
          "Para grabar, la mayoría de las cámaras Wi-Fi aceptan una memoria microSD y algunas también la nube del fabricante. Si vas a tener varias cámaras, un grabador (DVR o NVR) centraliza todo en un solo lugar.",
        ],
      },
      {
        heading: "Wi-Fi o cableada",
        paragraphs: [
          "Una cámara Wi-Fi se instala en minutos: se enchufa, se vincula con la app y listo. Es lo más práctico para una casa o un departamento. Una cámara cableada, analógica o IP con PoE, es más estable y no depende de la señal, por eso se usa en comercios y oficinas con varias cámaras.",
        ],
      },
    ],
    faq: [
      {
        question: "¿Puedo ver la cámara desde el celular?",
        answer:
          "Sí. Todas las cámaras Wi-Fi de esta categoría se ven en vivo desde la app gratuita del fabricante (Ezviz, Hik-Connect, DMSS, Tapo, Mibo según la marca), en Android y en iPhone.",
      },
      {
        question: "¿Necesito un grabador para una cámara Wi-Fi?",
        answer:
          "No. Una cámara Wi-Fi graba sola en una memoria microSD. El grabador conviene cuando tenés varias cámaras y querés guardar todo en un disco.",
      },
      {
        question: "¿Graban de noche?",
        answer:
          "Sí. Tienen visión nocturna por infrarrojo, que graba en blanco y negro con la luz apagada. Algunas tienen además luz blanca para ver a color de noche.",
      },
      {
        question: "¿Cuánto tarda el envío?",
        answer: ENVIO,
      },
    ],
  },

  exterior: {
    intro:
      "Cámaras preparadas para la lluvia, el sol y el polvo para cuidar el frente, el patio, la cochera o el perímetro del negocio. Más de 300 modelos de Hikvision, Dahua, Ezviz, Hilook, Imou e Intelbras.",
    sections: [
      {
        heading: "Qué mirar en una cámara de seguridad exterior",
        paragraphs: [
          "La protección IP66 o IP67 indica que la cámara resiste lluvia y polvo: es lo mínimo para una cámara a la intemperie. La carcasa metálica aguanta mejor los golpes y el sol que la plástica.",
          "El alcance infrarrojo (IR) dice hasta cuántos metros ve de noche. Para un frente o un patio alcanza con 20 a 30 metros; para un terreno o un estacionamiento, buscá 40 metros o más. Las cámaras ColorVu, Full Color o de luz dual ven a color de noche gracias a una luz blanca integrada.",
          "La lente define el ángulo: 2,8 mm da una vista amplia para cubrir un patio, y 4 mm o 6 mm acercan la imagen para ver detalles como una cara o una patente. Las varifocales permiten ajustarlo después de instalar.",
        ],
      },
      {
        heading: "Bullet, domo o motorizada",
        paragraphs: [
          "La bullet (tubo) es la más común en exteriores: se ve, y eso disuade. La domo es más discreta y difícil de girar o romper, ideal debajo de un alero. La motorizada (PTZ) gira y hace zoom para cubrir mucho espacio con una sola cámara.",
        ],
      },
      {
        heading: "Analógica con DVR o IP",
        paragraphs: [
          "Las cámaras analógicas HD se conectan con cable coaxil o UTP a un DVR y son la opción más económica para cubrir varios puntos. Las IP se conectan por red, muchas con PoE (datos y energía por el mismo cable), y ofrecen más resolución y funciones inteligentes. Si no podés pasar cables, mirá las cámaras a batería y solares.",
        ],
      },
    ],
    faq: [
      {
        question: "¿Las cámaras de exterior aguantan la lluvia?",
        answer:
          "Sí. Todas tienen protección contra agua y polvo (IP66 o IP67 según el modelo), así que pueden quedar a la intemperie todo el año.",
      },
      {
        question: "¿Qué resolución necesito?",
        answer:
          "1080p (2 MP) alcanza para ver qué pasa en un frente o un patio. Para reconocer caras o patentes a distancia conviene 4 MP, 2K o más.",
      },
      {
        question: "¿Ven a color de noche?",
        answer:
          "Las que dicen ColorVu, Full Color, 24 h color o luz dual sí. El resto graba de noche en blanco y negro con infrarrojo.",
      },
      {
        question: "¿Cuánto tarda el envío?",
        answer: ENVIO,
      },
    ],
  },

  bateria: {
    intro:
      "Cámaras que se instalan sin enchufe ni cables: con batería recargable y, en muchos casos, panel solar para no tener que bajarlas nunca. Conexión Wi-Fi o 4G con chip, de Ezviz, Imou, TP-Link, Intelbras y Dahua.",
    sections: [
      {
        heading: "Cuándo conviene una cámara a batería",
        paragraphs: [
          "Son la solución cuando no hay un toma cerca: un portón, un quincho, el fondo de un terreno, una obra o un campo. Se atornillan a la pared y se configuran desde el celular en pocos minutos.",
          "Para ahorrar batería no graban todo el tiempo: se despiertan cuando detectan movimiento y mandan el aviso al celular. La duración depende de cuántos eventos haya por día. Con un panel solar que reciba algunas horas de sol, la batería se mantiene cargada sola.",
        ],
      },
      {
        heading: "Wi-Fi o 4G",
        paragraphs: [
          "Las Wi-Fi necesitan que llegue la señal del router al lugar donde va la cámara. Las 4G llevan un chip de celular y funcionan donde no hay internet, como un campo, una obra o una casa de fin de semana; solo necesitan cobertura de la compañía.",
        ],
      },
    ],
    faq: [
      {
        question: "¿Cuánto dura la batería?",
        answer:
          "Depende del modelo y de cuántas veces se active por día. Con panel solar y sol directo algunas horas al día, en la mayoría de los casos no hace falta cargarla a mano.",
      },
      {
        question: "¿Graban todo el tiempo?",
        answer:
          "No, la mayoría graba cuando detecta movimiento para cuidar la batería. Si necesitás grabación continua, conviene una cámara con alimentación por cable.",
      },
      {
        question: "¿Las 4G necesitan internet?",
        answer:
          "No necesitan Wi-Fi: usan un chip de celular con datos. Funcionan en cualquier lugar con cobertura 4G.",
      },
      {
        question: "¿Cuánto tarda el envío?",
        answer: ENVIO,
      },
    ],
  },

  kits: {
    intro:
      "Kits de videovigilancia con grabador y todo lo necesario para instalar un sistema completo en la casa o el negocio. Hikvision y Dahua.",
    sections: [
      {
        heading: "Qué trae un kit de cámaras de seguridad",
        paragraphs: [
          "Un kit junta en una sola compra el grabador (DVR), las cámaras y los accesorios para conectarlas: fuente, balunes, fichas y, según el kit, el disco rígido. Es más simple que comprar cada parte por separado y te asegura que todo sea compatible.",
          "Revisá cuántos canales tiene el grabador: un DVR de 8 canales con 4 cámaras te deja lugar para sumar 4 más después sin cambiar el equipo.",
        ],
      },
      {
        heading: "Si el kit no trae disco",
        paragraphs: [
          "Para que el grabador guarde las imágenes necesita un disco rígido. Conviene uno pensado para videovigilancia, como WD Purple o Seagate SkyHawk, que están hechos para grabar las 24 horas. Los encontrás en la categoría de almacenamiento.",
        ],
      },
    ],
    faq: [
      {
        question: "¿Puedo ver las cámaras del kit desde el celular?",
        answer:
          "Sí. El grabador se conecta al router y se ve desde la app del fabricante (Hik-Connect para Hikvision, DMSS para Dahua).",
      },
      {
        question: "¿Puedo agregar más cámaras después?",
        answer:
          "Sí, mientras el grabador tenga canales libres. Un DVR de 8 canales admite hasta 8 cámaras.",
      },
      {
        question: "¿Cuántos días graba?",
        answer:
          "Depende del tamaño del disco, la cantidad de cámaras y la resolución. Cuando el disco se llena, el grabador sobrescribe lo más viejo y sigue grabando.",
      },
      {
        question: "¿Cuánto tarda el envío?",
        answer: ENVIO,
      },
    ],
  },

  analogas: {
    intro:
      "Cámaras analógicas HD de Hikvision y Dahua para sistemas con DVR: bullet, domo, varifocales y ColorVu. La forma más económica de cubrir muchos puntos con imagen nítida.",
    sections: [
      {
        heading: "Cómo funciona un sistema analógico",
        paragraphs: [
          "Cada cámara se conecta con un cable (coaxil, o UTP con balunes) a un grabador DVR, que graba en un disco rígido y te deja ver todo desde el celular. Hoy las cámaras analógicas graban en 1080p o más, con una calidad muy superior a la de los sistemas viejos.",
          "Muchos modelos son 4 en 1 (TVI, CVI, AHD y CVBS): funcionan con DVR de distintas marcas. Si ya tenés un DVR instalado, es la forma más barata de reemplazar o sumar cámaras.",
        ],
      },
      {
        heading: "Analógica o IP",
        paragraphs: [
          "La analógica es más barata por cámara y aprovecha cableado existente. La IP da más resolución y funciones inteligentes, pero cuesta más. Para un comercio o una casa con varias cámaras y presupuesto ajustado, la analógica sigue siendo la mejor relación precio-calidad.",
        ],
      },
    ],
    faq: [
      {
        question: "¿Necesito un DVR?",
        answer:
          "Sí. Las cámaras analógicas no graban solas: se conectan a un DVR, que es el que graba y te deja verlas desde el celular.",
      },
      {
        question: "¿Son compatibles con mi DVR?",
        answer:
          "Las cámaras 4 en 1 funcionan con la mayoría de los DVR del mercado. Revisá en la ficha qué tecnologías soporta cada modelo.",
      },
      {
        question: "¿Qué cable uso?",
        answer:
          "Coaxil o UTP con balunes. Además del video, cada cámara necesita alimentación de 12 V.",
      },
      {
        question: "¿Cuánto tarda el envío?",
        answer: ENVIO,
      },
    ],
  },

  porteros: {
    intro:
      "Porteros eléctricos y videoporteros para casa, departamento, PH o edificio. Commax, Dahua y Ezviz, con monitor en la casa y, en muchos modelos, atención desde el celular.",
    sections: [
      {
        heading: "Portero, videoportero o timbre inteligente",
        paragraphs: [
          "Un videoportero suma una cámara en la puerta y un monitor adentro: ves quién toca antes de atender y abrís la cerradura desde el monitor. Commax es la marca más instalada en Argentina para casas y edificios.",
          "Los videoporteros IP y los timbres Wi-Fi (Dahua, Ezviz) permiten atender desde el celular aunque no estés en casa: te llega la llamada a la app, hablás y abrís.",
        ],
      },
      {
        heading: "Qué revisar antes de comprar",
        paragraphs: [
          "El tamaño de la pantalla del monitor (de 4,3\" a 7\" o más), si el frente es antivandálico y cuántos monitores o frentes admite el sistema. Si vas a reemplazar un portero existente, fijate cuántos cables llegan hoy desde la puerta.",
        ],
      },
    ],
    faq: [
      {
        question: "¿Puedo atender el portero desde el celular?",
        answer:
          "Con los videoporteros IP y los timbres Wi-Fi, sí. Los videoporteros tradicionales se atienden desde el monitor de la casa.",
      },
      {
        question: "¿Puedo abrir la puerta desde el monitor?",
        answer:
          "Sí, conectando una cerradura eléctrica al frente. La mayoría de los modelos tiene la salida para hacerlo.",
      },
      {
        question: "¿Sirve para un edificio?",
        answer:
          "Hay sistemas pensados para varias unidades. Si es para un edificio, escribinos con la cantidad de departamentos y te ayudamos a elegir.",
      },
      {
        question: "¿Cuánto tarda el envío?",
        answer: ENVIO,
      },
    ],
  },

  almacenamiento: {
    intro:
      "Discos rígidos para videovigilancia WD Purple, Seagate SkyHawk y Toshiba S300, discos SSD, memorias microSD y pendrives Hiksemi para grabar las cámaras sin perder imágenes.",
    sections: [
      {
        heading: "Por qué usar un disco de videovigilancia",
        paragraphs: [
          "Un DVR o NVR graba las 24 horas, todos los días. Los discos de videovigilancia (WD Purple, Seagate SkyHawk, Toshiba S300) están diseñados para esa escritura continua; un disco de PC común se desgasta mucho más rápido en ese uso.",
          "La capacidad define cuántos días de grabación guardás. Más cámaras y más resolución necesitan más espacio; cuando el disco se llena, el grabador sobrescribe lo más viejo.",
        ],
      },
      {
        heading: "MicroSD para cámaras Wi-Fi",
        paragraphs: [
          "Las cámaras Wi-Fi y a batería graban en una memoria microSD. Revisá en la ficha de tu cámara la capacidad máxima que acepta (muchas llegan a 256 GB o 512 GB).",
        ],
      },
    ],
    faq: [
      {
        question: "¿Qué disco necesito para mi DVR?",
        answer:
          "Uno de videovigilancia, de 1 TB a 4 TB según la cantidad de cámaras. Para muchas cámaras o alta resolución, 6 TB o más.",
      },
      {
        question: "¿Los discos reacondicionados tienen garantía?",
        answer:
          "No. Los discos marcados como reacondicionados se venden sin garantía; está aclarado en la ficha de cada uno.",
      },
      {
        question: "¿Qué memoria uso en una cámara Wi-Fi?",
        answer:
          "Una microSD clase 10. Revisá en la ficha de la cámara la capacidad máxima que acepta.",
      },
      {
        question: "¿Cuánto tarda el envío?",
        answer: ENVIO,
      },
    ],
  },

  alarmas: {
    intro:
      "Centrales de alarma, sensores de movimiento y apertura, sirenas, barreras infrarrojas y detectores de humo. Intelbras para sistemas cableados e inalámbricos, y Ezviz para alarmas Wi-Fi que se controlan desde el celular.",
    sections: [
      {
        heading: "Cómo se arma una alarma",
        paragraphs: [
          "Toda alarma tiene una central, que es el cerebro del sistema, y sensores conectados a ella: de movimiento (PIR) para los ambientes, magnéticos para puertas y ventanas, y una sirena. Se activa y desactiva con teclado, control remoto o desde el celular.",
          "Los sistemas inalámbricos se instalan sin pasar cables, ideales para una casa ya terminada. Los cableados son la opción para obra nueva o instalaciones grandes.",
        ],
      },
      {
        heading: "Sensores para casas con mascotas y exteriores",
        paragraphs: [
          "Los sensores PET ignoran animales chicos para que la alarma no se dispare con el perro o el gato. Para exteriores hay sensores de doble PIR y barreras infrarrojas que protegen el perímetro antes de que alguien llegue a la puerta.",
        ],
      },
    ],
    faq: [
      {
        question: "¿Puedo controlar la alarma desde el celular?",
        answer:
          "Sí, con las centrales con Wi-Fi o módulo de comunicación (como las Intelbras SMART con su app) y con los kits Ezviz Wi-Fi.",
      },
      {
        question: "¿Necesito instalador?",
        answer:
          "Los kits inalámbricos se pueden instalar sin experiencia. Una central cableada con varias zonas conviene que la instale un técnico.",
      },
      {
        question: "¿Se dispara con mi mascota?",
        answer:
          "Con sensores PET (antimascotas) no, siempre que el animal sea chico y no trepe a la altura del sensor.",
      },
      {
        question: "¿Cuánto tarda el envío?",
        answer: ENVIO,
      },
    ],
  },
};

/**
 * Marcas con página propia (/marca/[slug]).
 *
 * Antes la grilla de marcas del home llevaba a /buscar?search=Hikvision, que
 * es `noindex`: los links no sumaban nada y "cámaras hikvision" no tenía una
 * página que pudiera posicionar. `provider` es el valor exacto del campo en la
 * base; la comparación es sin mayúsculas igual.
 */
export interface Brand {
  slug: string;
  provider: string;
  name: string;
  title: string;
  description: string;
  intro: string;
}

export const BRANDS: Brand[] = [
  {
    slug: "hikvision",
    provider: "Hikvision",
    name: "Hikvision",
    title: "Cámaras Hikvision: DVR, kits y cámaras IP | VIGI",
    description:
      "Cámaras de seguridad Hikvision analógicas e IP, ColorVu, DVR y kits de videovigilancia. Garantía oficial. Envíos a todo el país y pago en cuotas.",
    intro:
      "Hikvision es uno de los mayores fabricantes de videovigilancia del mundo. Cámaras analógicas e IP, ColorVu para ver a color de noche, grabadores DVR y NVR y kits completos, todo compatible con la app Hik-Connect.",
  },
  {
    slug: "dahua",
    provider: "Dahua",
    name: "Dahua",
    title: "Cámaras Dahua, porteros IP y grabadores | VIGI",
    description:
      "Cámaras de seguridad Dahua analógicas e IP, videoporteros IP, grabadores XVR y kits. Garantía oficial. Envíos a todo el país y pago en cuotas.",
    intro:
      "Dahua fabrica cámaras analógicas HDCVI e IP, grabadores XVR y NVR, videoporteros IP y kits de videovigilancia. Todo se ve desde el celular con la app DMSS.",
  },
  {
    slug: "ezviz",
    provider: "Ezviz",
    name: "Ezviz",
    title: "Cámaras Ezviz Wi-Fi, a batería y solares | VIGI",
    description:
      "Cámaras Ezviz Wi-Fi para interior y exterior, a batería y solares, videoporteros, alarmas y cerraduras inteligentes. Envíos a todo el país.",
    intro:
      "Ezviz es la línea de hogar inteligente de Hikvision: cámaras Wi-Fi que se instalan en minutos, cámaras a batería y solares, mirillas y videoporteros, alarmas y cerraduras con huella, todo desde la app Ezviz.",
  },
  {
    slug: "intelbras",
    provider: "Intelbras",
    name: "Intelbras",
    title: "Alarmas Intelbras: centrales, sensores y sirenas | VIGI",
    description:
      "Centrales de alarma Intelbras, sensores PIR y magnéticos, sirenas, barreras infrarrojas y cámaras. Cableado e inalámbrico. Envíos a todo el país.",
    intro:
      "Intelbras es la marca de referencia en alarmas: centrales cableadas e inalámbricas de la línea SMART, sensores de movimiento y apertura, sirenas, barreras infrarrojas y detectores de humo.",
  },
  {
    slug: "commax",
    provider: "Commax",
    name: "Commax",
    title: "Porteros y videoporteros Commax | VIGI",
    description:
      "Videoporteros y porteros eléctricos Commax para casa, departamento y edificio. Monitores a color, manos libres y frentes antivandálicos. Envíos a todo el país.",
    intro:
      "Commax es la marca de videoporteros más instalada en Argentina. Monitores a color de distintos tamaños, manos libres o con tubo, y frentes de calle antivandálicos.",
  },
  {
    slug: "hilook",
    provider: "Hilook",
    name: "Hilook",
    title: "Cámaras Hilook y grabadores | VIGI",
    description:
      "Cámaras de seguridad Hilook by Hikvision y grabadores: la tecnología de Hikvision a un precio más accesible. Envíos a todo el país y cuotas.",
    intro:
      "Hilook es la segunda marca de Hikvision: cámaras y grabadores con la misma base tecnológica a un precio más accesible, compatibles con Hik-Connect.",
  },
  {
    slug: "tp-link",
    provider: "TP-Link",
    name: "TP-Link",
    title: "TP-Link: cámaras Tapo, routers y Wi-Fi Mesh | VIGI",
    description:
      "Cámaras Wi-Fi TP-Link Tapo, routers, sistemas Wi-Fi Mesh Deco, switches y access points. Envíos a todo el país y pago en cuotas.",
    intro:
      "TP-Link suma cámaras Wi-Fi Tapo, fáciles de instalar desde el celular, y todo el equipo de red para que lleguen bien: routers, sistemas Mesh Deco, extensores, switches y access points.",
  },
  {
    slug: "imou",
    provider: "Imou",
    name: "Imou",
    title: "Cámaras Imou Wi-Fi, 4G y grabadores | VIGI",
    description:
      "Cámaras Imou Wi-Fi, 4G y PoE para interior y exterior, motorizadas y de lente múltiple, y grabadores NVR. Envíos a todo el país y cuotas.",
    intro:
      "Imou es la línea de consumo de Dahua: cámaras Wi-Fi, 4G y PoE, motorizadas y de lente doble o triple, y grabadores NVR, todo desde la app Imou Life.",
  },
];

export const brandForProvider = (provider: string | null | undefined) =>
  BRANDS.find((b) => b.provider.toLowerCase() === provider?.toLowerCase());
