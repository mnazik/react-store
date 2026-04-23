import { useEffect, useState } from 'react';
import { boardMovies, searchMovies } from '../services/api';
import { Link } from 'react-router-dom';
import { addToFavorites, getFavorites, removeFromFavorites } from '../services/favorites';

    export default function Home() {
        const [query, setQuery] = useState('');
        const [movies, setMovies] = useState([]);
        const [favorites , setFavorites] = useState(getFavorites())

        useEffect (() =>{
            boardMovies().then(data => {
                setMovies(data.titles);
            });
        }, []);

        const handleSearch = () => {
            searchMovies(query).then(data => {
                setMovies(data.titles);
            });
        };

        const handleFavorites = (id: string ) => {
            if (favorites.includes(id)) {
                removeFromFavorites(id);
                setFavorites(getFavorites());
            } else {
                addToFavorites(id);
                setFavorites(getFavorites()); 
            }
        }

        return (
            <div>
                <input
                    type='text'
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
                <div className='grid grid-cols-4 gap-2'>
                    {movies.map(movie => (
                        <div className='p-2'>
                            <img src={movie?.primaryImage?.url} alt='НАЗВАНИЕ' />
                            <Link to={`/movie/${movie.id}`}>
                                <h3>{movie.originalTitle}</h3>
                            </Link>
                            {favorites(). includes(movie.id) ? (
                                <button onClick={() => removeFromFavorites(movie.id)} className='p-3 bg-red-900 text-white'>Удфлить из избранное</button>
                            ) : (  
                                <button onClick={() => addToFavorites(movie.id)} className='p-3 bg-red-500 text-white'>Добавить в избранное</button>
                            )} 
                        </div>
                    ))}
                </div>
            </div>
        );
    }