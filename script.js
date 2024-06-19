// Clase PaqueteTuristico para representar un paquete turístico
class PaqueteTuristico {
    constructor(type, destination, date, price, availability) {
      this.type = type;
      this.destination = destination;
      this.date = date;
      this.price = price;
      this.availability = availability;
    }
  
    // Método para obtener los detalles del paquete en formato HTML
    getDetails() {
      return `
        <h3>${this.type === 'vuelo' ? 'Vuelo' : 'Hotel'} a ${this.destination}</h3>
        <p>Fecha: ${this.date}</p>
        <p>Precio: $${this.price.toLocaleString('es-CL')} CLP</p>
        <p>Disponibilidad: ${this.availability}</p>
      `;
    }
  
    // Método para verificar si el paquete está disponible
    isAvailable() {
      return this.availability === 'Disponible';
    }
  
    // Método para filtrar paquetes por destino y fecha
    static filterPackages(packages, destination, date, type) {
      return packages.filter(pkg =>
        pkg.destination.toLowerCase().includes(destination.toLowerCase()) &&
        pkg.date === date &&
        (type === 'all' || pkg.type === type)
      );
    }
  }
  
  // Datos simulados para los paquetes turísticos 
  const sampleData = [
    new PaqueteTuristico('vuelo', 'Buenos Aires', '2023-07-10', 500000, 'Disponible'),
    new PaqueteTuristico('hotel', 'Buenos Aires', '2023-07-10', 150000, 'Disponible'),
    new PaqueteTuristico('vuelo', 'Ciudad de México', '2023-07-15', 600000, 'Disponible'),
    new PaqueteTuristico('hotel', 'Ciudad de México', '2023-07-15', 200000, 'Disponible'),
    new PaqueteTuristico('vuelo', 'Lima', '2023-08-01', 550000, 'No Disponible'),
    new PaqueteTuristico('hotel', 'Lima', '2023-08-01', 180000, 'No Disponible'),
    new PaqueteTuristico('vuelo', 'Santiago', '2023-07-20', 300000, 'Disponible'),
    new PaqueteTuristico('hotel', 'Santiago', '2023-07-20', 100000, 'Disponible'),
    new PaqueteTuristico('vuelo', 'Bogotá', '2023-07-25', 350000, 'Disponible'),
    new PaqueteTuristico('hotel', 'Bogotá', '2023-07-25', 120000, 'Disponible')
  ];
  
  // Esperar a que el contenido del DOM esté cargado
  document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', search);
  
    // Simular notificaciones en tiempo real
    setInterval(() => {
      const specialOffers = [
        '¡Oferta especial! Vuelo a Buenos Aires por $300.000 CLP',
        '¡Descuento del 20% en hoteles en Ciudad de México!',
        '¡Nuevos paquetes turísticos disponibles para Lima!'
      ];
      const randomOffer = specialOffers[Math.floor(Math.random() * specialOffers.length)];
      showNotification(randomOffer);
    }, 10000); // Mostrar notificación cada 10 segundos
  
    // Simular actualizaciones en tiempo real de disponibilidad
    setInterval(() => {
      const randomPackageIndex = Math.floor(Math.random() * sampleData.length);
      const randomPackage = sampleData[randomPackageIndex];
      randomPackage.availability = randomPackage.availability === 'Disponible' ? 'No Disponible' : 'Disponible';
      const updateMessage = `Actualización: El ${randomPackage.type === 'vuelo' ? 'vuelo' : 'hotel'} a ${randomPackage.destination} ahora está ${randomPackage.availability}`;
      showNotification(updateMessage);
    }, 15000); // Actualizar disponibilidad cada 15 segundos
  });
  
  // Función para realizar la búsqueda
  function search() {
    const destination = document.getElementById('destination').value;
    const travelDate = document.getElementById('travel-date').value;
    const typeSelector = document.getElementById('type-selector').value;
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';
  
    // Filtrar paquetes turísticos
    const results = PaqueteTuristico.filterPackages(sampleData, destination, travelDate, typeSelector);
  
    // Mostrar resultados o mensaje de no encontrado
    if (results.length > 0) {
      results.forEach(pkg => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        resultItem.innerHTML = pkg.getDetails();
        resultsContainer.appendChild(resultItem);
      });
    } else {
      resultsContainer.innerHTML = '<p>No se encontraron resultados</p>';
    }
  }
  
  // Función para mostrar notificaciones
  function showNotification(message) {
    const notificationsContainer = document.getElementById('notifications-container');
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.innerText = message;
    notificationsContainer.appendChild(notification);
    notificationsContainer.style.display = 'block';
  
    // Eliminar notificación después de 5 segundos
    setTimeout(() => {
      notificationsContainer.removeChild(notification);
      if (notificationsContainer.children.length === 0) {
        notificationsContainer.style.display = 'none';
      }
    }, 5000);
  }
  