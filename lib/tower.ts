/**
 * MILLA ZERO — Fuente única de datos.
 * Todo el contenido editable de la landing vive aquí: pisos, disponibilidad,
 * espacios, amenities, arrendatarios y contacto. Los assets viven en
 * /public/assets — reemplazar por mejores fotos/videos/renders a medida
 * que se generen, manteniendo los mismos nombres o actualizando las rutas.
 */

export const A = "/assets";

export const CONTACT = {
  // TODO: confirmar datos de contacto comercial definitivos
  email: "contacto@estropical.com",
  phone: "+591 (3) 000-0000",
  address: "Calle Tropical esq. Av. Las Ramblas #100, Equipetrol Norte",
  city: "Santa Cruz de la Sierra, Bolivia",
  mapsUrl: "https://maps.app.goo.gl/efP9smtL85Ryb1BJ9",
  earthUrl:
    "https://earth.google.com/web/search/estropical/@-17.76018945,-63.20103443,407.46777944a,224.33915953d,35y,-0h,0t,0r",
  coords: "17°45′37″ S · 63°12′04″ W",
};

export const BRAND = {
  name: "MILLA ZERO",
  first: "MILLA",
  second: "ZERO",
  tagline: "Edificio corporativo boutique",
  legal:
    "Milla Zero — Edificio ITC Tower · Bienes Raíces ITC Tropical S.R.L., una inversión del grupo Tropical Tours, desde 1980.",
};

/**
 * Lo que ningún otro edificio de la ciudad puede ofrecer —
 * el argumento central de la presentación.
 */
export const EXCLUSIVES = [
  {
    code: "Z·01",
    title: "Boutique por diseño",
    desc: "Escala deliberadamente contenida: pocas compañías por piso, cero masificación y servicios dimensionados para cada ocupante, no para una multitud.",
  },
  {
    code: "Z·02",
    title: "Mono-propietario",
    desc: "Propiedad horizontal de un solo dueño. Decisiones inmediatas, un único estándar de mantenimiento y condiciones que jamás se exponen ni negocian entre arrendatarios.",
  },
  {
    code: "Z·03",
    title: "100% corporativo",
    desc: "Sin viviendas, sin gimnasio, sin instalaciones de gas. Un solo uso, un solo perfil de riesgo y un solo estándar de seguridad — la identidad del edificio no se mezcla.",
  },
  {
    code: "Z·04",
    title: "Compliance como cultura",
    desc: "Grandes corporaciones — casi todas internacionales — que auditan dónde operan. Sus vecinos comparten su misma exigencia normativa.",
  },
  {
    code: "Z·05",
    title: "Ingeniería de fachada",
    desc: "Doble vidriado hermético y disposición estudiada frente al recorrido del sol: −35% de consumo energético y −30 dB de ruido urbano.",
  },
  {
    code: "Z·06",
    title: "Parqueo a escritorio, menos de 3 minutos",
    desc: "Del subsuelo a su silla sin pisar la calle: ingreso con tarjeta, ascensor directo y acceso independiente por piso.",
  },
  {
    code: "Z·07",
    title: "Doble salida al 4to anillo",
    desc: "Dos frentes de calle y evacuación por dos avenidas principales: logística diaria y seguridad sin cuellos de botella.",
  },
];

export const STATS = [
  { value: 14925, suffix: " m²", label: "Superficie construida" },
  { value: 10, suffix: "", label: "Niveles operativos" },
  { value: 87, suffix: "%", label: "Ocupación actual" },
  { value: 10, suffix: " años", label: "Trayectoria operativa" },
];

export const SPECS = [
  "Doble vidriado hermético · eficiencia energética −35%",
  "Atenuación acústica −30 dB",
  "Altura piso–cielo 3,72 m",
  "Plantas libres de columnas",
  "3 ascensores + montacargas independiente",
  "Generadores con autonomía 72 h",
  "Reserva de emergencia 30.000 L",
  "Climatización individual por oficina",
  "Control de accesos + CCTV",
  "Seguridad permanente 24/7",
  "Póliza multiriesgo + ambulancia",
  "Sin instalaciones de gas · uso 100% corporativo",
  "Doble salida al 4to anillo",
  "Parqueo a escritorio en menos de 3 minutos",
  "Orientación estudiada frente al sol",
];

export type Side = { status: "libre" | "ocupado" | "proyecto"; note: string };

export interface Floor {
  id: string;
  code: string; // etiqueta corta arquitectónica
  name: string;
  norte: Side;
  sur: Side;
  spaceId?: string; // detalle explorable
  detail: string;
}

