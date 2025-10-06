export type ProjectItem = {
  id: string;
  title: string;
  summary: string;
  stack: string[];
  images: { id: string; src: string; alt: string }[];
  demoUrl?: string;
  repoUrl?: string;
};

export type TestimonialItem = {
  id: string;
  company: string;
  author: string;
  role: string;
  content: string;
};

export const PROJECTS: ProjectItem[] = [
  {
    id: "p2",
    title: "Automatización N8N",
    summary: "Desarrollé un sistema de automatización inteligente utilizando n8n, que gestiona el flujo completo de agendamiento de citas para una empresa de servicios. El sistema recibe solicitudes a través de WhatsApp o llamadas telefónicas, valida la disponibilidad en una base de datos, agenda la cita automáticamente y envía confirmaciones al cliente junto con recordatorios previos al evento. Se integraron múltiples servicios a través de n8n, utilizando nodos de comunicación, lógica condicional y conexión con APIs externas. El resultado fue un flujo automatizado capaz de reducir el trabajo manual y mejorar la atención al cliente.",
    stack: ["n8n", "WhatsApp API", "Twilio", "Node.js", "Google Calendar API", "MySQL", "Webhooks"],
    images: [
  { id: "p2-1", src: "/projects/n8n-flow.PNG", alt: "Proyecto 2 imagen 1" },
      { id: "p2-2", src: "/projects/n8n-res.png", alt: "Proyecto 2 imagen 2" },
    ],
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: "p3",
    title: " API entre sistema contable y WooCommerce",
    summary: "Desarrollé un proceso automatizado tipo API que sincroniza los productos del sistema contable de una empresa con su tienda online en WooCommerce, garantizando la actualización en tiempo real de inventarios, precios y descripciones. El desarrollo se implementó mediante un cron job en PHP que conecta con la base de datos del sistema contable, procesa los datos y los adapta a una tabla intermedia, desde donde son enviados a las tablas correspondientes de WordPress y WooCommerce.Esta arquitectura permite mantener la información sincronizada sin intervención manual, optimizando la gestión de productos y reduciendo errores humanos.",
    stack: ["PHP", "MySQL", "WordPress / WooCommerce", "Cron"],
    images: [
      { id: "p3-1", src: "/projects/api-interfaz.png", alt: "Proyecto 3 interfaz" },
      { id: "p3-2", src: "/projects/api-diagrama.png", alt: "Proyecto 3 diagrama" },
  { id: "p3-3", src: "/projects/api-linux.PNG", alt: "Proyecto 3 ejecución Linux" },
    ],
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: "p4",
    title: "GoProof",
    summary: "Se hizo una aplicacion movil para la gestion de pedidos y facturacion electronica para una empresa de servicios de mensajeria y paqueteria. La aplicacion permite a los usuarios crear, gestionar y rastrear pedidos, asi como generar facturas electronicas de manera rapida y sencilla. La aplicacion cuenta con una interfaz intuitiva y facil de usar, ademas de integrarse con sistemas de pago y envio para ofrecer una experiencia completa al usuario.",
    stack: ["React", "TypeScript", "Chart.js"],
    images: [
  { id: "p4-1", src: "/projects/goproof-desk.PNG", alt: "Proyecto 4 dashboard" },
  { id: "p4-2", src: "/projects/goproof-map.PNG", alt: "Proyecto 4 mapa de pedidos" },
  { id: "p4-3", src: "/projects/goproof-login.PNG", alt: "Proyecto 4 login" },
    ],
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: "p5",
    title: "Recolección de productos.",
    summary: "Se desarrollo un sistema de recoleccion de productos por medio de formularios de manera que el usuario pueda interactuar con el llenado y agilizar las validaciones pertinentes para el cliente empresa, mejorando la eficiencia y tiempo de los empleados y facilitando la lectura de formularios para los empleados.",
    stack: ["Next.js", "Nest.js", "Chart UI", "AWS EC2", "Amplify"],
    images: [
  { id: "p5-1", src: "/projects/puntoazul-login.PNG", alt: "Proyecto 5 login" },
  { id: "p5-2", src: "/projects/puntoazul-dashboard.PNG", alt: "Proyecto 5 dashboard" },
  { id: "p5-3", src: "/projects/puntoazul-login.PNG", alt: "Proyecto 5 login alterno" },
    ],
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: "p6",
    title: "Sistema de administracion",
    summary: "Se desarrollo un sistema de administracion automatica de tareas para empleados administradores de edificos de tal manera que se pueda hacer seguimiento, control y asignacion de tareas a los empleados. El sistema cuenta con autenticacion de usuarios, roles y permisos, panel de control con estadisticas, gestion de tareas con estados y prioridades, notificaciones por email y un calendario integrado para visualizar las tareas programadas. Este proyecto fue construido utilizando una arquitectura RESTful con Node.js y Express en el backend, y una base de datos relacional para almacenar la informacion. El frontend fue desarrollado con React y Tailwind CSS para una experiencia de usuario moderna y responsiva.",
    stack: ["Node", "Express", "Next.js", "Cpanel"],
    images: [
  { id: "p6-1", src: "/projects/unir-login.PNG", alt: "Proyecto 6 login" },
  { id: "p6-2", src: "/projects/unir-dashboard.PNG", alt: "Proyecto 6 dashboard" },
    ],
    demoUrl: "#",
    repoUrl: "#",
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  { id: "t1", company: "", author: "Carlos M.", role: "Emprendedor", content: "Juan entendió rápido la necesidad y convirtió un proceso manual en algo totalmente automatizado." },
  { id: "t2", company: "", author: "Daniela R.", role: "Coordinadora TI", content: "Claridad, buena comunicación y entregas puntuales. El sistema funciona estable desde el día 1." },
  { id: "t3", company: "", author: "Felipe A.", role: "CTO", content: "Propuso mejoras que no habíamos considerado y optimizó tiempos de respuesta de la API." },
  { id: "t4", company: "", author: "María José P.", role: "Product Owner", content: "Documentación ordenada y handoff perfecto al equipo interno. Muy profesional." },
  { id: "t5", company: "", author: "Santiago L.", role: "Founder", content: "Reducimos carga operativa gracias a los flujos automatizados que construyó." },
  { id: "t6", company: "", author: "Lucía V.", role: "Analista", content: "Su refactor eliminó errores recurrentes y mejoró la mantenibilidad del proyecto." },
];
