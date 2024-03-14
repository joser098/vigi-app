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
        value: "+5",
        descripcion: 'Más de 5 Unidades'
    }
];


export const faq = [
    {
        id: 1,
        question: '¿Cuáles son los métodos de pago aceptados?',
        answer: 'Nuestra tienda procesa los pagos de manera segura con Mercado Pago y acepta los siguientes métodos de pago: tarjetas de crédito (Visa, Mastercard, American Express), tarjetas de débito. Tambien mediante transferencia bancaria.'
    },
    {
        id: 2,
        question: '¿Cuánto tiempo tarda en llegar mi pedido?',
        answer: 'El tiempo de entrega varía según tu ubicación y el método de envío seleccionado. Por lo general, los pedidos tardan entre algunas horas y 2 o 3 días hábiles en llegar después de haber sido despachados.'
    },
    {
        id: 3,
        question: '¿Tienen servicio de atención al cliente? ¿Cómo puedo contactarlos?',
        answer: 'Sí, tenemos un equipo de atención al cliente disponible para ayudarte con cualquier pregunta o inquietud. Puedes contactarnos por correo electrónico a contacto@vigi.cam o por WhatsApp al 11 2603 9243.'
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
        answer: 'Actualmente operamos exclusivamente como un e-commerce y no tenemos tiendas físicas. Sin embargo, puedes ver fotos detalladas y descripciones de nuestros productos en nuestro sitio web. Puedes contactarnos por correo electrónico a contacto@vigi.cam o por WhatsApp al 11 2603 9243.'
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
    {
        id: 2,
        title: 'Envíos y Devoluciones',
        redirects: [
            {
                id: 1,
                title: 'Política de Envíos',
                url: '/legales/envios'
            },
            {
                id: 2,
                title: 'Política de Devoluciones',
                url: '/legales/devoluciones'
            }
        ]
    },
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
                url: '/contacto'
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
            {
                id: 3,
                title: 'Whatsapp',
                url: 'https://api.whatsapp.com/send?phone=541126039243&text=Hola!.%20Me%20gustaria%20saber%20m%C3%A1s!'
            }
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
                url: '/perfil'
            }
        ]
    }
];