import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import libraryReducer from '../redux/slices/librarySlice';
import searchReducer from '../redux/slices/searchSlice';
import { theme } from '../theme/theme';
import Header from '../components/Header';
import MusicLibraryMain from '../components/Library/MusicLibraryMain';
import App from '../App';

const crearStore = (estadoInicial = {}) =>
  configureStore({
    reducer: { library: libraryReducer, search: searchReducer },
    preloadedState: {
      library: estadoInicial.library || [],
      search: estadoInicial.search || { results: [], loading: false, error: null },
    },
  });

describe('App - Flujo de integración', () => {
  it('renderiza el Header correctamente', () => {
    const mockOnBuscar = jest.fn();
    const mockSetBusqueda = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <Header onBuscar={mockOnBuscar} busqueda="" setBusqueda={mockSetBusqueda} />
        </MemoryRouter>
      </ThemeProvider>
    );
    expect(screen.getByText('Sonoro Music')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Buscar artista...')).toBeInTheDocument();
  });

  it('renderiza la biblioteca vacía al inicio', () => {
    const store = crearStore();
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <MusicLibraryMain searchTerm="" />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
    expect(screen.getByText('Mis Favoritos')).toBeInTheDocument();
    expect(screen.getByText('Aún no has agregado canciones.')).toBeInTheDocument();
  });

  it('el input de búsqueda acepta texto', () => {
    const mockOnBuscar = jest.fn();
    const mockSetBusqueda = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <Header onBuscar={mockOnBuscar} busqueda="" setBusqueda={mockSetBusqueda} />
        </MemoryRouter>
      </ThemeProvider>
    );
    const input = screen.getByPlaceholderText('Buscar artista...');
    fireEvent.change(input, { target: { value: 'Queen' } });
    expect(mockSetBusqueda).toHaveBeenCalledWith('Queen');
  });

  it('las canciones en biblioteca se muestran con botón eliminar', () => {
    const store = crearStore({
      library: [
        { id: '1', albumId: '101', titulo: 'Bohemian Rhapsody', artista: 'Queen', album: 'A Night at the Opera', duracion: '5:55' },
      ],
    });
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <MusicLibraryMain searchTerm="" />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
    expect(screen.getByText(/Bohemian Rhapsody/i)).toBeInTheDocument();
    expect(screen.getByText('Eliminar')).toBeInTheDocument();
  });

  it('eliminar canción actualiza la biblioteca', () => {
    const store = crearStore({
      library: [
        { id: '1', albumId: '101', titulo: 'Bohemian Rhapsody', artista: 'Queen', album: 'A Night at the Opera', duracion: '5:55' },
      ],
    });
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <MusicLibraryMain searchTerm="" />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
    fireEvent.click(screen.getByText('Eliminar'));
    expect(screen.getByText('Aún no has agregado canciones.')).toBeInTheDocument();
  });

it('renderiza la app completa sin errores', () => {
  const store = crearStore();
  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  );
  expect(screen.getByText('Sonoro Music')).toBeInTheDocument();
});
});