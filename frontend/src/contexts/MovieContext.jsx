import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from 'prop-types';

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({children}) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        try {
            const storedFavorites = localStorage.getItem("favorites");
            console.log("Loading favorites from storage:", storedFavorites);
            
            if (storedFavorites) {
                const parsedFavorites = JSON.parse(storedFavorites);
                setFavorites(parsedFavorites);
                console.log("Parsed favorites:", parsedFavorites);
            }
        } catch (error) {
            console.error("Error loading favorites from localStorage:", error);
        }
    }, []);

    useEffect(() => {
        try {
            console.log("Saving favorites to storage:", favorites);
            localStorage.setItem("favorites", JSON.stringify(favorites));
        } catch (error) {
            console.error("Error saving favorites to localStorage:", error);
        }
    }, [favorites]);

    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie]);
    }

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}

MovieProvider.propTypes = {
    children: PropTypes.node.isRequired,
};