import MovieCard from "../components/MovieCard";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/Favorites.css";

function Favorites() {
  const { favorites } = useMovieContext();

  if (!favorites || favorites.length === 0) {
    return (
      <div className="favorites">
        <div className="favorites-empty">
          <h2>No Favorite Movies Yet</h2>
          <p>Start adding movies to your favorites and they will appear here!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites">
      <h2 className="favorites-title">My Favorite Movies</h2>
      <div
        className={`movies-wrapper ${
          favorites.length === 1 ? "single-card" : "movies-grid"
        }`}
      >
        {favorites.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
