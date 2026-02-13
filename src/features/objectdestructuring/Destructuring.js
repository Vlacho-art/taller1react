const person = {
            name: 'Juan Carlos Valencia',
            age: 30,
            city: 'Cali',
            profession: 'Desarrollador'
        };

        function mostrarPersona() {
            const { name, age, profession } = person;

            document.getElementById("nombre").innerText = "Nombre: " + name;
            document.getElementById("edad").innerText = "Edad: " + age;
            document.getElementById("profesion").innerText = "Profesión: " + profession;
        }