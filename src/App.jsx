
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AlbumCard from './components/AlbumCard';
import AlbumDisplay from './pages/AlbumDisplay';
import AlbumTracksPage from './pages/AlbumTracksPage'
import FavoritesPage from './pages/FavoritesPage';
import CustomNavbar from './components/NavBar';
import CallbackPage from './pages/CallBackPage';

function App() {
  return (
    <Router>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<AlbumDisplay />} />
        <Route path="/album/:id" element={<AlbumTracksPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/callback" element={<CallbackPage />} /> 
      </Routes>
    </Router>
  )
}

export default App
