document.addEventListener("DOMContentLoaded", () => {
    // Importar funciones comunes
    const { initializeMap, updateMapMarker, TEMAS } = window.NoticiasCommon
  
    // Constante para el servicio USIG
    const USIG_API_URL = "https://servicios.usig.buenosaires.gob.ar/normalizar"

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
  
    // Variables globales
    let mapObj = { map: null, marker: null }
    let fotoCount = 1 // Ya tenemos una foto por defecto
  
    // --- Inicializar el editor de texto ---
    const quill = new Quill("#editor", {
      theme: "snow",
      placeholder: "Escriba el contenido de la noticia aquí...",
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["link", "blockquote", "code-block"],
          [{ color: [] }, { background: [] }],
          ["clean"],
        ],
      },
    })
  
    // Actualizar el campo oculto con el contenido del editor
    quill.on("text-change", () => {
      document.getElementById("cuerpo").value = quill.root.innerHTML
    })
  
    // --- Manejo de la sección de ubicación ---
    const includeLocationCheckbox = document.getElementById("includeLocation")
    const locationFields = document.getElementById("locationFields")
  
    // Elementos para la normalización de dirección
    const normalizarBtn = document.getElementById("normalizarBtn")
    const direccionInput = document.getElementById("ubicacion.direccion")
    const latitudInput = document.getElementById("ubicacion.latitud")
    const longitudInput = document.getElementById("ubicacion.longitud")
    const direccionNormalizada = document.getElementById("direccionNormalizada")
    const direccionError = document.getElementById("direccionError")
    const normalizarText = document.getElementById("normalizarText")
    const normalizarSpinner = document.getElementById("normalizarSpinner")
  
    // Inicializar el select de temas
    const temaSelect = document.getElementById("tema")
    TEMAS.forEach((tema) => {
      const option = document.createElement("option")
      option.value = tema
      option.textContent = tema
      temaSelect.appendChild(option)
    })
  
    includeLocationCheckbox.addEventListener("change", function () {
      locationFields.classList.toggle("hidden", !this.checked)
  
      // Si se marca, inicializar el mapa
      if (this.checked) {
        // Inicializar el mapa si no existe
        if (!mapObj.map) {
          mapObj = initializeMap("map")
        }
      } else {
        // Si se desmarca, limpiar los campos
        direccionInput.value = ""
        latitudInput.value = ""
        longitudInput.value = ""
        direccionNormalizada.classList.add("hidden")
        direccionError.classList.add("hidden")
  
        // Limpiar el marcador si existe
        if (mapObj.marker) {
          mapObj.marker.remove()
          mapObj.marker = null
        }
      }
    })
  
    // --- Normalización de dirección con USIG ---
    normalizarBtn.addEventListener("click", async (e) => {
      e.preventDefault()
      const direccion = direccionInput.value.trim()
      if (!direccion) {
        alert("Por favor, ingrese una dirección para normalizar")
        return
      }
  
      // Mostrar spinner y ocultar mensajes
      normalizarText.classList.add("hidden")
      normalizarSpinner.classList.remove("hidden")
      direccionNormalizada.classList.add("hidden")
      direccionError.classList.add("hidden")
  
      // Usar la función común para normalizar
      const resultado = await normalizarDireccion(direccion)
  
      // Ocultar spinner
      normalizarText.classList.remove("hidden")
      normalizarSpinner.classList.add("hidden")
  
      if (resultado.success) {
        // Actualizar los campos con la dirección normalizada
        direccionInput.value = resultado.direccion
        latitudInput.value = resultado.latitud
        longitudInput.value = resultado.longitud
        direccionNormalizada.textContent = `Dirección normalizada: ${resultado.direccion}`
        direccionNormalizada.classList.remove("hidden")
  
        // Inicializar el mapa si no existe
        if (!mapObj.map) {
          mapObj = initializeMap("map")
        }
  
        // Actualizar el mapa
        mapObj.marker = updateMapMarker(
          mapObj.map,
          mapObj.marker,
          resultado.latitud,
          resultado.longitud,
          resultado.direccion,
        )
      } else {
        // Mostrar mensaje de error
        direccionError.textContent = resultado.mensaje
        direccionError.classList.remove("hidden")
      }
    })
  
    // --- Manejo de fotos ---
    const fotosContainer = document.getElementById("fotosContainer")
    const addFotoBtn = document.getElementById("addFotoBtn")
  
    // Función para agregar una nueva foto
    addFotoBtn.addEventListener("click", () => {
      const newFotoItem = document.createElement("div")
      newFotoItem.className = "foto-item bg-gray-50 p-4 rounded-md mb-4 border border-gray-200"
      newFotoItem.innerHTML = `
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div class="md:col-span-2">
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                          URL de la imagen <span class="text-red-500">*</span>
                      </label>
                      <input type="text" name="fotos[${fotoCount}].url" required
                             class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                             placeholder="https://ejemplo.com/imagen.jpg">
                  </div>
                  <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                          Descripción
                      </label>
                      <input type="text" name="fotos[${fotoCount}].descripcion"
                             class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                             placeholder="Descripción de la imagen">
                  </div>
              </div>
              <div class="mt-2 flex justify-between items-center">
                  <div class="preview-container hidden">
                      <p class="text-xs text-gray-500 mb-1">Vista previa:</p>
                      <img src="/placeholder.svg" alt="Vista previa" class="image-preview h-20 object-cover rounded">
                  </div>
                  <button type="button" class="remove-foto text-red-600 hover:text-red-800">
                      <i class="fas fa-trash"></i> Eliminar
                  </button>
              </div>
          `
  
      fotosContainer.appendChild(newFotoItem)
      fotoCount++
  
      // Habilitar el botón de eliminar en la primera foto si hay más de una
      if (fotoCount > 1) {
        document.querySelector(".foto-item .remove-foto").removeAttribute("disabled")
      }
  
      // Agregar evento para eliminar esta foto
      newFotoItem.querySelector(".remove-foto").addEventListener("click", () => {
        newFotoItem.remove()
        fotoCount--
  
        // Si solo queda una foto, deshabilitar su botón de eliminar
        if (fotoCount === 1) {
          document.querySelector(".foto-item .remove-foto").setAttribute("disabled", "disabled")
        }
  
        // Renumerar los índices de las fotos restantes
        renumberFotos()
      })
  
      // Agregar vista previa de imagen
      setupImagePreview(newFotoItem.querySelector('input[name$=".url"]'))
    })
  
    // Configurar vista previa para la primera foto
    setupImagePreview(document.querySelector('input[name="fotos[0].url"]'))
  
    // Función para configurar la vista previa de imagen
    function setupImagePreview(urlInput) {
      urlInput.addEventListener("input", function () {
        const previewContainer = this.closest(".foto-item").querySelector(".preview-container")
        const imagePreview = previewContainer.querySelector(".image-preview")
  
        if (this.value) {
          imagePreview.src = this.value
          previewContainer.classList.remove("hidden")
  
          // Manejar errores de carga de imagen
          imagePreview.onerror = () => {
            previewContainer.classList.add("hidden")
          }
        } else {
          previewContainer.classList.add("hidden")
        }
      })
    }
  
    // Función para renumerar los índices de las fotos
    function renumberFotos() {
      const fotoItems = document.querySelectorAll(".foto-item")
      fotoItems.forEach((item, index) => {
        const urlInput = item.querySelector('input[name$=".url"]')
        const descInput = item.querySelector('input[name$=".descripcion"]')
  
        urlInput.name = `fotos[${index}].url`
        descInput.name = `fotos[${index}].descripcion`
      })
    }
  
    // --- Envío del formulario (mock) ---
    document.getElementById("noticiaForm").addEventListener("submit", (e) => {
      e.preventDefault()
  
      // Validaciones básicas
      if (quill.getText().trim().length === 0) {
        alert("El contenido de la noticia no puede estar vacío.")
        return
      }
  
      const fotoUrls = document.querySelectorAll('input[name$=".url"]')
      let hasValidPhoto = false
      for (const urlInput of fotoUrls) {
        if (urlInput.value.trim()) {
          hasValidPhoto = true
          break
        }
      }
  
      if (!hasValidPhoto) {
        alert("Debe agregar al menos una foto con URL válida.")
        return
      }
  
      // En el mock, simplemente mostramos un mensaje de éxito
      alert("Noticia creada con éxito (simulación).")
  
      // Redirigir a la lista de noticias
      window.location.href = "../../templates/inicio-admin.html"
    })
  })
  