// Bases de datos
const MySql1 = ['Canada', 'EUA', 'Mexico', 'Ecuador', 'Brazil', 'Argentina', 'Uruguay'];
const MySql2 = ['Japón', 'Irán', 'Corea del Sur', 'Alemania', 'Croacia', 'España', 'Inglaterra','Peru'];

// Elementos del DOM
const input = document.getElementById('name');
const tbody = document.querySelector('tbody');
const emptyState = document.getElementById('emptyState');

// Event listener para Enter en el input
input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addData();
    }
});

// Callback cuando el país es encontrado
function encontrado(a) {
    tbody.innerHTML = `
        <tr>
            <td class="text-success fw-bold">${a}</td>
        </tr>
    `;
    emptyState.classList.add('d-none');
}

// Callback para búsqueda en MySql2
function Sql2(a, Encontrado) {
    const aLower = a.toLowerCase();
    const found = MySql2.find(pais => pais.toLowerCase() === aLower);
    if (found) {
        Encontrado(found);
    } else {
        NoEncontrado();
    }
}

// Función principal con callbacks
function Sql1(a, Encontrado, Busqueda2) {
    const aLower = a.toLowerCase();
    const found = MySql1.find(pais => pais.toLowerCase() === aLower);
    if (found) {
        Encontrado(found);
    } else {
        Busqueda2(a, Encontrado);
    }
}

// Mostrar mensaje cuando no se encuentra
function NoEncontrado() {
    tbody.innerHTML = '';
    emptyState.classList.remove('d-none');
    emptyState.innerHTML = `
        <p class="text-danger fw-bold mb-0">
            Dato no encontrado
        </p>
    `;
}

// Función que se ejecuta al hacer clic en Buscar
function addData() {
    const a = input.value.trim();

    if (a === '') {
        alert('Por favor ingrese un país');
        return;
    }

    // Limpiar tabla antes de buscar
    tbody.innerHTML = '';

    Sql1(
        a,
        encontrado,
        Sql2
    );
}