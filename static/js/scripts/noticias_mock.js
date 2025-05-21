//Noticias de prueba para el prototipo
import { Noticia } from "../entidades/Noticia.js";
import { Foto } from "../entidades/Foto.js";
import { Ubicacion } from "../entidades/Ubicacion.js";
export const mockNoticiasUbicacion = [
  new Noticia(1,
    "Avances en inteligencia artificial",
    "Un equipo de investigadores ha desarrollado un sistema de IA capaz de resolver problemas complejos con un rendimiento similar al de expertos humanos, marcando un hito en el campo de la inteligencia artificial.",
    "TECNOLOGIA", "15/03/2024",
    [new Foto("Inteligencia artificial", "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?q=80&w=1992&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")],
  ),
  new Noticia(2,
    "Crisis en el mercado financiero",
    "Los mercados bursátiles registran fuertes caídas tras el aumento de tasas de interés y señales de desaceleración económica, generando incertidumbre entre inversionistas.",
    "ECONOMIA", "14/05/2024", 
    [new Foto("Mercado financiero", "https://images.unsplash.com/photo-1621629057099-c7cf1fb8ca1e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")]
  ),
  new Noticia(3,
    "Maratón vecinal en el parque",
    "Con gran participación familiar y ambiente festivo, se realizó la 5ta edición de la maratón barrial, promoviendo vida saludable y la unión del vecindario.",
    "DEPORTES", "13/05/2023",
    [new Foto("Maratón vecinal", "https://images.unsplash.com/photo-1596727362302-b8d891c42ab8?q=80&w=1985&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")],
    new Ubicacion("Av. Infanta Isabel 110, CABA", -34.57333333, -58.41472222)),
  new Noticia(4,
    "Nueva muestra de arte local",
    "La cultura florece en el centro comunitario. 15 artistas emergentes exponen obras que fusionan técnicas tradicionales con innovación digital en una exposición gratuita que promete ser el evento cultural de la temporada.",
    "CULTURA", "13/05/2023",
    [new Foto("Muestra de arte", "https://images.unsplash.com/photo-1743119638006-a01d4625745d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")],
    new Ubicacion("Vélez Sársfield 4650, Munro", -34.530329, -58.523958)),
  new Noticia(5,
    "Campaña de vacunación gratuita",
    "El Ministerio de Salud local anunció la disponibilidad de dosis contra influenza, COVID-19 y neumococo en todos los centros públicos con horarios extendidos hasta agosto.",
    "SALUD", "13/05/2023",
    [new Foto("Campaña de vacunación", "https://images.unsplash.com/photo-1578307985320-34b61a66c195?q=80&w=2078&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")]),
];