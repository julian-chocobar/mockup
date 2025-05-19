
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
        const mockNoticiasUbicacion = [
            {
                id: 3,
                titulo: "Maratón vecinal en el parque",
                descripcion:
                    "Con gran participación familiar y ambiente festivo, se realizó la 5ta edición de la maratón barrial, promoviendo vida saludable y la unión del vecindario.",
                tema: "DEPORTES",
                fechaPublicacion: "13/05/2023",
                fotos: [
                    {
                        url: "https://images.unsplash.com/photo-1596727362302-b8d891c42ab8?q=80&w=1985&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        descripcion: "Maratón vecinal",
                    },
                ],
                ubicacion: {
                    direccion: "Av. Infanta Isabel 110, CABA",
                    latitud: -34.57333333,
                    longitud: -58.41472222,
                },
            },
            {
                id: 4,
                titulo: "Nueva muestra de arte local",
                descripcion:
                    "La cultura florece en el centro comunitario. 15 artistas emergentes exponen obras que fusionan técnicas tradicionales con innovación digital en una exposición gratuita que promete ser el evento cultural de la temporada.",
                tema: "CULTURA",
                fechaPublicacion: "13/05/2023",
                fotos: [
                    {
                        url: "https://images.unsplash.com/photo-1743119638006-a01d4625745d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        descripcion: "Muestra de arte",
                    },
                ],
                ubicacion: {
                    direccion: "Vélez Sársfield 4650, Munro",
                    latitud: -34.530329,
                    longitud: -58.523958,
                },
            }
        ]

        añadirMarcadoresNoticias(mockNoticiasUbicacion, mapa);

    } else {
        console.error('No se pudo encontrar el elemento con el id "map"');
    }

});

function añadirMarcadoresNoticias(mockNoticiasUbicacion, mapa) {
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
