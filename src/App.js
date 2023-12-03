import './App.css'

import {useEffect, useState} from "react";
import Search from "./components/Search";
import MovieCard from './components/MovieCard'
import GetMovies from './api/GetMovies'

const App = () => {
    const [movies, setMovies] = useState([])
    const [search, setSearch] = useState('Batman')
    const [moreBotton, setMoreBotton] = useState(false)
    const [pagination, setPagination] = useState(1)

    const searchMovies = async (title, page) => {
        const data = await GetMovies(title, page)
        const prevData = movies

        if(data.Response === "True") {
            if(page > 1) {
                setMovies([...prevData, ...data.Search])
            } else {
                setMovies(data.Search)
            }
            setMoreBotton(false)
            
            if(data.totalResults > 10) {
                setMoreBotton(true)
            }
        } else {
            setMovies(prevData)
        }
        
    }

    useEffect(() => {
        searchMovies(search, pagination)
    }, [search])

    return (
        <main className='app'>
            <h1>Movie App</h1>
            
            <Search 
                search={search} 
                onChange={(value) => setSearch(value)} 
            />

            {
                movies?.length > 0 ? (
                    <section className="container">
                        {
                            movies.map((movie, index) => (
                                <MovieCard key={index} movie={movie} />
                            ))
                        }
                    </section>
                ) : (
                    <section className='empty'>
                        <h2>No movies found, try this:</h2>
                        <ul>
                            <li>Check spelling</li>
                            <li>Type a movie title</li>
                            <li>Try another term</li>
                        </ul>
                    </section>
                )
            }

            <div>
                {
                    moreBotton ? <button id='more-btn' className='more-btn' onClick={() => {
                        searchMovies(search, pagination+1)
                    }}>
                        View More
                    </button> 
                    : <></>
                }
            </div>
            
        </main>
    )
}
export default App;