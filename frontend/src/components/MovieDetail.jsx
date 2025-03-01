import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../services/api';
import { useMovieContext } from "../contexts/MovieContext";

function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();

    useEffect(() => {
        // Fetch movie details using the API service
        getMovieDetails(id)
            .then(data => setMovie(data))
            .catch(error => console.error('Error fetching movie details:', error));
    }, [id]);

    const favorite = movie ? isFavorite(movie.id) : false;

    function onFavoriteClick(e) {
        e.preventDefault();
        if (favorite) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites(movie);
        }
    }

    if (!movie) return (
        <div className="min-h-screen flex items-center justify-center bg-[#242424]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#e50914]"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#242424] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto bg-[#1a1a1a] rounded-lg shadow-xl overflow-hidden">
                <div className="md:flex">
                    {/* Movie Poster with Favorite Button */}
                    <div className="md:w-1/3 relative">
                        <img 
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                            alt={movie.title}
                            className="w-full h-auto object-cover"
                        />
                        <button 
                            className={`absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all ${
                                favorite ? 'text-[#e50914]' : 'text-white'
                            }`}
                            onClick={onFavoriteClick}
                        >
                            <span className="text-2xl">♥</span>
                        </button>
                    </div>

                    {/* Movie Details */}
                    <div className="p-8 md:w-2/3">
                        <div className="flex justify-between items-start mb-4">
                            <h1 className="text-3xl font-bold text-white">{movie.title}</h1>
                            <button 
                                className={`md:hidden w-12 h-12 flex items-center justify-center rounded-full bg-[#333] ${
                                    favorite ? 'text-[#e50914]' : 'text-white'
                                }`}
                                onClick={onFavoriteClick}
                            >
                                <span className="text-2xl">♥</span>
                            </button>
                        </div>
                        
                        <div className="flex items-center mb-4 flex-wrap gap-2">
                            <span className="bg-[#e50914] text-white px-3 py-1 rounded-full text-sm">
                                {movie.release_date?.split('-')[0]}
                            </span>
                            <span className="text-gray-500">•</span>
                            <span className="flex items-center">
                                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                                <span className="ml-1 text-white">{movie.vote_average?.toFixed(1)}/10</span>
                            </span>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-300">{movie.runtime} min</span>
                        </div>

                        <p className="text-gray-300 mb-6 leading-relaxed">{movie.overview}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <h2 className="text-sm font-semibold text-gray-400 mb-2">Genres</h2>
                                <div className="flex flex-wrap gap-2">
                                    {movie.genres?.map(genre => (
                                        <span 
                                            key={genre.id}
                                            className="bg-[#333] text-white px-3 py-1 rounded-full text-sm"
                                        >
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold text-gray-400 mb-2">Language</h2>
                                <p className="text-gray-300">{movie.original_language?.toUpperCase()}</p>
                            </div>
                        </div>

                        {movie.production_companies && movie.production_companies.length > 0 && (
                            <div>
                                <h2 className="text-sm font-semibold text-gray-400 mb-3">Production Companies</h2>
                                <div className="flex flex-wrap gap-4">
                                    {movie.production_companies.map(company => (
                                        <span 
                                            key={company.id}
                                            className="bg-[#333] text-white px-3 py-1 rounded text-sm"
                                        >
                                            {company.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;