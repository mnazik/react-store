import { useEffect, useState } from "react"; import MoviesList from "../components/MoviesList";
import { useFavorites } from "../context/favorites-context";
import { getMoviesByIds } from "../services/api";



export default function Favorites() {
    const { favorites } = useFavorites ()
    const [movies, setMovies] = useState([])
    
    useEffect ( () => {
            getMoviesByIds (favorites). then (data => {
                setMovies(data);
            })
    }, [favorites])

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="mb-10 text-cinter">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Моё избранное</h1>
                <p className="text-slate-500">Ваша личная подборка фильмов. </p>
            </div>

            {favorites. length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                    <p className="text-slate-400 text-lg mb-4">Вы еще не добавили ни одного фильма в избранное.</p>
                    <a href="/" className="text-blue-600 font-semibold hover:underline">
                        Вернуться к поиску фильмов
                    </a>
                </div>
            ) : (
                <MoviesList movies={movies} />
            )}
        </div>
    );
}