/** Orden visual: de arriba (P8) hacia abajo (Subsuelo). */
export const FLOORS: Floor[] = [
  {
    id: "p8",
    code: "P8",
    name: "Piso Ocho · Rooftop",
    norte: { status: "proyecto", note: "Proyecto cowork del edificio" },
    sur: { status: "libre", note: "Módulo 183,17 m² · único disponible" },
    spaceId: "p8-modulo",
    detail:
      "En el último nivel queda un único espacio disponible: el módulo ejecutivo de 183,17 m² en el nivel más alto de la torre. El resto del piso alberga la terraza, el futuro rooftop, cowork y amenities del edificio.",
  },
  {
    id: "p7",
    code: "P7",
    name: "Piso Siete",
    norte: { status: "libre", note: "Medio piso disponible" },
    sur: { status: "libre", note: "Medio piso disponible" },
    spaceId: "p7-completo",
    detail:
      "La única planta completa disponible: alas Norte y Sur libres para una operación corporativa unificada en altura.",
  },
  {
    id: "p6",
    code: "P6",
    name: "Piso Seis",
    norte: { status: "ocupado", note: "Multinacional" },
    sur: { status: "ocupado", note: "Multinacional" },
    detail: "Planta ocupada por empresas multinacionales consolidadas.",
  },
  {
    id: "p5",
    code: "P5",
    name: "Piso Cinco",
    norte: { status: "ocupado", note: "Multinacional" },
    sur: { status: "ocupado", note: "Multinacional" },
    detail: "Planta ocupada por empresas multinacionales consolidadas.",
  },
  {
    id: "p4",
    code: "P4",
    name: "Piso Cuatro",
    norte: { status: "ocupado", note: "Multinacional" },
    sur: { status: "ocupado", note: "Multinacional" },
    detail: "Planta ocupada por empresas multinacionales consolidadas.",
  },
  {
    id: "p3",
    code: "P3",
    name: "Piso Tres",
    norte: { status: "libre", note: "Medio piso disponible" },
    sur: { status: "ocupado", note: "Corporativo" },
    spaceId: "p3-norte",
    detail:
      "Medio piso Norte disponible: planta libre de columnas, luz natural y condiciones listas para una adecuación a medida.",
  },
  {
    id: "p2",
    code: "P2",
    name: "Piso Dos",
    norte: { status: "ocupado", note: "Corporativo" },
    sur: { status: "ocupado", note: "Corporativo" },
    detail: "Planta ocupada.",
  },
  {
    id: "p1",
    code: "P1",
    name: "Piso Uno",
    norte: { status: "ocupado", note: "Corporativo" },
    sur: { status: "ocupado", note: "Corporativo + mezzanine" },
    detail: "Planta ocupada, incluye mezzanine.",
  },
  {
    id: "pb",
    code: "PB",
    name: "Planta Baja",
    norte: { status: "ocupado", note: "Oficina norte" },
    sur: { status: "ocupado", note: "Espacio comercial" },
    detail:
      "Lobby corporativo de doble altura en granito y mármol, Work Café, ATM y los espacios comerciales con frente al acceso principal — todos ocupados.",
  },
  {
    id: "ss",
    code: "SS",
    name: "Subsuelo",
    norte: { status: "ocupado", note: "Parqueos" },
    sur: { status: "ocupado", note: "Bauleras" },
    detail:
      "Parqueos con acceso controlado, bauleras de almacenamiento y cuartos técnicos fuera del flujo operativo de oficinas.",
  },
];

export interface Space {
  id: string;
  code: string;
  name: string;
  kicker: string;
  area: string;
  headline: string;
  description: string;
  highlights: string[];
  renders: { src: string; caption: string; tag: string }[];
  plan: { src: string; caption: string };
  program?: { name: string; detail: string }[];
  videos?: { src: string; caption: string; poster?: string }[];
}

