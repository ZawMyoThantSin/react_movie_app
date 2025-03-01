import './css/App.css';
import Favorite from './pages/Favorites';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import { MovieProvider } from './contexts/MovieContext';
import MovieDetail from './components/MovieDetail';
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider } from './contexts/AuthProvider';
function App() {


  return (
    <AuthProvider>
      <MovieProvider>
        <NavBar />
        <main className='main-content'>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<Home />} />
            <Route path='/favorites' element={<Favorite />} />
            <Route path='/movie/:id' element={<MovieDetail />} />
          </Routes>
        </main>
      </MovieProvider>
    </AuthProvider>
  )
}

export default App
