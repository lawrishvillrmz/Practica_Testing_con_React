import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import libraryReducer from '../redux/slices/librarySlice';
import searchReducer from '../redux/slices/searchSlice';
import MusicLibraryMain from '../components/Library/MusicLibraryMain';
import { ThemeProvider } from 'styled-components';
import { theme } from '../theme/theme';

const cancionesEnBiblioteca = [
  { id: '1', albumId: '101', titulo: 'Bohemian Rhapsody', artista: 'Queen', album: 'A Night at the Opera', duracion: '5:55' },
  { id: '2', albumId: '102', titulo: 'Hotel California', artista: 'Eagles', album: 'Hotel California', duracion: '6:30' },
];

const crearStore = (cancionesIniciales = []) =>
  configureStore({
    reducer: {
      library: libraryReducer,
      search: searchReducer,
    },
    preloadedState: {
      library: cancionesIniciales,
      search: { results: [], loading: false, error: null },
    },
  });

const renderConProviders = (ui, cancionesIniciales = []) =>
  render(
    <Provider store={crearStore(cancionesIniciales)}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>{ui}</BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
describe('MusicLibraryMain (Library) Component', () => {
  it('muestra mensaje cuando la biblioteca está vacía', () => {
    renderConProviders(<MusicLibraryMain searchTerm="" />, []);
    expect(screen.getByText('Aun no has agregado canciones.')).toBeInTheDocument();
  });

  it('muestra el título Mis Favoritos', () => {
    renderConProviders(<MusicLibraryMain searchTerm="" />, []);
    expect(screen.getByText('Mis Favoritos')).toBeInTheDocument();
  });

  it('renderiza las canciones de la biblioteca', () => {
    renderConProviders(<MusicLibraryMain searchTerm="" />, cancionesEnBiblioteca);
    expect(screen.getByText(/Bohemian Rhapsody/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Hotel California/i)[0]).toBeInTheDocument();
  });

  it('renderiza botones Eliminar para cada canción', () => {
    renderConProviders(<MusicLibraryMain searchTerm="" />, cancionesEnBiblioteca);
    const botones = screen.getAllByText('Eliminar');
    expect(botones).toHaveLength(2);
  });

  it('elimina una canción al hacer clic en Eliminar', () => {
    renderConProviders(<MusicLibraryMain searchTerm="" />, cancionesEnBiblioteca);
    const botones = screen.getAllByText('Eliminar');
    fireEvent.click(botones[0]);
    expect(screen.queryByText(/Bohemian Rhapsody/i)).not.toBeInTheDocument();
  });

  it('muestra estado de cargando cuando loading es true', () => {
    const store = configureStore({
      reducer: { library: libraryReducer, search: searchReducer },
      preloadedState: {
        library: [],
        search: { results: [], loading: true, error: null },
      },
    });
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <MusicLibraryMain searchTerm="test" />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });
});
