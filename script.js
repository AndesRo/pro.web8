class PaqueteTuristico {
  constructor(destino, fecha, tipo, precio, disponibilidad) {
    this.destino = destino;
    this.fecha = fecha;
    this.tipo = tipo;
    this.precio = precio;
    this.disponibilidad = disponibilidad;
  }

  getDetails() {
    return `
      <h3>${this.tipo === 'vuelo' ? 'Vuelo a' : 'Hotel en'} ${this.destino}</h3>
      <p>Fecha: ${this.fecha}</p>
      <p>Precio: ${this.precio}</p>
      <p>Disponibilidad: ${this.disponibilidad}</p>
    `;
  }

  static filterPackages(packages, destination, travelDate, typeSelector) {
    return packages.filter(pkg => {
      return (destination === '' || pkg.destino.toLowerCase().includes(destination.toLowerCase())) &&
             (travelDate === '' || pkg.fecha === travelDate) &&
             (typeSelector === 'all' || pkg.tipo === typeSelector);
    });
  }
}

const sampleData = [
  new PaqueteTuristico('Santiago', '2024-06-01', 'vuelo', '$150.000 CLP', 'Disponible'),
  new PaqueteTuristico('Buenos Aires', '2024-06-10', 'hotel', '$200.000 CLP', 'Disponible'),
  new PaqueteTuristico('Lima', '2024-06-20', 'vuelo', '$180.000 CLP', 'Disponible'),
  new PaqueteTuristico('Bogotá', '2024-06-25', 'hotel', '$220.000 CLP', 'No disponible'),
  new PaqueteTuristico('Santiago', '2024-07-03', 'vuelo', '$160.000 CLP', 'Disponible'),
  new PaqueteTuristico('Buenos Aires', '2024-07-12', 'hotel', '$190.000 CLP', 'Disponible'),
  new PaqueteTuristico('Lima', '2024-07-22', 'vuelo', '$175.000 CLP', 'Disponible'),
  new PaqueteTuristico('Bogotá', '2024-07-30', 'hotel', '$230.000 CLP', 'No disponible'),
  new PaqueteTuristico('Santiago', '2024-08-05', 'vuelo', '$155.000 CLP', 'Disponible'),
  new PaqueteTuristico('Buenos Aires', '2024-08-15', 'hotel', '$210.000 CLP', 'Disponible'),
  new PaqueteTuristico('Lima', '2024-08-25', 'vuelo', '$185.000 CLP', 'Disponible'),
  new PaqueteTuristico('Bogotá', '2024-08-28', 'hotel', '$240.000 CLP', 'No disponible'),
  new PaqueteTuristico('Santiago', '2024-09-02', 'vuelo', '$170.000 CLP', 'Disponible'),
  new PaqueteTuristico('Buenos Aires', '2024-09-13', 'hotel', '$220.000 CLP', 'Disponible'),
  new PaqueteTuristico('Lima', '2024-09-21', 'vuelo', '$190.000 CLP', 'Disponible'),
  new PaqueteTuristico('Bogotá', '2024-09-30', 'hotel', '$250.000 CLP', 'No disponible')
];

document.getElementById('search-button').addEventListener('click', search);
document.getElementById('sort-price').addEventListener('click', () => sortResults('price'));
document.getElementById('sort-availability').addEventListener('click', () => sortResults('availability'));

function search() {
  const destination = document.getElementById('destination').value;
  const travelDate = document.getElementById('travel-date').value;
  const typeSelector = document.getElementById('type-selector').value;
  const resultsContainer = document.getElementById('results-container');
  const noResults = document.getElementById('no-results');

  const filteredPackages = PaqueteTuristico.filterPackages(sampleData, destination, travelDate, typeSelector);

  resultsContainer.innerHTML = '';

  if (filteredPackages.length === 0) {
    noResults.style.display = 'block';
  } else {
    noResults.style.display = 'none';
    filteredPackages.forEach(pkg => {
      const resultItem = document.createElement('div');
      resultItem.classList.add('result-item');
      resultItem.innerHTML = pkg.getDetails();
      resultsContainer.appendChild(resultItem);
      setTimeout(() => {
        resultItem.classList.add('expand');
      }, 10); // Pequeña demora para asegurar la transición
    });
  }
}

function showNotification(message) {
  const notificationsContainer = document.getElementById('notifications-container');
  const notification = document.createElement('div');
  notification.classList.add('notification');
  notification.innerText = message;
  notificationsContainer.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('show'); // Agregar clase para mostrar notificación
  }, 10); // Pequeña demora para asegurar la transición

  setTimeout(() => {
    notification.classList.remove('show'); // Quitar clase para ocultar notificación
    setTimeout(() => {
      notificationsContainer.removeChild(notification);
    }, 1000); // Esperar a que la transición termine
  }, 5000); // Mostrar notificación durante 5 segundos
}

function sortResults(criteria) {
  const resultsContainer = document.getElementById('results-container');
  const resultItems = Array.from(resultsContainer.getElementsByClassName('result-item'));

  let sortedItems;
  if (criteria === 'price') {
    sortedItems = resultItems.sort((a, b) => {
      const priceA = parseInt(a.querySelector('p:nth-child(3)').innerText.replace('$', '').replace(/\./g, ''));
      const priceB = parseInt(b.querySelector('p:nth-child(3)').innerText.replace('$', '').replace(/\./g, ''));
      return priceA - priceB;
    });
  } else if (criteria === 'availability') {
    sortedItems = resultItems.sort((a, b) => {
      const availabilityA = a.querySelector('p:nth-child(4)').innerText;
      const availabilityB = b.querySelector('p:nth-child(4)').innerText;
      return availabilityA.localeCompare(availabilityB);
    });
  }

  resultsContainer.innerHTML = '';
  sortedItems.forEach(item => resultsContainer.appendChild(item));
}

// Función para generar notificaciones ficticias
function generateRandomNotification() {
  const messages = [
    '¡Oferta especial! Vuelo a Buenos Aires por $120.000 CLP.',
    '¡Descuento! Hotel en Lima por $180.000 CLP.',
    '¡Últimas plazas! Vuelo a Santiago por $140.000 CLP.',
    '¡Oferta de imperdible! Hotel en Bogotá por $210.000 CLP.',
    '¡Descuento especial vacaciones de invierno! vuelo la paz por 150.000 CLP.'
  ];
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  showNotification(randomMessage);
}

// Muestra una notificación al iniciar la página como ejemplo
document.addEventListener('DOMContentLoaded', () => {
  showNotification('Bienvenido a nuestra Agencia de Viajes!');
  // Genera notificaciones cada 10 segundos
  setInterval(generateRandomNotification, 10000);
});


