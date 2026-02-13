// Elementos del DOM
const inputTexto = document.getElementById('name');
const tbody = document.getElementById('vocalBody');
const emptyState = document.getElementById('emptyState');

// PROMESA
function verificarVocal(a) {
    return new Promise((resolve, reject) => {
        if (!a || typeof a !== 'string') {
            reject('Entrada inválida');
            return;
        }

        // Obtener último carácter
        const ultimoCaracter = a.trim().slice(-1).toLowerCase();

        const vocales = ['a', 'e', 'i', 'o', 'u'];

        if (vocales.includes(ultimoCaracter)) {
            resolve(ultimoCaracter);
        } else {
            reject('El carácter no es una vocal');
        }
    });
}

// Mostrar cuando la promesa se resuelve
function mostrarResultado(vo) {
    if (tbody) {
        tbody.insertAdjacentHTML('beforeend', `
            <tr>
                <td class="text-success fw-bold text-uppercase">${vo}</td>
            </tr>
        `);
    }
    if (emptyState) emptyState.classList.add('d-none');
    if (inputTexto) {
        inputTexto.value = '';
        inputTexto.focus();
    }
}

// Mostrar cuando la promesa falla
function mostrarError(mensaje) {
    if (emptyState) {
        emptyState.classList.remove('d-none');
        emptyState.innerHTML = `
            <p class="text-danger fw-bold mb-0">error ${mensaje}</p>
        `;
    }
}

// Función del botón
function addData() {
    const texto = inputTexto.value.trim();
    if (emptyState) emptyState.classList.add('d-none');

    // Limpiar tabla de vocales anterior antes de insertar la nueva
    if (tbody) tbody.innerHTML = '';

    verificarVocal(texto)
        .then(vo => {
            mostrarResultado(vo);
        })
        .catch(error => {
            mostrarError(error);
        });
}


// Event listener para Enter en el input
const input = document.getElementById('name');
if (input) {
    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            addData();
        }
    });
}

