const formUsuario = document.getElementById("formUsuario");
const URL = "../data/jugadores.json";

let jugadores = [];


function obtenerJugadores() {
    const guardados = localStorage.getItem("jugadores");

    if (guardados) {

        jugadores = JSON.parse(guardados);

    } else {
        
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                jugadores = data;
                guardarJugadores();
            });
    }
}

obtenerJugadores();

function guardarJugadores() {
    localStorage.setItem("jugadores", JSON.stringify(jugadores));
}


formUsuario.addEventListener("submit", (e) => {
    e.preventDefault();

    const jugador = {
        id: Date.now(),
        categoria: document.getElementById("categoria").value,
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        edad: Number(document.getElementById("edad").value),
        contacto: document.getElementById("contacto").value,
        foto: document.getElementById("foto").value
    };

    const existe = jugadores.find(j =>
        j.nombre === jugador.nombre &&
        j.apellido === jugador.apellido
    );

    if (existe) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Este jugador ya existe!",
        });
        formUsuario.reset()
        return;
    }

    jugadores.push(jugador);

    guardarJugadores(); 

    formUsuario.reset();
    Swal.fire({
            icon: "success",
            title: "Jugador Creado",
        });
});

