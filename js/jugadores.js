const contenedor = document.getElementById("contenedorJugadores");
const filtroCategoria = document.getElementById("filtroCategoria");

const URL = "../data/jugadores.json";

let jugadoresTotal = [];


function obtenerJugadores() {
    const guardados = localStorage.getItem("jugadores");

    if (guardados) {
        jugadoresTotal = JSON.parse(guardados);
        renderizar();
    } else {
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                jugadoresTotal = data;
                localStorage.setItem("jugadores", JSON.stringify(jugadoresTotal));
                renderizar();
            });
    }
}

obtenerJugadores();

function renderizar() {
    elegirCategoria(jugadoresTotal);
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


    const botonesEliminar = document.querySelectorAll(".btn-eliminar");

    botonesEliminar.forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;

            Swal.fire({
                title: "¿Estás seguro?",
                text: "No vas a poder revertir esto",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {

                    eliminarJugador(id);

                    Swal.fire({
                        title: "Eliminado",
                        text: "El jugador fue eliminado correctamente",
                        icon: "success"
                    });
                }
            });
        });
    });
}


function eleccion() {
    const categoria = filtroCategoria.value;

    let jugadores;

    if (categoria === "") {
        jugadores = jugadoresTotal;
    } else {
        jugadores = jugadoresTotal.filter(j => j.categoria === categoria);
    }

    return jugadores
}

function elegirCategoria(jugadoresArray) {
    filtroCategoria.addEventListener("change", () => {

        crearCards(eleccion());
    });
}


function eliminarJugador(id) {
    jugadoresTotal = jugadoresTotal.filter(j => j.id != id);

    localStorage.setItem("jugadores", JSON.stringify(jugadoresTotal));

    crearCards(eleccion());
}






// guardo lo comentado como ayudamemoria


//const STORAGE_KEY = "jugadores";

// localstorage
/* function obtenerJugadores() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function guardarJugadores(jugadores) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jugadores));
} */

/* esto iria en la line 39 para el btn de eliminar
<button 
    class="btn btn-danger btn-sm btn-eliminar"
    data-id="${jugador.id}">
    Eliminar
</button>  */

/* function eliminarJugadores(jugadoresArray){
    contenedor.addEventListener("click", (e) => {
        const botonEliminar = e.target.closest(".btn-eliminar");

        if (!botonEliminar) return;

        const id = Number(botonEliminar.dataset.id);

        let jugadores = jugadoresArray;

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
} */