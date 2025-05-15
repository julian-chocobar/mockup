function logout() {
    // Para el mock, simplemente eliminamos el usuario del localStorage
    localStorage.removeItem("mockUser")
    // Redirigir a la página de login
    window.location.href = "auth/login.html"
  }

  // Si usas un botón con id="logoutBtn":
  document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logoutBtn")
    if (logoutBtn) {
      logoutBtn.addEventListener("click", logout)
    }
  })
