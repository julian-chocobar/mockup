import { mockNoticiasUbicacion } from "./noticias_mock.js";
document.addEventListener('DOMContentLoaded', function () {

    // 1. Obtener el mapa
    const mapaObjeto = document.getElementById('map');

    // 2. Verificar que el elemento del mapa existe
    if (mapaObjeto) {
        // 3. Inicializar el mapa de Leaflet
        const mapa = L.map('map').setView([-34.6037, -58.3816], 10); // Coordenadas de Buenos Aires y zoom inicial

        // 4. Agregar una capa de tiles (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapa);        

        añadirMarcadoresNoticias(mapa);

    } else {
        console.error('No se pudo encontrar el elemento con el id "map"');
    }

});

function añadirMarcadoresNoticias(mapa) {
    for (let i = 0; i < mockNoticiasUbicacion.length; i++) {
        const noticia = mockNoticiasUbicacion[i];
        if (noticia.ubicacion && noticia.ubicacion.latitud && noticia.ubicacion.longitud) {
            const marker = L.marker([noticia.ubicacion.latitud, noticia.ubicacion.longitud]).addTo(mapa);

            /*Formato HTML para la preview de la noticia*/
            const contenidoPopup = `<div> <b>${noticia.titulo}</b><br><img src="${noticia.fotos[0].url}" alt="${noticia.fotos[0].descripcion}" style="width:150px; height:auto;"><br><a href="../templates/noticias/ver-${noticia.id}.html">Ver más</a></div>`;
            marker.bindPopup(contenidoPopup);
        }
    };
}
