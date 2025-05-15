// --- Configuración ---
const noticiasList = document.getElementById("noticias-list")
const filtroForm = document.getElementById("filtro-form")
const tituloInput = document.getElementById("titulo")
const temaSelect = document.getElementById("tema")
const paginationNav = document.getElementById("pagination")
const noNoticiasDiv = document.getElementById("no-noticias")

let paginaActual = 0
const size = 10

// Importar funciones comunes
const { TEMAS, cargarTemasEnSelect, initAutenticacion } = window.NoticiasCommon

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

    // Simulación de datos para el mockup
    const mockNoticias = [
      {
        id: 1,
        titulo: "Avances en inteligencia artificial",
        descripcion:
          "Un equipo de investigadores ha desarrollado un sistema de IA capaz de resolver problemas complejos con un rendimiento similar al de expertos humanos, marcando un hito en el campo de la inteligencia artificial.",
        tema: "TECNOLOGIA",
        fechaPublicacion: "15/05/2023",
        fotos: [
          {
            url: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?q=80&w=1992&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            descripcion: "Inteligencia artificial",
          },
        ],
      },
      {
        id: 2,
        titulo: "Crisis en el mercado financiero",
        descripcion:
          "Los mercados bursátiles registran fuertes caídas tras el aumento de tasas de interés y señales de desaceleración económica, generando incertidumbre entre inversionistas.",
        tema: "ECONOMIA",
        fechaPublicacion: "14/05/2023",
        fotos: [
          {
            url: "https://images.unsplash.com/photo-1621629057099-c7cf1fb8ca1e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            descripcion: "Mercado financiero",
          },
        ],
      },
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
      },
      {
        id: 5,
        titulo: "Campaña de vacunación gratuita",
        descripcion:
          "El Ministerio de Salud local anunció la disponibilidad de dosis contra influenza, COVID-19 y neumococo en todos los centros públicos con horarios extendidos hasta agosto.",
        tema: "SALUD",
        fechaPublicacion: "13/05/2023",
        fotos: [
          {
            url: "https://images.unsplash.com/photo-1578307985320-34b61a66c195?q=80&w=2078&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            descripcion: "Campaña de vacunación",
          },
        ],
      },
    ]

    // Filtrar noticias según los criterios
    let noticias = mockNoticias
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
    console.error("Error al cargar noticias:", error)
    noticiasList.innerHTML =
      '<div class="col-span-full text-center p-8 bg-red-50 text-red-600 rounded-lg">Error al cargar noticias. Intente nuevamente más tarde.</div>'
  }
}

function renderNoticias(noticias) {
  noticiasList.innerHTML = ""
  noticias.forEach((noticia) => {
    const div = document.createElement("div")
    div.className =
      "bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"

    // Obtener el usuario actual del localStorage
    let usuarioActual = null
    const mockUserJson = localStorage.getItem("mockUser")
    if (mockUserJson) {
      try {
        usuarioActual = JSON.parse(mockUserJson)
      } catch (e) {
        console.error("Error al parsear usuario mock:", e)
      }
    }

    div.innerHTML = `
      <div class="h-48 bg-gray-200 relative">
        ${
          noticia.fotos && noticia.fotos.length > 0
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
          <a href="ver-${noticia.id}.html" class="text-blue-600 hover:text-blue-800 font-medium">
            Leer más <i class="fas fa-arrow-right ml-1"></i>
          </a>
          <!-- Si es admin, mostrar botón eliminar -->
          <button class="text-red-600 hover:text-red-800 eliminar-btn" data-id="${noticia.id}" ${usuarioActual?.rol === "ADMINISTRADOR" ? "" : 'style="display:none"'}>
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `
    noticiasList.appendChild(div)
  })

  // Agregar eventos a los botones de eliminar
  document.querySelectorAll(".eliminar-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = this.getAttribute("data-id")
      if (confirm(`¿Está seguro que desea eliminar la noticia #${id}?`)) {
        alert("Noticia eliminada (simulación)")
        // En un mock, simplemente recargamos la página
        cargarNoticias(paginaActual)
      }
    })
  })
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
  // ... y última página si hay más de 5
  if (data.totalPages > 5) {
    const dots = document.createElement("span")
    dots.className =
      "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
    dots.textContent = "..."
    paginationNav.appendChild(dots)
    const lastBtn = document.createElement("a")
    lastBtn.className = `relative inline-flex items-center px-4 py-2 border text-sm font-medium ${data.number === data.totalPages - 1 ? "bg-blue-50 border-blue-500 text-blue-600 z-10" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"}`
    lastBtn.textContent = data.totalPages
    lastBtn.href = "#"
    lastBtn.onclick = (e) => {
      e.preventDefault()
      paginaActual = data.totalPages - 1
      cargarNoticias(paginaActual)
    }
    paginationNav.appendChild(lastBtn)
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
document.addEventListener("DOMContentLoaded", () => {
  initAutenticacion()
  cargarTemas()
  cargarNoticias()
})