export const SPACES: Space[] = [
  {
    id: "p8-modulo",
    code: "08",
    name: "Módulo Piso 8",
    kicker: "El último nivel",
    area: "183,17 m²",
    headline: "El último piso, junto al rooftop.",
    description:
      "Un módulo ejecutivo en el nivel más alto de la torre, en el mismo piso que la terraza, el futuro rooftop y el cowork del edificio. La propuesta de interiores — recepción, gerencia general, sala de reuniones y área operativa — ilustra una implantación sobria, precisa y lista para representar a una dirección corporativa.",
    highlights: [
      "El nivel más alto de la torre",
      "En el mismo piso que la terraza, el rooftop y el cowork del edificio",
      "Fit-out llave en mano: layout, mobiliario, acústica e iluminación",
      "Altura piso–cielo 3,72 m con planta libre",
    ],
    renders: [
      {
        src: `${A}/render-p8-1.jpg`,
        caption: "Recepción y espera — propuesta de interiores",
        tag: "Render 01",
      },
      {
        src: `${A}/render-p8-2.jpg`,
        caption: "Área operativa con estaciones colaborativas",
        tag: "Render 02",
      },
    ],
    plan: {
      src: `${A}/p8-layout.jpg`,
      caption: "Piso 8 · Lado Sur — módulo de 183,17 m²",
    },
    program: [
      { name: "Recepción + espera", detail: "Frente de ingreso con lounge" },
      { name: "Gerencia General", detail: "Despacho principal privado" },
      { name: "Sala de reuniones", detail: "Directorio para 8 personas" },
      { name: "Jefatura", detail: "Oficina privada" },
      { name: "Staff operativo", detail: "8 posiciones colaborativas" },
      { name: "Coffee point", detail: "Área de café y encuentro" },
    ],
    videos: [
      {
        src: `${A}/video-p8-1.mp4`,
        caption: "Recorrido animado del módulo — propuesta de interiores",
        poster: `${A}/render-p8-1.jpg`,
      },
      {
        src: `${A}/video-p8-2.mp4`,
        caption: "El espacio en movimiento — ambientes y circulación",
        poster: `${A}/render-p8-2.jpg`,
      },
    ],
  },
  {
    id: "p7-completo",
    code: "07",
    name: "Piso 7 Completo",
    kicker: "La única planta entera",
    area: "Norte + Sur",
    headline: "Una planta completa para una sola compañía.",
    description:
      "El séptimo piso ofrece ambas alas — Norte y Sur — libres. Permite consolidar una operación corporativa completa en un solo nivel, con planta libre de columnas, núcleo central de servicios y una flexibilidad de layout poco frecuente en la torre.",
    highlights: [
      "Ambas alas disponibles: operación unificada",
      "Planta libre de columnas, máxima flexibilidad",
      "Núcleo central: sanitarios y técnica fuera de la oficina",
      "Un nivel bajo la terraza y amenities del P8",
    ],
    renders: [
      {
        src: `${A}/render-p8-1.jpg`,
        caption: "Referencia de fit-out ejecutivo llave en mano",
        tag: "Referencia",
      },
      {
        src: `${A}/render-p8-2.jpg`,
        caption: "Referencia de área operativa colaborativa",
        tag: "Referencia",
      },
    ],
    plan: {
      src: `${A}/plan-tipo.png`,
      caption: "Planta tipo — alas Norte (azul) y Sur (verde)",
    },
  },
  {
    id: "p3-norte",
    code: "03",
    name: "Piso 3 Norte",
    kicker: "Medio piso ejecutivo",
    area: "Ala Norte",
    headline: "Media planta lista para su próxima sede.",
    description:
      "El ala Norte del tercer piso ofrece una superficie libre de columnas con fachada de doble vidriado hermético. Es una base limpia para diseñar una sede ejecutiva con privacidad, luz natural y entrega llave en mano.",
    highlights: [
      "Planta libre de columnas con luz natural",
      "Fit-out llave en mano incluido como servicio",
      "Acceso independiente desde el núcleo de ascensores",
      "Doble vidriado: −35% energía, −30 dB de ruido",
    ],
    renders: [
      {
        src: `${A}/render-p8-2.jpg`,
        caption: "Referencia de fit-out — estaciones y guardado",
        tag: "Referencia",
      },
      {
        src: `${A}/render-p8-1.jpg`,
        caption: "Referencia de recepción corporativa",
        tag: "Referencia",
      },
    ],
    plan: {
      src: `${A}/plan-tipo.png`,
      caption: "Planta tipo — ala Norte en azul",
    },
  },
];

export interface Amenity {
  title: string;
  meta: string;
  desc: string;
  img: string;
  pos?: string; // object-position override
}

export const AMENITIES: Amenity[] = [
  {
    title: "Lobby corporativo",
    meta: "220 m² · doble altura",
    desc: "Recepción de primer nivel con revestimiento total en granito y mármol, registro de visitantes y control de accesos con tarjeta magnética.",
    img: `${A}/lobby-wide.jpg`,
  },
  {
    title: "Work Café",
    meta: "Illy · planta baja",
    desc: "Cafetería propia con servicio Illy, Wi-Fi y un ambiente discreto para encuentros breves, esperas ejecutivas y reuniones informales.",
    img: `${A}/work-cafe.jpg`,
  },
  {
    title: "Terraza · Piso 8",
    meta: "Rooftop en desarrollo",
    desc: "Terrazas norte y sur en el último nivel, con proyecto de descanso, encuentro y rooftop reservado para la comunidad del edificio.",
    img: `${A}/terraza-sur.jpg`,
  },
  {
    title: "Parqueos & bauleras",
    meta: "Subsuelo + lote cercano",
    desc: "Estacionamiento en subsuelo con acceso controlado, parqueo cerrado adicional a metros del edificio y bauleras de custodia.",
    img: `${A}/subsuelo.jpg`,
  },
  {
    title: "Seguridad integral",
    meta: "24 / 7 · 365",
    desc: "Guardias permanentes, CCTV en áreas comunes, escalera exterior ventilada, sistema contra incendios por piso y generadores con 72 h de autonomía.",
    img: `${A}/facade-day.jpg`,
  },
  {
    title: "Servicios incluidos",
    meta: "Expensas todo incluido",
    desc: "Limpieza de áreas comunes con insumos incluidos, mantenimiento integral y sanitarios institucionales independientes dentro de una expensa ordenada.",
    img: `${A}/sanitarios.jpg`,
  },
];

