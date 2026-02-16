const contenedor = document.getElementById("contenedorJugadores");
const filtroCategoria = document.getElementById("filtroCategoria");

const STORAGE_KEY = "jugadores";

// localstorage
function obtenerJugadores() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function guardarJugadores(jugadores) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jugadores));
}


function crearCards(jugadores) {
    contenedor.innerHTML = "";

    jugadores.forEach(jugador => {
        const col = document.createElement("div");
        col.className = "col-12 col-md-4 p-2";

        col.innerHTML = `
            <div class="card h-100">
                <img src="../assets/img/jugadores/${jugador.foto}" class="card-img-top">
                <div class="card-body">
                    <h5>${jugador.nombre} ${jugador.apellido}</h5>
                    <p>
                        Categoría: ${jugador.categoria}<br>
                        Edad: ${jugador.edad}<br>
                        Contacto: ${jugador.contacto}
                    </p>
                    <button 
                        class="btn btn-danger btn-sm btn-eliminar"
                        data-id="${jugador.id}">
                        Eliminar
                    </button>
                </div>
            </div>
        `;

        contenedor.appendChild(col);
    });
}


contenedor.addEventListener("click", (e) => {
    const botonEliminar = e.target.closest(".btn-eliminar");

    if (!botonEliminar) return;

    const id = Number(botonEliminar.dataset.id);

    let jugadores = obtenerJugadores();

    const jugador = jugadores.find(j => j.id === id);

    if (!jugador) return;

    const confirmar = confirm(
        `¿Eliminar a ${jugador.nombre} ${jugador.apellido}?`
    );

    if (!confirmar) return;

    jugadores = jugadores.filter(j => j.id !== id);

    guardarJugadores(jugadores);
    crearCards(jugadores);
});


filtroCategoria.addEventListener("change", () => {
    const categoria = filtroCategoria.value;
    let jugadores = obtenerJugadores();

    if (categoria !== "") {
        jugadores = jugadores.filter(j => j.categoria === categoria);
    }

    crearCards(jugadores);
});


crearCards(obtenerJugadores());
