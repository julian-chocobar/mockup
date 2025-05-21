/**
 * Utilidades y funciones comunes para el módulo de noticias
 */

// --- Constantes ---
const API_URL = "/api/noticias"
const TEMAS = ["POLITICA", "ECONOMIA", "DEPORTES", "TECNOLOGIA", "CULTURA", "SOCIEDAD", "SALUD"]
const USIG_API_URL = "https://servicios.usig.buenosaires.gob.ar/normalizar"

// --- Coordenadas por defecto (Buenos Aires) ---
const DEFAULT_LAT = -34.6037
const DEFAULT_LNG = -58.3816

/**
 * Inicializa un mapa de Leaflet
 * @param {string} mapId - ID del elemento HTML donde se mostrará el mapa
 * @param {number} lat - Latitud inicial (opcional)
 * @param {number} lng - Longitud inicial (opcional)
 * @param {number} zoom - Nivel de zoom inicial (opcional)
 * @returns {Object} - Objeto con el mapa y el marcador (null inicialmente)
 */
function initializeMap(mapId, lat = DEFAULT_LAT, lng = DEFAULT_LNG, zoom = 13) {
  // Crear el mapa
  const map = L.map(mapId).setView([lat, lng], zoom)

  // Agregar capa de OpenStreetMap
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map)

  // Actualizar el mapa cuando cambia su tamaño
  setTimeout(() => {
    map.invalidateSize()
  }, 100)

  return { map, marker: null }
}

/**
 * Actualiza un mapa con nuevas coordenadas y un marcador
 * @param {Object} map - Objeto mapa de Leaflet
 * @param {Object} marker - Marcador actual (puede ser null)
 * @param {number} lat - Latitud
 * @param {number} lng - Longitud
 * @param {string} popupText - Texto para el popup del marcador
 * @param {number} zoom - Nivel de zoom (opcional)
 * @returns {Object} - Marcador actualizado
 */
function updateMapMarker(map, marker, lat, lng, popupText, zoom = 15) {
  // Actualizar la vista del mapa
  map.setView([lat, lng], zoom)

  // Eliminar el marcador anterior si existe
  if (marker) {
    marker.remove()
  }

  // Agregar un nuevo marcador
  marker = L.marker([lat, lng]).addTo(map).bindPopup(popupText).openPopup()

  // Forzar actualización del mapa
  map.invalidateSize()

  return marker
}

/**
 * Normaliza una dirección usando la API de USIG
 * @param {string} direccion - Dirección a normalizar
 * @returns {Promise} - Promesa que resuelve con los datos de la dirección normalizada
 */
async function normalizarDireccion(direccion) {
  try {
    const response = await fetch(
      `${USIG_API_URL}?direccion=${encodeURIComponent(direccion)}&geocodificar=TRUE&maxOptions=5`,
    )
    const data = await response.json()

    if (Array.isArray(data.direccionesNormalizadas) && data.direccionesNormalizadas.length > 0) {
      const dir = data.direccionesNormalizadas[0]
      return {
        success: true,
        direccion: dir.direccion,
        latitud: dir.coordenadas.y,
        longitud: dir.coordenadas.x,
      }
    } else {
      return {
        success: false,
        mensaje: "No se pudo normalizar la dirección. Verifique e intente nuevamente.",
      }
    }
  } catch (error) {
    console.error("Error al normalizar la dirección:", error)
    return {
      success: false,
      mensaje: "Error de conexión al servicio USIG.",
    }
  }
}

/**
 * Carga los temas disponibles en un elemento select
 * @param {HTMLElement} selectElement - Elemento select donde cargar los temas
 * @param {boolean} includeEmpty - Si se debe incluir una opción vacía al inicio
 */
function cargarTemasEnSelect(selectElement, includeEmpty = true) {
  // Limpiar opciones existentes
  if (includeEmpty) {
    selectElement.innerHTML = '<option value="">Todos los temas</option>'
  } else {
    selectElement.innerHTML = ""
  }

  // Agregar cada tema como opción
  TEMAS.forEach((tema) => {
    const option = document.createElement("option")
    option.value = tema
    option.textContent = tema
    selectElement.appendChild(option)
  })
}

/**
 * Muestra un mensaje de error en la UI
 * @param {string} mensaje - Mensaje de error a mostrar
 * @param {string} tipo - Tipo de mensaje (error, warning, success)
 */
function mostrarMensaje(mensaje, tipo = "error") {
  // Implementación simplificada para el mock
  alert(mensaje)
}

// Función para inicializar la autenticación
function initAutenticacion() {
  // Elementos del DOM
  const notAuth = document.getElementById("notAuthenticated")
  const auth = document.getElementById("authenticated")
  const btnNuevaNoticia = document.getElementById("btnNuevaNoticia")
  const userEmailText = document.getElementById("userEmailText")
  const userRoleText = document.getElementById("userRoleText")

  // Verificar si hay un usuario mock en localStorage
  const mockUserJson = localStorage.getItem("mockUser")
  let mockUser = null

  if (mockUserJson) {
    try {
      mockUser = JSON.parse(mockUserJson)

      // Usuario autenticado
      if (notAuth) notAuth.classList.add("hidden")
      if (auth) auth.classList.remove("hidden")

      // Mostrar información del usuario
      if (userEmailText) userEmailText.textContent = mockUser.email
      if (userRoleText) userRoleText.textContent = mockUser.rol === "ADMINISTRADOR" ? "Administrador" : "Vecino"

      // Mostrar botón nueva noticia solo para administradores
      if (mockUser.rol === "ADMINISTRADOR" && btnNuevaNoticia) {
        btnNuevaNoticia.classList.remove("hidden")
      }
    } catch (e) {
      console.error("Error al parsear usuario mock:", e)
      localStorage.removeItem("mockUser") // Limpiar datos corruptos

      // Usuario no autenticado
      if (notAuth) notAuth.classList.remove("hidden")
      if (auth) auth.classList.add("hidden")
      if (btnNuevaNoticia) btnNuevaNoticia.classList.add("hidden")
    }
  } else {
    // Usuario no autenticado
    if (notAuth) notAuth.classList.remove("hidden")
    if (auth) auth.classList.add("hidden")
    if (btnNuevaNoticia) btnNuevaNoticia.classList.add("hidden")
  }
}

// Exportar las funciones y constantes
window.NoticiasCommon = {
  API_URL,
  TEMAS,
  DEFAULT_LAT,
  DEFAULT_LNG,
  initializeMap,
  updateMapMarker,
  normalizarDireccion,
  cargarTemasEnSelect,
  mostrarMensaje,
  initAutenticacion,
}
