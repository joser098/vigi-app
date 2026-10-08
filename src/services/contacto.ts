/**
 * El canal de contacto de la tienda, en un solo lugar.
 *
 * WhatsApp lo atiende un bot de opciones en Kapso (vigi-api/kapso): da
 * confianza y responde dudas, pero la compra se hace siempre en la web. Con
 * SHOW_WHATSAPP en false el sitio entero cae al mail -boton flotante, header,
 * footer, FAQ y los CTA de cada pagina-.
 */
// Tipado como boolean a proposito: si lo dejas como literal false, TypeScript
// da por muerta la rama de WhatsApp y deja de chequearla.
export const SHOW_WHATSAPP: boolean = true;

export const WHATSAPP_PHONE = "11 2603 9243";
export const WHATSAPP_URL = "https://wa.me/541126039243";

/**
 * WhatsApp con el mensaje ya escrito. Los dos textos los reconoce el bot
 * (functions/vigi-entrada en vigi-api/kapso): si se cambian acá, el bot deja
 * de entender de qué producto o pedido le hablan y cae al menú general.
 */
export const whatsappProducto = (model: string) =>
  `${WHATSAPP_URL}?text=${encodeURIComponent(`Hola! Tengo una consulta sobre el producto ${model}`)}`;

// "Acordar el envío": el texto es el que reconoce Kapso (vigi-entrada) para
// llevarlo directo a la validación del pedido. No cambiarlo sin cambiar aquel
// ni vigi-api/src/utils/whatsapp.js, que arma el mismo link para el mail.
export const whatsappAcordar = (paymentId: string | number) =>
  `${WHATSAPP_URL}?text=${encodeURIComponent(`Hola! Quiero acordar el envío de mi pedido ${paymentId}`)}`;

export const whatsappPedido = (paymentId: string | number) =>
  `${WHATSAPP_URL}?text=${encodeURIComponent(`Hola! Consulto por mi pedido ${paymentId}`)}`;

/** "Asesorate" del header: el bot arranca directo en "Ayuda para elegir". */
export const WHATSAPP_ASESORAMIENTO_URL = `${WHATSAPP_URL}?text=${encodeURIComponent(
  "Hola! Quiero asesoramiento para elegir"
)}`;

/**
 * El teléfono, como línea de llamada y no como WhatsApp. Se muestra solo en
 * /nosotros, junto con los datos de la empresa: es el mismo número que figura
 * en Google Merchant Center, y los dos tienen que coincidir.
 */
export const PHONE_LABEL = WHATSAPP_PHONE;
export const PHONE_URL = "tel:+541126039243";

export const CONTACT_EMAIL = "contacto@vigi.com.ar";
export const CONTACT_EMAIL_URL = `mailto:${CONTACT_EMAIL}`;

/** Adonde mandar a alguien que quiere escribirnos, segun el canal que este vivo. */
export const CONTACT_URL = SHOW_WHATSAPP ? WHATSAPP_URL : CONTACT_EMAIL_URL;
export const CONTACT_LABEL = SHOW_WHATSAPP ? WHATSAPP_PHONE : CONTACT_EMAIL;
/** "Escribinos al 11 2603 9243" contra "Escribinos a contacto@vigi.com.ar". */
export const CONTACT_PREP = SHOW_WHATSAPP ? "al" : "a";
/** _blank sirve para wa.me; mailto abre el cliente de correo, no una pestana. */
export const CONTACT_TARGET = SHOW_WHATSAPP ? "_blank" : undefined;
