const formUsuario = document.getElementById("formUsuario");

const STORAGE_KEY = "jugadores";

// Obtener jugadores del json
function obtenerJugadores() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// Guardar jugadores
function guardarJugadores(jugadores) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jugadores));
}

if (formUsuario) {
    formUsuario.addEventListener("submit", (e) => {
        e.preventDefault();

        let jugadores = obtenerJugadores();

        const jugador = {
            id: Date.now(),
            categoria: document.getElementById("categoria").value,
            nombre: document.getElementById("nombre").value,
            apellido: document.getElementById("apellido").value,
            edad: Number(document.getElementById("edad").value),
            contacto: document.getElementById("contacto").value,
            foto: document.getElementById("foto").value
        };

        //duplicados
        const existe = jugadores.find(j =>
            j.nombre === jugador.nombre &&
            j.apellido === jugador.apellido
        );

        if (existe) {
            alert("Ese jugador ya existe");
            return;
        }

        jugadores.push(jugador);

        guardarJugadores(jugadores);

        formUsuario.reset();
        alert("Jugador guardado correctamente");
    });
}
