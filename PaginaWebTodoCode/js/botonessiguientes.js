const pizzasContainer = document.querySelector('.imagesOfPizzas');
const pizzas = document.querySelectorAll('.pizza');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');

let currentIndex = 0;
const pizzasToShow = 4;
const totalPizzas = pizzas.length;
let autoScroll; // Variable para almacenar el intervalo automático
let inactivityTimeout; // Variable para el tiempo de inactividad

// Mostrar las primeras pizzas al cargar
function updateCarousel() {
    // Ocultar todas las pizzas
    pizzas.forEach(pizza => {
        pizza.classList.remove('show'); // Remover la clase 'show' para ocultar
    });

    // Mostrar las pizzas actuales
    for (let i = currentIndex; i < currentIndex + pizzasToShow; i++) {
        if (pizzas[i]) { // Solo mostrar si existe
            pizzas[i].classList.add('show'); // Agregar la clase 'show' para mostrar
        }
    }

    // Desactivar el botón de siguiente si se llegó al final
    nextButton.disabled = currentIndex >= totalPizzas - pizzasToShow;
    prevButton.disabled = currentIndex <= 0;
}

// Inicializar el carrusel
updateCarousel();

// Función para avanzar al siguiente conjunto de pizzas
function goToNext() {
    if (currentIndex < totalPizzas - pizzasToShow) {
        currentIndex++;
    } else {
        currentIndex = 0; // Volver al principio
    }
    updateCarousel();
    console.log(`Moving to next: ${currentIndex}`); // Mensaje de depuración
}

// Función para pausar el desplazamiento automático
function pauseAutoScroll() {
    clearInterval(autoScroll);
    clearTimeout(inactivityTimeout); // Limpiar el temporizador de inactividad
}

// Función para reiniciar el desplazamiento automático
function restartAutoScroll() {
    inactivityTimeout = setTimeout(() => {
        autoScroll = setInterval(goToNext, 4000); // Reiniciar el intervalo automático
    }, 2000); // Tiempo de inactividad antes de reiniciar (2 segundos)
}

// Agregar evento a los botones
nextButton.addEventListener('click', () => {
    pauseAutoScroll(); // Pausar el desplazamiento automático
    goToNext(); // Avanzar al siguiente conjunto de pizzas
    restartAutoScroll(); // Reiniciar el desplazamiento automático después de 5 segundos
});

prevButton.addEventListener('click', () => {
    pauseAutoScroll(); // Pausar el desplazamiento automático
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalPizzas - pizzasToShow; // Ir al final
    }
    updateCarousel();
    console.log(`Moving to previous: ${currentIndex}`); // Mensaje de depuración
    restartAutoScroll(); // Reiniciar el desplazamiento automático después de 5 segundos
});

// Configurar el desplazamiento automático cada 4 segundos
autoScroll = setInterval(goToNext, 4000);
