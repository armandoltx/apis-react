export  const searchValidations = (search) => {
    console.log("here here here ", search)
    if (search === ' ') {
      return 'No se puede buscar una pelicula vacia'

    }

    if(search.match(/^\d+$/)) {
      return 'No se puede buscar una pelicula con un numero'

    }

    if(search.length < 3) {
      return "Labusqueda tiene que ser mayor de 3 caracteres"
    }
  }