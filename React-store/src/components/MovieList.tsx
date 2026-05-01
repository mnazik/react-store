import MovieCard from "./MovieCard";

export default function MovieList({ movies }) {
    return (
        <div className="grid grid-cols-4 gap-6">
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    )
}