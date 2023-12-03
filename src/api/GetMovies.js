const API_URL = 'http://www.omdbapi.com/?apikey=bf694ab8'


const GetMovies = async (search, page) => {
    const response = await fetch(`${API_URL}&s=${search}&page=${page}`)
    const data = await response.json()
    return data
}

export default GetMovies;