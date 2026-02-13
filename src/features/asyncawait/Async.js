async function obtenerDoble(numero) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(numero * 2);
        }, 2000);
      });
    }

    async function calcularDoble() {
      const numero = document.getElementById("numero").value;
      document.getElementById("resultado").innerText = "Calculando... por favor espera.";

      const resultado = await obtenerDoble(Number(numero));
      document.getElementById("resultado").innerText = "El doble es: " + resultado;
    }

    // Event listener para numero - ejecutar calcularDoble() al presionar Enter
    document.addEventListener('DOMContentLoaded', function() {
      const numero = document.getElementById('numero');
      if (numero) {
        numero.addEventListener('keypress', function(event) {
          if (event.key === 'Enter') {
            event.preventDefault();
            calcularDoble();
          }
        });
      }
    });