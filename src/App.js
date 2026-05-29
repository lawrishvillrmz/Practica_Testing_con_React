import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme/theme';
import GlobalStyles from './theme/GlobalStyles';
import Header from './components/Header';
import MusicLibraryMain from './components/Library/MusicLibraryMain';
import SongDetail from './components/SongDetail/SongDetail';

function App() {
  const [busqueda, setBusqueda] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleBuscar = () => {
    if (!busqueda.trim()) return;
    setSearchTerm(busqueda); 
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Header onBuscar={handleBuscar} busqueda={busqueda} setBusqueda={setBusqueda} />
        <Routes>
          <Route path="/" element={<MusicLibraryMain searchTerm={searchTerm} />} />
          <Route path="/song/:songId/:albumId" element={<SongDetail />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;