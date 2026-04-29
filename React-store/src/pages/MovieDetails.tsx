import { useEffect, useState } from "react"; 
import { useParams, useNavigate } from "react-router-dom"; 
import { getMovieById } from "../services/api";
import { useFavorites } from "../context/favorites-context";

export default function MovieDetails () {
    const { id } = useParams () ;
    const navigate = useNavigate();
    const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect (() => {
        setIsLoading(true);
        if (id) {   
            getMovieById(id).then(data = {
                setMovie(data);
                setIsLoading(false);
            });
        }
    }, [id]);

    const favorite = movie ? isFavorite(movie.id) : false;

    const handleFavoriteToggle = () => {
        if (!movie) return;
        if (favorite) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites (movie);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!movie) {
        return <div className="text-center py-20 text-slate-500">Movie not found.</div>;
    }   

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <button
                onClick={() => navigate(-1)}
                className="mb-8 flex items-center text-slate-600 hover: text-slate-900 transition-colors font-medium"
            >
                &larr; Назад к фильмам
            </button>

            <div className="grid md:grid-cols-2 gap-10 bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                <div className="aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl">
                    {movie?.primaryImage?.url ? (
                        <img src={movie-primaryImage.url} alt={movie-primaryTitle} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">Нет изображения</div>
                    )}
                </div>

                <div className="flex flex-col">
                    <h1 className="text-4xl font-black text-slate-900 mb-4 leading-tight">
                        (movie.primaryTitle)
                    </h1>

                    <div className="flex items-center gap-4 mb-6">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
                            {movie.startYear || "Год неизвестен"}
                        </span>
                        <span className="text-slate-400">|</span>
                        <span className="text-slate-600 font-medium">
                            Рейтинг: {movie.rating?.aggregateRating || '-'}/10
                        </span>
                    </div>

                    <p className="text-lg text-slate-600 leading-relaxed mb-8">
                        {movie.plot || "Описание к этому фильму пока отсутствует."}
                    </p>

                    <div className="mt-auto">
                        <button
                            onClick={handleFavoriteToggle}
                            className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all active:scale-95 shadow-lg $
                            {favorite
                                ?'bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100'
                                :'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200'
                            }`}
                        >
                            {favorite ? 'Удалить из избранного' : 'Добавить в избранное'} 
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}