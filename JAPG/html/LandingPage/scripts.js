// Función para abrir el modal
function openModal() {
    document.getElementById("modal").style.display = "flex";
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// Función para cambiar entre las pestañas de Iniciar Sesión y Registrarse
function openTab(tabName) {
    var i;
    var tabcontent = document.getElementsByClassName("tab-content");
    var tabbuttons = document.getElementsByClassName("tab-button");

    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].className = tabcontent[i].className.replace(" active", "");
    }

    for (i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].className = tabbuttons[i].className.replace(" active", "");
    }

    document.getElementById(tabName).className += " active";
    event.currentTarget.className += " active";
}
