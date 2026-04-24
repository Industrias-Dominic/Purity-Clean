const WHATSAPP_CONFIG = {
  numero: "573001234567",
  mensajePorDefecto: "Hola%2C%20estoy%20interesado%20en%20los%20servicios%20de%20Purity%20%26%20Clean",
  cotizadorMensaje: "Hola%2C%20quiero%20agendar%20el%20servicio%20de%20limpieza.%20Detalles%20del%20cotizador%3A%0A",
  saludoPorHora: {
    manana: "Buenos%20d%C3%ADas%2C%20estoy%20interesado%20en%20los%20servicios%20de%20Purity%20%26%20Clean",
    tarde: "Buenas%20tardes%2C%20estoy%20interesado%20en%20los%20servicios%20de%20Purity%20%26%20Clean",
    noche: "Buenas%20noches%2C%20estoy%20interesado%20en%20los%20servicios%20de%20Purity%20%26%20Clean"
  },
  zonas: {
    "home": "Hola%2C%20estoy%20interesado%20en%20los%20servicios%20de%20Purity%20%26%20Clean",
    "barrios-unidos": "Hola%2C%20estoy%20interesado%20en%20servicios%20de%20limpieza%20en%20Barrios%20Unidos",
    "teusaquillo": "Hola%2C%20estoy%20interesado%20en%20servicios%20de%20limpieza%20en%20Teusaquillo",
    "usaquen": "Hola%2C%20estoy%20interesado%20en%20servicios%20de%20limpieza%20en%20Usaqu%C3%A9n",
    "fontibon": "Hola%2C%20estoy%20interesado%20en%20servicios%20de%20limpieza%20en%20Fontib%C3%B3n",
    "chapinero": "Hola%2C%20estoy%20interesado%20en%20servicios%20de%20limpieza%20en%20Chapinero",
    "engativa": "Hola%2C%20estoy%20interesado%20en%20servicios%20de%20limpieza%20en%20Engativ%C3%A1",
    "kennedy": "Hola%2C%20estoy%20interesado%20en%20servicios%20de%20limpieza%20en%20Kennedy",
    "suba": "Hola%2C%20estoy%20interesado%20en%20servicios%20de%20limpieza%20en%20Suba",
    "bosa": "Hola%2C%20estoy%20interesado%20en%20servicios%20de%20limpieza%20en%20Bosa",
    "usme": "Hola%2C%20estoy%20interesado%20en%20servicios%20de%20limpieza%20en%20Usme"
  }
};

const CHATBOT_FAQ = [
  {
    id: "precio-sofas",
    question: "¿Cuánto cuesta la limpieza de un sofá?",
    answer: "El servicio de limpieza profunda de sofás tiene un rango de precio entre $80.000 y $180.000 por unidad, dependiendo del tamaño, material y estado del mueble. La cotización final se realiza al evaluar el espacio.",
    whatsappPrompt: "Hola%2C%20quiero%20saber%20el%20precio%20de%20limpieza%20de%20sof%C3%A1s"
  },
  {
    id: "sanitizacion-colchones",
    question: "¿Cómo funciona la sanitización de colchones?",
    answer: "La sanitización de colchones incluye una desinfección profunda que elimina ácaros, bacterias y olores, mejorando la calidad del descanso. El servicio ranges entre $60.000 y $120.000 por unidad.",
    whatsappPrompt: "Hola%2C%20estoy%20interesado%20en%20el%20servicio%20de%20sanitizaci%C3%B3n%20de%20colchones"
  },
  {
    id: "alfombras-corporativas",
    question: "¿Qué incluye el mantenimiento de alfombras corporativas?",
    answer: "El mantenimiento de alfombras corporativas es un programa periódico para oficinas, salas de reuniones y recepciones de alto tráfico. El precio ranges entre $200.000 y $450.000 por área m².",
    whatsappPrompt: "Hola%2C%20necesito%20informaci%C3%B3n%20sobre%20mantenimiento%20de%20alfombras%20corporativas"
  },
  {
    id: "tiempo-secado",
    question: "¿Cuál es el tiempo de secado después de la limpieza?",
    answer: "Utilizamos procesos con secado rápido que permiten usar los muebles en pocas horas después del servicio. El tiempo exacto depende del tipo de tela y las condiciones del ambiente.",
    whatsappPrompt: "Hola%2C%20%C2%BFcu%C3%A1nto%20tarda%20el%20secado%20despu%C3%A9s%20de%20la%20limpieza%3F"
  },
  {
    id: "seguro-mascotas",
    question: "¿Los productos son seguros para mascotas y niños?",
    answer: "Sí, empleamos productos especializados de alto rendimiento que son seguros para hogares con mascotas y niños. Todos nuestros procesos cumplen con los protocolos de higiene establecidos.",
    whatsappPrompt: "Hola%2C%20tengo%20mascotas%20y%20ni%C3%B1os%20en%20casa%2C%20%C2%BFlos%20productos%20son%20seguros%3F"
  },
  {
    id: "planes-recurrentes",
    question: "¿Ofrecen planes de limpieza recurrentes?",
    answer: "Sí, ofrecemos planes recurrentes con descuentos por compromiso prolongado: Plan Mensual Hogar desde $250.000/mes, Plan Trimestral PYME desde $600.000/trimestre, y Planes Corporativos desde $2.000.000/año.",
    whatsappPrompt: "Hola%2C%20estoy%20interesado%20en%20un%20plan%20recurrente%20de%20limpieza"
  },
  {
    id: "agendar-servicio",
    question: "¿Cómo puedo agendar un servicio?",
    answer: "Puedes agendar tu servicio a través de nuestro formulario de contacto en la sección de Reservas, llamándonos al +57 300 123 4567, o escribiéndonos por WhatsApp al mismo número.",
    whatsappPrompt: "Hola%2C%20quiero%20agendar%20un%20servicio%20de%20limpieza"
  },
  {
    id: "zonas-cobertura",
    question: "¿Qué zonas de Bogotá cubren?",
    answer: "Atendemos hogares y empresas en toda Bogotá y áreas metropolitanas. Para zonas outside de la ciudad principal, consulta disponibilidad al contactarnos.",
    whatsappPrompt: "Hola%2C%20%C2%BFcubren%20la%20zona%20de%20Bogot%C3%A1%3F"
  }
];

const FORMSPREE_CONFIG = {
  booking: "xwpkjvvw",
  newsletter: "xbzykezv",
  zona: "xnepyzll"
};