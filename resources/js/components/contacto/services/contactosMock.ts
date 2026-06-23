import { BusFront, CarFront, Mail, MapPin, Phone, Plane } from 'lucide-react';
import type {
    ArrivalRoute,
    ContactInfo,
    ContactoPageText,
} from '../interfaces';

export const mapsUrl =
    'https://www.google.com.mx/maps/place/HOTEL+MESON+DE+MITA/@20.7718392,-105.5196837,17z/data=!3m1!4b1!4m8!3m7!1s0x8421134f5a0645e3:0xc48cf5e4f110a5b3!5m2!4m1!1i2!8m2!3d20.7718342!4d-105.517495';

export const mapEmbedUrl =
    'https://www.google.com/maps?q=20.7718342,-105.517495&z=17&output=embed';

export const contactoText: ContactoPageText = {
    page_title: 'Contacto y ubicación',
    hero_title: 'Contacto y Ubicación',
    hero_body:
        'Encuéntranos en el corazón de Punta de Mita, a unos pasos de la playa y de la zona de El Anclote.',
    contact_info_aria_label: 'Datos de contacto',
    map_kicker: 'Hotel Mesón de Mita',
    map_title: 'Estamos sobre Ave El Anclote',
    map_body:
        'Este mapa marca la ubicación del hotel para que puedas encontrarnos sin ningun problema.',
    map_cta_label: 'Abrir ruta en Google Maps',
    map_iframe_title: 'Mapa de Hotel Mesón de Mita',
    arrival_title: 'Cómo llegar al hotel',
    arrival_body: '',
    airlines_intro:
        'Compañías aéreas que operan en el Aeropuerto Internacional Gustavo Díaz Ordaz:',
};

export const contactInfo: ContactInfo[] = [
    {
        id: 'ubicacion',
        label: 'Ubicación',
        lines: ['Ave El Anclote 200', '63734 Punta de Mita, Nayarit.'],
        href: mapsUrl,
        external: true,
        icon: MapPin,
    },
    {
        id: 'telefono',
        label: 'Teléfono',
        lines: ['+52 329 291 6330', '+52 329 291 5161'],
        href: 'tel:+523292916330',
        icon: Phone,
    },
    {
        id: 'contacto',
        label: 'Contacto',
        lines: ['reservaciones@hotelmesondemita.com'],
        href: 'mailto:reservaciones@hotelmesondemita.com',
        icon: Mail,
    },
];

export const arrivalRoutes: ArrivalRoute[] = [
    {
        id: 'via-aerea',
        eyebrow: 'Vía aérea',
        title: 'Desde el aeropuerto',
        description:
            'Llegada al Aeropuerto Internacional Gustavo Díaz Ordaz (PVR) este se localiza en Puerto Vallarta a 40 km de distancia de Punta de Mita, aproximadamente 45 minutos.',
        footer: 'Al llegar al aeropuerto, hay casetas que ofrecen el servicio de taxis o vans para trasladarse. También allí mismo podrá encontrar distintas compañías con servicio de alquiler de automóviles.',
        companies: [
            'AEREOCALAFIA, S.A. DE C.V. (CFV)',
            'AEROVIAS DE MEXICO (AMX)',
            'AIR CANADA (ACA)',
            'AIR TRANSAT (TSC)',
            'ALASKA AIRLINES (ASA)',
            'AMERICAN AIRLINES (AAL)',
            'DELTA AIR LINES INC. (DAL)',
            'UNITED AIRLINES INC. (UAL)',
            'VOLARIS (VOI)',
            'WEST JET AIRLINES (WJA)',
        ],
        icon: Plane,
        steps: [],
    },
    {
        id: 'auto-puerto-vallarta',
        eyebrow: 'En carro',
        title: 'En carro desde Puerto Vallarta',
        icon: CarFront,
        companies: [],
        steps: [
            'Tome la carretera principal # 200 siguiendo los señalamientos en dirección a Tepic y Compostela.',
            'Después de Bucerías tome la salida del lado derecho hacia Punta Mita y La Cruz de Huanacaxtle.',
            'Tome la única calle de acceso libre que lleva a la zona restaurantera de Punta de Mita.',
        ],
    },
    {
        id: 'autobus-guadalajara',
        eyebrow: 'En autobús',
        title: 'En autobús desde Guadalajara',
        icon: BusFront,
        companies: [],
        steps: [
            'Las líneas recomendadas para llegar a la Riviera Nayarit son ETN, Primera Plus y Vallarta Plus.',
            'Una vez llegando a cualquiera de las terminales deberás tomar un autobús local o un taxi hacia Punta de Mita.',
        ],
    },
];