export const TENANTS = [
  "Abbot",
  "Huawei",
  "Crediseguro",
  "Repsol",
  "Estropical.com",
  "Bovinsa",
];

export interface ProposalSheet {
  id: string;
  code: string;
  name: string;
  role: string;
  sheet: string;
  /** Render ejecutivo cenital (vista top-down foto-realista) */
  render: string;
  capacity: string;
  program: string[];
}

/**
 * Propuesta integral de diseño de interiores (07.2026) para los pisos 1–3:
 * cuatro láminas, una sola propuesta. Demuestra el alcance del servicio
 * llave en mano a escala multi-planta — no implica disponibilidad de
 * esos niveles.
 */
export const PROPOSAL = {
  kicker: "Propuesta integral — llave en mano a escala",
  title: "Tres plantas, un solo trazo.",
  intro:
    "Cuatro láminas y una sola propuesta: el estudio de interiorismo resolvió los pisos 1, 2 y 3 como una operación continua de más de 200 posiciones — dirección, directorio y plataformas operativas — con el mobiliario, la acústica y la iluminación definidos al detalle. El mismo estándar con el que se entrega cada espacio de Milla Zero.",
  note: "Propuesta de diseño · no implica disponibilidad de estos niveles",
  credit:
    "Propuesta de interiorismo · llave en mano Milla Zero",
  sheets: [
    {
      id: "prop-p1",
      code: "P1",
      name: "Piso Uno",
      role: "Planta completa · operación y recepción",
      sheet: `${A}/proposal-p1.jpg`,
      render: `${A}/render-top-p1.jpg`,
      capacity: "42 puestos operativos",
      program: [
        "Recepción y espera con escalera helicoidal",
        "Staff operativo 24 + 12 + 6 personas",
        "2 salas de reunión · 3 jefaturas",
        "Coffee point · 2 áreas de impresión",
        "Centro de control CCTV",
      ],
    },
    {
      id: "prop-p2a",
      code: "P2·A",
      name: "Piso Dos — Lado A",
      role: "Dirección y gobierno",
      sheet: `${A}/proposal-p2a.jpg`,
      render: `${A}/render-top-p2a.jpg`,
      capacity: "Directorio 12 + gerencia general",
      program: [
        "Directorio para 12 personas",
        "Gerencia general con lounge privado",
        "2 jefaturas · staff de apoyo 8 + 12",
        "2 salas de reunión · coffee point",
        "Baños privados · salida a terraza exterior",
      ],
    },
    {
      id: "prop-p2b",
      code: "P2·B",
      name: "Piso Dos — Lado B",
      role: "Plataforma operativa",
      sheet: `${A}/proposal-p2b.jpg`,
      render: `${A}/render-top-p2b.jpg`,
      capacity: "66 puestos operativos",
      program: [
        "Staff operativo 66 personas con divisiones verdes",
        "3 jefaturas · 3 salas de reunión",
        "Sala de copiado · lockers de personal",
      ],
    },
    {
      id: "prop-p3",
      code: "P3",
      name: "Piso Tres",
      role: "Plataforma operativa mayor",
      sheet: `${A}/proposal-p3.jpg`,
      render: `${A}/render-top-p3.jpg`,
      capacity: "75 puestos operativos",
      program: [
        "Staff operativo 75 personas",
        "3 jefaturas · sala de reunión",
        "Coffee point · 3 áreas de impresión",
      ],
    },
  ] as ProposalSheet[],
};

export const LOCATION_POINTS = [
  { name: "Doble salida al 4to Anillo", detail: "dos frentes de calle" },
  { name: "Av. San Martín", detail: "eje empresarial" },
  { name: "Marriott · Los Tajibos · Camino Real", detail: "hotelería 5★" },
  { name: "La Riviera · Patio Design · Ventura", detail: "shopping & dining" },
  { name: "Banca Top 7", detail: "servicios financieros" },
  { name: "ANH · SEGIP · SIN", detail: "instituciones públicas" },
];
