document.addEventListener('DOMContentLoaded', function() {
    // Inicializar Leaflet para mostrar el mapa
    const lat = -34.57333333;
    const lng = -58.41472222;
    const address = "Av. Infanta Isabel 110, CABA";
    
    // Inicializar el mapa
    const map = L.map('map').setView([lat, lng], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);
    
    // Agregar marcador
    const marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(address).openPopup();
    
    // Ocultar placeholder
    document.getElementById('map-placeholder').style.display = 'none';
});