// Arrays para almacenar los amigos y llevar registro de sorteados
let amigos = [];
let amigosSorteados = [];

/**
 * Agrega un nuevo amigo al array de amigos.
 * Valida que el nombre no esté vacío y que sea un nombre válido antes de agregarlo.
 * Actualiza la lista visual si el nombre es válido.
 */
function agregarAmigo() {
    try {
        let nombreAmigo = document.getElementById("amigo").value.trim();

        // Validar si está vacío
        if (nombreAmigo === "") {
            throw new Error("Por favor, inserte un nombre válido");
        }

        // Validar que sea un nombre (solo letras y espacios)
        if (!/^[a-zA-Z\s]+$/.test(nombreAmigo)) {
            throw new Error("Por favor, inserte solo letras en el nombre");
        }

        // Si pasa las validaciones, agregar a la lista
        amigos.push(nombreAmigo);
        document.querySelector("#amigo").value = "";
        mostrarListaAmigo();

    } catch (error) {
        // Mostrar el mensaje de error
        alert(error.message);
    }
}

/**
 * Actualiza la visualización de la lista de amigos en el DOM, creando elementos <li> para cada amigo.
 */
function mostrarListaAmigo() {
    let listaAmigos = document.querySelector("#listaAmigos");
    listaAmigos.innerHTML = "";
    for (let index = 0; index < amigos.length; index++) {
        const element = amigos[index];
        let listaHTML = document.createElement("li");
        listaHTML.textContent = element;
        listaAmigos.appendChild(listaHTML);
    }
}

/**
 * Sortea y muestra un amigo de la lista de amigos de manera aleatoria.
 * Verifica que la lista no esté vacía antes de realizar el sorteo.
 * Controla que no se repitan amigos sorteados hasta que todos hayan sido sorteados.
 */
function sortearAmigo() {
    let cantidadAmigos = amigos.length;
    if (cantidadAmigos === 0) {
        alert("Por favor, inserte un nombre antes de sortear");
        return;
    }

    // Verificar si ya se sortearon todos los amigos
    if (amigosSorteados.length >= cantidadAmigos) {
        let resultadoHTML = document.querySelector("#resultado");
        resultadoHTML.innerHTML = 'Ya se sortearon todos los amigos disponibles';
        return;
    }

    // Obtener un amigo que no haya sido sorteado previamente
    let amigoSorteado = generarAmigoSecreto();

    // Mostrar el resultado
    let resultadoHTML = document.querySelector("#resultado");
    resultadoHTML.innerHTML = `El amigo secreto es: ${amigoSorteado}`;

    // Habilitar el botón de reiniciar después de sortear
    document.querySelector('#reiniciar').removeAttribute('disabled');
}

/**
 * Genera un amigo secreto que no haya sido sorteado previamente.
 * Usa recursividad para evitar repeticiones hasta que todos sean sorteados.
 */
function generarAmigoSecreto() {
    let indiceAmigo = Math.floor(Math.random() * amigos.length);
    let amigoGenerado = amigos[indiceAmigo];

    // Si ya se sortearon todos los amigos
    if (amigosSorteados.length == amigos.length) {
        return;
    } else {
        // Si el amigo ya fue sorteado anteriormente
        if (amigosSorteados.includes(amigoGenerado)) {
            // Recursividad: generar otro amigo
            return generarAmigoSecreto();
        } else {
            // Registrar este amigo como sorteado
            amigosSorteados.push(amigoGenerado);
            return amigoGenerado;
        }
    }
}

/**
 * Reinicia el sorteo, vaciando la lista de amigos sorteados pero manteniendo la lista original.
 * También limpia el resultado y actualiza la lista visual.
 */
function reiniciarSorteo() {
    // Vaciar la lista de amigos sorteados y la lista de amigos
    amigosSorteados = [];
    amigos = [];

    // Limpiar el resultado
    document.querySelector('#resultado').innerHTML = '';

    // Actualizar la lista visual para que se borre
    mostrarListaAmigo();

    // Deshabilitar el botón de reiniciar
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');

    // Enfocar el campo de entrada
    document.querySelector('#amigo').focus();
}

/**
 * Inicializa la aplicación configurando el estado inicial
 */
function condicionesIniciales() {
    // Asignar textos iniciales
    document.querySelector('h1').innerHTML = 'Amigo Secreto';
    document.querySelector('h2').innerHTML = 'Digite el nombre de sus amigos';

    // Deshabilitar el botón de reiniciar al inicio
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

// Llamar a las condiciones iniciales al cargar la página
condicionesIniciales();