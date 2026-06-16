import {
    BusFront,
    CarFront,
    Plane,
} from 'lucide-react';
import type { ArrivalRoute } from "../interfaces";

export const arrivalRoutes: ArrivalRoute[] = [
    {
        id: 'via-aerea',
        eyebrow: 'Vía aérea',
        title: 'Desde el aeropuerto',
        description: 'Llegada al Aeropuerto Internacional Gustavo Díaz Ordaz (PVR) este se localiza en Puerto Vallarta a 40 km de distancia de Punta de Mita, aproximadamente 45 minutos.',
        footer: "Al llegar al aeropuerto, hay casetas que ofrecen el servicio de taxis o vans para trasladarse. También allí mismo podrá encontrar distintas compañías con servicio de alquiler de automóviles. Para llegar desde el Aeropuerto Internacional Gustavo Díaz Ordaz a Punta de Mita en automóvil deberá seguir las indicaciones vía terrestre Puerto Vallarta – Punta de Mita.",
        companias: [
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
        icon: Plane,
    },
    {
        id: 'auto',
        eyebrow: 'En carro',
        title: 'En carro desde Puerto Vallarta',
        icon: CarFront,
        steps: [
          "Tome la carretera principal # 200 siguiendo los señalamientos en dirección a Tepic y Compostela. Continúe por esta carretera aproximadamente por 25 minutos (21 kilómetros).",
          "A lo largo de su trayectoria dejara atrás algunos pueblitos y justo después del pueblito llamado “Bucerías” tome la salida del lado derecho hacia Punta Mita y La Cruz de Huanacaxtle.",
          "Continúe por esta carretera otros 19 kilómetros (12 millas) hasta llegar a su fin.",
          "Tome la única calle de acceso libre que lleva a la zona restaurantera de Punta de Mita.",
          "Llegando al final de la calle (topa con la zona de restaurantes) gire a la izquierda y siga el camino hasta encontrar la entrada del Hotel Mesón de Mita (Referencia: Frente al Cuartel de la Marina).",
        ],
    },
    {
        id: 'autobus',
        eyebrow: 'En carro',
        title: 'En carro desde carretera Guadalajara - Puerto Vallarta',
        icon: BusFront,
        steps: [
          "Tome la autopista Guadalajara – Tepic y siga los señalamientos a Tepic.",
          "Antes de llegar a Tepic, pasando Ixtlán de Río siga los señalamientos a Puerto Vallarta – Compostela y posteriormente los señalamientos que indiquen únicamente la salida a Puerto Vallarta (Carr. Mex 200).",
          "En su trayecto por la carretera 200 dejara atrás los poblados de Las Varas, La Peñita de Jaltemba, Rincón de Guayabitos, Los Ayala, El Monteon, Lo De Marcos y San Francisco (“San Pancho”).",
          "Justo en el kilometro 123 tome el camino de su lado derecho con el señalamiento de entrada hacia el poblado de Sayulita y continúe sin desviarse en el acceso al pueblo por aproximadamente 20 minutos hasta llegar al entronque con señalamiento a Punta de Mita y gire a la derecha.",
          "Siga por aproximadamente 5 minutos hasta encontrar terminado el camino y entre por la única calle de acceso libre que lleva hacia la zona restaurantera de Punta de Mita.",
          "Llegando al final de la calle (topa con la zona de restaurantes) gire a la izquierda y siga el camino hasta encontrar la entrada del Hotel Mesón de Mita (Referencia: Frente al Cuartel de la Marina).",
          "También puede planear su ruta hacia Punta de Mita desde cualquier estado de la República Mexicana con ayuda de la página de caminos y puentes federales http://capufe.gob.mx/portal/site/wwwCapufe/index.html dando clic en la opción traza tu ruta con la SCT."
        ],
    },
    {
        id: 'autobus-gdl',
        eyebrow: 'En autobus',
        title: 'En autobus desde Guadalajara',
        icon: BusFront,
        steps: [
          "Las lineas de autobús que nosotros recomendamos para llegar a la Riviera Nayarit que es donde nosotros nos encontramos son ETN, Primera Plus y especialmente Vallarta Plus. Estas líneas de autobús cuentan con terminal en Nuevo Vallarta que se encuentra a 35 minutos de distancia de Punta de Mita aproximadamente. La Línea Vallarta Plus tiene también terminal en el poblado de Bucerias que se encuentra a 25 minutos de distancia aproximados de Punta de Mita.",

          "Una vez llegando a cualquiera de las terminales deberás tomar un autobus local o un taxi que los traslade hacia Punta de Mita. Los costos del taxi van de los $500 a los $800 pesos y los costos de autobús son aproximadamente de $40 pesos por persona.",

          "En caso de elegir taxi. Los taxis te dejaran justo en la puerta del hotel, solo debes indicarles que te dejen en Punta de Mita sobre la zona de restaurantes en el Hotel Meson de Mita. Si el taxista no conoce el hotel solo deben recorrer la calle hasta encontrar nuestra entrada (es una calle no muy larga).",

          "En caso de elegir autobús. La última parada del camión es Punta de Mita así que no debes preocuparte por estar pendiente de hacer la parada al conductor, al llegar a Punta de Mita veras una tienda OXXO en una esquina, hay que tomar la calle que esta junto al OXXO y caminar hasta topar con la playa (zona restaurantera), gira a tu izquierda y camina hasta encontrar nuestra entrada (1 cuadra, 3 minutos aprox).",
        ],
    },
    {
        id: 'autobus-gdl',
        eyebrow: 'En transporte público',
        title: 'En transporte público desde Puerto Vallarta (Aeropuerto Internacional)',
        icon: BusFront,
        steps: [
          "El aeropuerto de Puerto Vallarta Licenciado Gustavo Diaz Ordaz se encuentra a 45 minutos de distancia del hotel.",

          "Si prefieres taxi puedes tomarlo desde la salida del aeropuerto (costo aprox: $1,800 pesos) o puedes tomar un taxi local cruzando la avenida principal por el puente peatonal que se encuentra justo al salir del aeropuerto (costo aprox: $500/$800 pesos). Los taxis te dejaran justo en la puerta del hotel, solo debes indicarles que te dejen en Punta de Mita sobre la zona de restaurantes en el Hotel Meson de Mita. Si el taxista no conoce el hotel solo deben recorrer la calle hasta encontrar nuestra entrada (es una calle no muy larga).",

          "Si prefieres autobús puedes tomarlo también cruzando la avenida principal por el puente peatonal que se encuentra justo al salir del aeropuerto, son de la linea ATM color blanco o gris con destino a Punta de Mita (costo aprox: $40 pesos x persona). La ultima parada del camion es Punta de Mita asi que no debes preocuparte por estar pendiente de hacer la parada al conductor, al llegar a Punta de Mita veras una tienda OXXO en una esquina, hay que tomar la calle que esta junto al OXXO y caminar hasta topar con la playa (zona restaurantera), gira a tu izquierda y camina hasta encontrar nuestra entrada (1 cuadra, 3 minutos aprox).",
        ],
    },
];