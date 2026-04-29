import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import { useFavorites } from "../context/favorites-context";
import { getMoviesByIds } from "../services/api";


export default function Favorites() {
    const { favorites } = useFavorites();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getMoviesByIds(favorites).then(data => {
            setMovies(data);
        });
    }, [favorites]);

    return (
        <div>
            <h1>Избранные фильмы</h1>
            <MovieList movies={movies} />
        </div>
    );
}