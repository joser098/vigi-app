/**
 * El canal de contacto de la tienda, en un solo lugar.
 *
 * WhatsApp esta apagado a proposito: la atencion por ese canal se esta
 * rehaciendo, y mientras tanto un boton verde al lado del de comprar se lleva
 * clics que tendrian que terminar en el checkout. Con SHOW_WHATSAPP en false el
 * sitio entero cae al mail -boton flotante, header, footer, FAQ y los CTA de
 * cada pagina-. Poniendolo en true vuelve todo tal como estaba.
 */
// Tipado como boolean a proposito: si lo dejas como literal false, TypeScript
// da por muerta la rama de WhatsApp y deja de chequearla.
export const SHOW_WHATSAPP: boolean = false;

export const WHATSAPP_PHONE = "11 2603 9243";
export const WHATSAPP_URL = "https://wa.me/541126039243";

export const CONTACT_EMAIL = "contacto@vigi.com.ar";
export const CONTACT_EMAIL_URL = `mailto:${CONTACT_EMAIL}`;

/** Adonde mandar a alguien que quiere escribirnos, segun el canal que este vivo. */
export const CONTACT_URL = SHOW_WHATSAPP ? WHATSAPP_URL : CONTACT_EMAIL_URL;
export const CONTACT_LABEL = SHOW_WHATSAPP ? WHATSAPP_PHONE : CONTACT_EMAIL;
/** "Escribinos al 11 2603 9243" contra "Escribinos a contacto@vigi.com.ar". */
export const CONTACT_PREP = SHOW_WHATSAPP ? "al" : "a";
/** _blank sirve para wa.me; mailto abre el cliente de correo, no una pestana. */
export const CONTACT_TARGET = SHOW_WHATSAPP ? "_blank" : undefined;
