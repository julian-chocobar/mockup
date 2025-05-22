// --- Configuración ---
import { mockNoticiasUbicacion } from "./noticias_mock.js";

document.addEventListener('DOMContentLoaded', function () {
  const noticiasList = document.getElementById("noticias-list")
  const filtroForm = document.getElementById("filtro-form")
  const tituloInput = document.getElementById("titulo")
  const temaSelect = document.getElementById("tema")
  const paginationNav = document.getElementById("pagination")
  const noNoticiasDiv = document.getElementById("no-noticias")

  let paginaActual = 0
  const size = 10

  // Importar funciones comunes
  const {TEMAS, cargarTemasEnSelect, initAutenticacion } = window.NoticiasCommon

  // Cargar temas usando la función común
  async function cargarTemas() {
    try {
      cargarTemasEnSelect(temaSelect, true)
    } catch (error) {
      console.error("Error al cargar temas:", error)
    }
  }

  // Fetch y renderizado de noticias
  async function cargarNoticias(page = 0) {
    try {
      const titulo = tituloInput.value
      const tema = temaSelect.value

      // Filtrar noticias según los criterios
      let noticias = mockNoticiasUbicacion
      if (titulo) {
        noticias = noticias.filter((n) => n.titulo.toLowerCase().includes(titulo.toLowerCase()))
      }
      if (tema) {
        noticias = noticias.filter((n) => n.tema === tema)
      }

      const mockData = {
        content: noticias,
        totalPages: 1,
        totalElements: noticias.length,
        size: size,
        number: page,
        first: page === 0,
        last: true,
        empty: noticias.length === 0,
      }

      if (mockData.content.length === 0) {
        noticiasList.innerHTML = ""
        noNoticiasDiv.classList.remove("hidden")
        paginationNav.innerHTML = ""
      } else {
        noNoticiasDiv?.classList.add("hidden")
        renderNoticias(mockData.content)
        renderPaginacion(mockData)
      }
    } catch (error) {
      noticiasList.innerHTML = ""
      noNoticiasDiv.classList.remove("hidden")
      paginationNav.innerHTML = ""
    }
  }

  function renderNoticias(noticias) {
    noticiasList.innerHTML = ""
    // Verificar si estamos en la vista de administrador
    const isAdminView = window.location.pathname.includes('inicio-admin.html')

    noticias.forEach((noticia) => {
      const div = document.createElement("div")
      div.className =
        "bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"

      div.innerHTML = `
      <div class="h-48 bg-gray-200 relative">
        ${noticia.fotos && noticia.fotos.length > 0
          ? `<img src="${noticia.fotos[0].url}" class="w-full h-full object-cover" alt="${noticia.fotos[0].descripcion || ""}">`
          : `<div class="w-full h-full flex items-center justify-center bg-gray-300">
            <i class="fas fa-newspaper text-4xl text-gray-500"></i>
          </div>`
        }
      </div>
      <div class="p-5">
        <div class="flex justify-between items-center mb-3">
          <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">${noticia.tema}</span>
          <span class="text-sm text-gray-500">${noticia.fechaPublicacion}</span>
        </div>
        <h3 class="text-xl font-bold text-gray-800 mb-2 line-clamp-2">${noticia.titulo}</h3>
        <p class="text-gray-600 mb-4 line-clamp-3">${noticia.descripcion}</p>
        <div class="flex justify-between items-center">
          <a href="./templates/noticias/ver-${noticia.id}.html" class="text-blue-600 hover:text-blue-800 font-medium">
            Leer más <i class="fas fa-arrow-right ml-1"></i>
          </a>
          ${isAdminView ? `
          <button class="text-red-600 hover:text-red-800 eliminar-btn" data-id="${noticia.id}">
            <i class="fas fa-trash"></i>
          </button>
          ` : ''}
        </div>
      </div>
    `
      noticiasList.appendChild(div)
    })

    // Agregar eventos a los botones de eliminar solo en la vista de administrador
    if (isAdminView) {
      document.querySelectorAll(".eliminar-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const id = this.getAttribute("data-id")
          if (confirm(`¿Está seguro que desea eliminar la noticia #${id}?`)) {
            alert("Noticia eliminada (simulación)")
            cargarNoticias(paginaActual)
          }
        })
      })
    }
  }

  function renderPaginacion(data) {
    paginationNav.innerHTML = ""
    if (data.totalPages <= 1) return

    // Botón anterior
    const prev = document.createElement("a")
    prev.className = `relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 rounded-l-md ${data.first ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"}`
    prev.innerHTML = '<i class="fas fa-chevron-left"></i>'
    prev.href = "#"
    prev.onclick = (e) => {
      e.preventDefault()
      if (!data.first) {
        paginaActual--
        cargarNoticias(paginaActual)
      }
    }
    paginationNav.appendChild(prev)

    // Números de página (máx 5)
    for (let i = 0; i < Math.min(data.totalPages, 5); i++) {
      const pageBtn = document.createElement("a")
      pageBtn.className = `relative inline-flex items-center px-4 py-2 border text-sm font-medium ${data.number === i ? "bg-blue-50 border-blue-500 text-blue-600 z-10" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"}`
      pageBtn.textContent = i + 1
      pageBtn.href = "#"
      pageBtn.onclick = (e) => {
        e.preventDefault()
        paginaActual = i
        cargarNoticias(paginaActual)
      }
      paginationNav.appendChild(pageBtn)
    }

    // Botón siguiente
    const next = document.createElement("a")
    next.className = `relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 rounded-r-md ${data.last ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"}`
    next.innerHTML = '<i class="fas fa-chevron-right"></i>'
    next.href = "#"
    next.onclick = (e) => {
      e.preventDefault()
      if (!data.last) {
        paginaActual++
        cargarNoticias(paginaActual)
      }
    }
    paginationNav.appendChild(next)
  }

  // Filtros
  filtroForm.onsubmit = (e) => {
    e.preventDefault()
    paginaActual = 0
    cargarNoticias(paginaActual)
  }

  // Inicializar
  initAutenticacion()
  cargarTemas()
  cargarNoticias()
})