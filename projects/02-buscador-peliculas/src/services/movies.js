const API_KEY = '73a23b78'
export const searchMovies = async ({ search }) => {
  // console.log(search)
  if(search === '') return null

  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
    if(!response.ok) throw new Error("Hubo un error...")
    const data = await response.json()
    // console.log("data")
    // console.log(data)
    const movies = data.Search

    const mappedMovies = movies?.map( movie => (
      {
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        image: movie.Poster
      }
    ))

    return mappedMovies
  } catch (error) {
    console.log(error)
  }
}