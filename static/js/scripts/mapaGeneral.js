import { mockNoticiasUbicacion } from "./noticias_mock.js"; //Importo las noticias del js donde estan todas las del mock
document.addEventListener('DOMContentLoaded', function () {

    // 1. Obtener el mapa
    const mapaObjeto = document.getElementById('map');

    // 2. Verificar que el mapa existe
    if (mapaObjeto) {
        // 3. Inicializar el mapa 
        const mapa = L.map('map').setView([-34.6037, -58.3816], 10); // Coordenadas de Buenos Aires

        // 4. Agregar una capa de tiles para poder ver las calles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
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

            marker.bindPopup(`<div> <b>${noticia.titulo}</b><br><img src="${noticia.fotos[0].url}" alt="${noticia.fotos[0]}" style="width:150px; height:auto;"><br><a href="../templates/noticias/ver-${noticia.id}.html">Ver más</a></div>`);
        }
    };
}
