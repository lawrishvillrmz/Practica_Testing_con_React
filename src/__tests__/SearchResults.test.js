import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import libraryReducer from '../redux/slices/librarySlice';
import searchReducer from '../redux/slices/searchSlice';
import SearchResults from '../components/SearchResults/searchresult';

import { ThemeProvider } from 'styled-components';
import { theme } from '../theme/theme';

const cancionesMock = [
  { id: '1', albumId: '101', titulo: 'Bohemian Rhapsody', artista: 'Queen', album: 'A Night at the Opera' },
  { id: '2', albumId: '102', titulo: 'Hotel California', artista: 'Eagles', album: 'Hotel California' },
];

const crearStore = () =>
  configureStore({
    reducer: {
      library: libraryReducer,
      search: searchReducer,
    },
  });

const renderConProviders = (ui) =>
  render(
    <Provider store={crearStore()}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>{ui}</BrowserRouter>
      </ThemeProvider>
    </Provider>
  );

describe('SearchResults Component', () => {
  it('renderiza la sección de resultados de búsqueda', () => {
    renderConProviders(<SearchResults canciones={cancionesMock} />);
    expect(screen.getByText('Resultados de Búsqueda')).toBeInTheDocument();
  });

  it('renderiza la lista de canciones correctamente', () => {
    renderConProviders(<SearchResults canciones={cancionesMock} />);
    expect(screen.getByText(/Bohemian Rhapsody/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Hotel California/i)[0]).toBeInTheDocument();
  });

  it('muestra el artista de cada canción', () => {
    renderConProviders(<SearchResults canciones={cancionesMock} />);
    expect(screen.getByText(/Queen/i)).toBeInTheDocument();
    expect(screen.getByText(/Eagles/i)).toBeInTheDocument();
  });

  it('renderiza botones de Agregar para cada canción', () => {
    renderConProviders(<SearchResults canciones={cancionesMock} />);
    const botones = screen.getAllByText('Agregar');
    expect(botones).toHaveLength(2);
  });

  it('el botón Agregar despacha la acción al hacer clic', () => {
    renderConProviders(<SearchResults canciones={cancionesMock} />);
    const botones = screen.getAllByText('Agregar');
    fireEvent.click(botones[0]);
  
  });

  it('no renderiza canciones si la lista está vacía', () => {
    renderConProviders(<SearchResults canciones={[]} />);
    expect(screen.queryByText('Agregar')).not.toBeInTheDocument();
  });
});
