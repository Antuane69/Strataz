<?php

namespace App\Support\EditablePages;

use Illuminate\Support\Carbon;

final class ContactoPageDefaults
{
    public const SLUG = 'contacto';

    public const TITLE = 'Contacto y ubicacion';

    private const MAPS_URL = 'https://www.google.com.mx/maps/place/HOTEL+MESON+DE+MITA/@20.7718392,-105.5196837,17z/data=!3m1!4b1!4m8!3m7!1s0x8421134f5a0645e3:0xc48cf5e4f110a5b3!5m2!4m1!1i2!8m2!3d20.7718342!4d-105.517495';

    private const MAP_EMBED_URL = 'https://www.google.com/maps?q=20.7718342,-105.517495&z=17&output=embed';

    /**
     * @return array{slug: string, title: string, content: array<string, mixed>, is_published: bool, published_at: Carbon}
     */
    public static function attributes(): array
    {
        return [
            'slug' => self::SLUG,
            'title' => self::TITLE,
            'content' => self::content(),
            'is_published' => true,
            'published_at' => now(),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public static function content(): array
    {
        return [
            'version' => 1,
            'maps_url' => self::MAPS_URL,
            'map_embed_url' => self::MAP_EMBED_URL,
            'locales' => [
                'es' => [
                    'page_title' => 'Contacto y ubicación',
                    'hero_title' => 'Contacto y Ubicación',
                    'hero_body' => 'Encuéntranos en el corazón de Punta de Mita, a unos pasos de la playa y de la zona de El Anclote.',
                    'contact_info_aria_label' => 'Datos de contacto',
                    'map_kicker' => 'Hotel Mesón de Mita',
                    'map_title' => 'Estamos sobre Ave El Anclote',
                    'map_body' => 'Este mapa marca la ubicación del hotel para que puedas encontrarnos sin ningun problema.',
                    'map_cta_label' => 'Abrir ruta en Google Maps',
                    'map_iframe_title' => 'Mapa de Hotel Mesón de Mita',
                    'arrival_title' => 'Cómo llegar al hotel',
                    'arrival_body' => '',
                    'airlines_intro' => 'Compañías aéreas que operan en el Aeropuerto Internacional Gustavo Díaz Ordaz:',
                ],
                'en' => [
                    'page_title' => 'Contact and location',
                    'hero_title' => 'Contact and Location',
                    'hero_body' => 'Find us in the heart of Punta de Mita, just steps from the beach and the El Anclote area.',
                    'contact_info_aria_label' => 'Contact details',
                    'map_kicker' => 'Hotel Mesón de Mita',
                    'map_title' => 'We are on Ave El Anclote',
                    'map_body' => 'This map marks the hotel location so you can find us without any trouble.',
                    'map_cta_label' => 'Open route in Google Maps',
                    'map_iframe_title' => 'Map of Hotel Mesón de Mita',
                    'arrival_title' => 'How to get to the hotel',
                    'arrival_body' => '',
                    'airlines_intro' => 'Airlines operating at Gustavo Díaz Ordaz International Airport:',
                ],
            ],
            'contact_items' => [
                self::contactItem('ubicacion', 1, 'map-pin', 'Ubicación', 'Location', ['Ave El Anclote 200', '63734 Punta de Mita, Nayarit.'], ['Ave El Anclote 200', '63734 Punta de Mita, Nayarit.'], self::MAPS_URL, true),
                self::contactItem('telefono', 2, 'phone', 'Teléfono', 'Phone', ['+52 329 291 6330', '+52 329 291 5161'], ['+52 329 291 6330', '+52 329 291 5161'], 'tel:+523292916330', false),
                self::contactItem('contacto', 3, 'mail', 'Contacto', 'Contact', ['reservaciones@hotelmesondemita.com'], ['reservaciones@hotelmesondemita.com'], 'mailto:reservaciones@hotelmesondemita.com', false),
            ],
            'arrival_routes' => self::arrivalRoutes(),
        ];
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private static function arrivalRoutes(): array
    {
        return [
            self::arrivalRoute(
                'via-aerea',
                1,
                'plane',
                'Vía aérea',
                'By air',
                'Desde el aeropuerto',
                'From the airport',
                'Llegada al Aeropuerto Internacional Gustavo Díaz Ordaz (PVR) este se localiza en Puerto Vallarta a 40 km de distancia de Punta de Mita, aproximadamente 45 minutos.',
                'Arrival at Gustavo Díaz Ordaz International Airport (PVR), located in Puerto Vallarta, 40 km from Punta de Mita, approximately 45 minutes away.',
                'Al llegar al aeropuerto, hay casetas que ofrecen el servicio de taxis o vans para trasladarse. También allí mismo podrá encontrar distintas compañías con servicio de alquiler de automóviles. Para llegar desde el Aeropuerto Internacional Gustavo Díaz Ordaz a Punta de Mita en automóvil deberá seguir las indicaciones vía terrestre Puerto Vallarta - Punta de Mita.',
                'At the airport, you will find booths offering taxi or van transfer service. You can also find several car rental companies there. To drive from Gustavo Díaz Ordaz International Airport to Punta de Mita, follow the Puerto Vallarta - Punta de Mita land route.',
                [
                    'AEREOCALAFIA, S.A. DE C.V. (CFV)',
                    'AEROVIAS DE MEXICO (AMX)',
                    'AIR CANADA (ACA)',
                    'AIR TRANSAT (TSC)',
                    'ALASKA AIRLINES (ASA)',
                    'AMERICAN AIRLINES (AAL)',
                    'CANJET (CJA)',
                    'DELTA AIR LINES INC. (DAL)',
                    'FINNAIR',
                    'FRONTIER AIRLINES INC. (FFT)',
                    'GRUPO AEREO MONTERREY S.A. (GMT)',
                    'MIAMI AIR INTERNATIONAL INC. (BSK)',
                    'POLAR AIR, NOVA AIR (PMO)',
                    'TAR',
                    'SUN COUNTRY AIRLINES (SCX)',
                    'SUNWING AIRLINES INC. (SWG)',
                    'UNITED AIRLINES INC. (UAL)',
                    'US AIRWAYS (USA)',
                    'VIVAAEROBUS (VIV)',
                    'VOLARIS (VOI)',
                    'WEST JET AIRLINES (WJA)',
                ],
            ),
            self::arrivalRoute(
                'auto-puerto-vallarta',
                2,
                'car',
                'En carro',
                'By car',
                'En carro desde Puerto Vallarta',
                'By car from Puerto Vallarta',
                '',
                '',
                '',
                '',
                [],
                [
                    'Tome la carretera principal # 200 siguiendo los señalamientos en dirección a Tepic y Compostela. Continúe por esta carretera aproximadamente por 25 minutos (21 kilómetros).',
                    'A lo largo de su trayectoria dejara atrás algunos pueblitos y justo después del pueblito llamado "Bucerías" tome la salida del lado derecho hacia Punta Mita y La Cruz de Huanacaxtle.',
                    'Continúe por esta carretera otros 19 kilómetros (12 millas) hasta llegar a su fin.',
                    'Tome la única calle de acceso libre que lleva a la zona restaurantera de Punta de Mita.',
                    'Llegando al final de la calle gire a la izquierda y siga el camino hasta encontrar la entrada del Hotel Mesón de Mita.',
                ],
                [
                    'Take main highway #200 following signs toward Tepic and Compostela. Continue on this road for approximately 25 minutes (21 kilometers).',
                    'Along the way you will pass several small towns. Just after Bucerías, take the right exit toward Punta Mita and La Cruz de Huanacaxtle.',
                    'Continue on this road for another 19 kilometers (12 miles) until it ends.',
                    'Take the only public access street toward the Punta de Mita restaurant area.',
                    'At the end of the street, turn left and continue until you find the Hotel Mesón de Mita entrance.',
                ],
            ),
            self::arrivalRoute(
                'auto-guadalajara',
                3,
                'bus',
                'En carro',
                'By car',
                'En carro desde carretera Guadalajara - Puerto Vallarta',
                'By car from the Guadalajara - Puerto Vallarta highway',
                '',
                '',
                '',
                '',
                [],
                [
                    'Tome la autopista Guadalajara - Tepic y siga los señalamientos a Tepic.',
                    'Antes de llegar a Tepic, siga los señalamientos a Puerto Vallarta - Compostela y posteriormente los señalamientos que indiquen únicamente la salida a Puerto Vallarta.',
                    'En su trayecto por la carretera 200 dejara atrás los poblados de Las Varas, La Peñita de Jaltemba, Rincón de Guayabitos, Los Ayala, El Monteon, Lo De Marcos y San Francisco.',
                    'Justo en el kilometro 123 tome el camino de su lado derecho con el señalamiento de entrada hacia Sayulita y continúe hasta el entronque con señalamiento a Punta de Mita.',
                    'Siga por aproximadamente 5 minutos hasta encontrar terminado el camino y entre por la única calle de acceso libre hacia la zona restaurantera de Punta de Mita.',
                    'Llegando al final de la calle gire a la izquierda y siga el camino hasta encontrar la entrada del Hotel Mesón de Mita.',
                ],
                [
                    'Take the Guadalajara - Tepic highway and follow signs to Tepic.',
                    'Before reaching Tepic, follow signs to Puerto Vallarta - Compostela and then signs indicating the exit to Puerto Vallarta.',
                    'On highway 200 you will pass Las Varas, La Peñita de Jaltemba, Rincón de Guayabitos, Los Ayala, El Monteon, Lo De Marcos, and San Francisco.',
                    'At kilometer 123, take the road on your right toward Sayulita and continue until the junction marked Punta de Mita.',
                    'Continue for approximately 5 minutes until the road ends and enter through the only public access street toward the Punta de Mita restaurant area.',
                    'At the end of the street, turn left and continue until you find the Hotel Mesón de Mita entrance.',
                ],
            ),
            self::arrivalRoute(
                'autobus-guadalajara',
                4,
                'bus',
                'En autobús',
                'By bus',
                'En autobús desde Guadalajara',
                'By bus from Guadalajara',
                '',
                '',
                '',
                '',
                [],
                [
                    'Las líneas de autobús recomendadas para llegar a la Riviera Nayarit son ETN, Primera Plus y especialmente Vallarta Plus.',
                    'Una vez llegando a cualquiera de las terminales deberás tomar un autobús local o un taxi hacia Punta de Mita.',
                    'En caso de elegir taxi, indica que te dejen en Punta de Mita sobre la zona de restaurantes en el Hotel Mesón de Mita.',
                    'En caso de elegir autobús, la última parada del camión es Punta de Mita. Al llegar, toma la calle junto al OXXO y camina hasta topar con la playa; gira a tu izquierda y camina hasta encontrar nuestra entrada.',
                ],
                [
                    'Recommended bus lines to reach Riviera Nayarit are ETN, Primera Plus, and especially Vallarta Plus.',
                    'Once you arrive at any terminal, take a local bus or taxi to Punta de Mita.',
                    'If taking a taxi, ask to be dropped off in Punta de Mita in the restaurant area at Hotel Mesón de Mita.',
                    'If taking the bus, the last stop is Punta de Mita. When you arrive, take the street next to OXXO and walk toward the beach; turn left and continue until you find our entrance.',
                ],
            ),
            self::arrivalRoute(
                'transporte-publico-puerto-vallarta',
                5,
                'bus',
                'En transporte público',
                'By public transport',
                'En transporte público desde Puerto Vallarta',
                'By public transport from Puerto Vallarta',
                '',
                '',
                '',
                '',
                [],
                [
                    'El aeropuerto de Puerto Vallarta Licenciado Gustavo Díaz Ordaz se encuentra a 45 minutos de distancia del hotel.',
                    'Si prefieres taxi puedes tomarlo desde la salida del aeropuerto o cruzando la avenida principal por el puente peatonal que se encuentra justo al salir del aeropuerto.',
                    'Si prefieres autobús puedes tomarlo cruzando la avenida principal por el puente peatonal; son de la línea ATM color blanco o gris con destino a Punta de Mita.',
                ],
                [
                    'Puerto Vallarta Licenciado Gustavo Díaz Ordaz Airport is 45 minutes from the hotel.',
                    'If you prefer a taxi, you can take one from the airport exit or cross the main avenue using the pedestrian bridge just outside the airport.',
                    'If you prefer the bus, cross the main avenue using the pedestrian bridge and take the white or gray ATM line heading to Punta de Mita.',
                ],
            ),
        ];
    }

    /**
     * @param  array<int, string>  $linesEs
     * @param  array<int, string>  $linesEn
     * @return array<string, mixed>
     */
    private static function contactItem(string $id, int $order, string $icon, string $labelEs, string $labelEn, array $linesEs, array $linesEn, string $href, bool $external): array
    {
        return [
            'id' => $id,
            'order' => $order,
            'is_active' => true,
            'icon' => $icon,
            'label' => self::text($labelEs, $labelEn),
            'lines' => self::lines($linesEs, $linesEn),
            'href' => $href,
            'external' => $external,
        ];
    }

    /**
     * @param  array<int, string>  $companies
     * @param  array<int, string>  $stepsEs
     * @param  array<int, string>  $stepsEn
     * @return array<string, mixed>
     */
    private static function arrivalRoute(string $id, int $order, string $icon, string $eyebrowEs, string $eyebrowEn, string $titleEs, string $titleEn, string $descriptionEs = '', string $descriptionEn = '', string $footerEs = '', string $footerEn = '', array $companies = [], array $stepsEs = [], array $stepsEn = []): array
    {
        return [
            'id' => $id,
            'order' => $order,
            'is_active' => true,
            'icon' => $icon,
            'eyebrow' => self::text($eyebrowEs, $eyebrowEn),
            'title' => self::text($titleEs, $titleEn),
            'description' => self::text($descriptionEs, $descriptionEn),
            'footer' => self::text($footerEs, $footerEn),
            'companies' => self::lines($companies, $companies),
            'steps' => self::lines($stepsEs, $stepsEn),
        ];
    }

    /**
     * @param  array<int, string>  $valuesEs
     * @param  array<int, string>  $valuesEn
     * @return array<int, array{es: string, en: string}>
     */
    private static function lines(array $valuesEs, array $valuesEn): array
    {
        $length = max(count($valuesEs), count($valuesEn));
        $lines = [];

        for ($index = 0; $index < $length; $index += 1) {
            $lines[] = self::text($valuesEs[$index] ?? '', $valuesEn[$index] ?? $valuesEs[$index] ?? '');
        }

        return $lines;
    }

    /**
     * @return array{es: string, en: string}
     */
    private static function text(string $es, string $en): array
    {
        return [
            'es' => $es,
            'en' => $en,
        ];
    }
}
