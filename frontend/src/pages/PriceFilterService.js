// PriceFilterService.js

class PriceFilterService {
    // Este método estático es utilizado para filtrar los inmuebles por precio
    static filterByPrice(allInmuebles, minPrice, maxPrice) {
      return allInmuebles.filter(inmueble => {
        return inmueble.precio >= minPrice && inmueble.precio <= maxPrice;
      });
    }
  
    // Este método estático se encarga de actualizar los filtros de precio
    static updatePriceFilters(event, allInmuebles, setState) {
      const minPrice = parseInt(event.detail.minPrice, 10) || 0;
      const maxPrice = parseInt(event.detail.maxPrice, 10) || Infinity;
  
      // Filtra los inmuebles utilizando el rango de precios proporcionado
      const nuevosInmueblesFiltrados = this.filterByPrice(allInmuebles, minPrice, maxPrice);
  
      // Actualiza el estado en el componente HomePage
      setState({
        inmueble: nuevosInmueblesFiltrados,
        minPrice: minPrice,
        maxPrice: maxPrice,
      });
    }
    static filterByRoomsBedsBaths(allInmuebles, rooms, beds, baths) {
        return allInmuebles.filter(inmueble => {
          return (rooms === 'Cualquiera' || inmueble.habitaciones === parseInt(rooms, 10)) &&
                 (beds === 'Cualquiera' || inmueble.camas === parseInt(beds, 10)) &&
                 (baths === 'Cualquiera' || inmueble.baños === parseInt(baths, 10));
        });
      }
  }
  
  // Exportamos la clase para poder importarla en otros archivos
  export default PriceFilterService;