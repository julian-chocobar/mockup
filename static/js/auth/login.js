
// Añadir información de credenciales de prueba en la página
document.addEventListener("DOMContentLoaded", () => {
  const formularioInicioSesion = document.getElementById("loginForm")
  formularioInicioSesion.addEventListener("submit", async (event) => { //Lo espero a que carguen todos los componentes antes de ver si se presiona el botón
    event.preventDefault()

    const email = document.getElementById("username").value
    const password = document.getElementById("password").value

    // Para el mock, simplificamos y solo usamos credenciales del administrador
    if (email === "prueba@portal.com" && password === "prueba123") {
      console.log("Autenticación mock exitosa")

      // Guardar "estado" de login simulado con estructura similar a Cuenta
      const mockCuenta = {
        id: "mock-123",
        nombre: "Usuario de Prueba",
        dni: "12345678",
        email: email,
        fechaRegistro: new Date().toISOString(),
        rol: "ADMINISTRADOR",
      }

      localStorage.setItem("mockUser", JSON.stringify(mockCuenta))
      window.location.href = "../inicio-admin.html"
    } else {
      // Mostrar error
      const msg = document.getElementById("loginMessage")
      msg.classList.remove("hidden")
      msg.querySelector("#loginMessageText").textContent = "Correo o contraseña incorrectos"
    }
  })



  const infoDiv = document.createElement("div")
  infoDiv.className = "mt-6 text-center text-sm text-gray-600"
  infoDiv.innerHTML = `
    <p class="font-medium mb-1">Credenciales de prueba para el mock:</p>
    <p><strong>Administrador:</strong> prueba@portal.com / prueba123</p>
  `

  // Buscar el formulario y añadir la información después
  const loginForm = document.getElementById("loginForm")
  if (loginForm && loginForm.parentNode) {
    loginForm.parentNode.appendChild(infoDiv)
  }
})
