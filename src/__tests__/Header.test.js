import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import Header from '../components/Header';
import { theme } from '../theme/theme';

const renderConTema = (ui) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('Header Component', () => {
  const mockOnBuscar = jest.fn();
  const mockSetBusqueda = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza el título Sonoro Music correctamente', () => {
    renderConTema(
      <Header onBuscar={mockOnBuscar} busqueda="" setBusqueda={mockSetBusqueda} />
    );
    expect(screen.getByText('Sonoro Music')).toBeInTheDocument();
  });

  it('renderiza el input de búsqueda', () => {
    renderConTema(
      <Header onBuscar={mockOnBuscar} busqueda="" setBusqueda={mockSetBusqueda} />
    );
    expect(screen.getByPlaceholderText('Buscar artista...')).toBeInTheDocument();
  });

  it('renderiza el botón Buscar', () => {
    renderConTema(
      <Header onBuscar={mockOnBuscar} busqueda="" setBusqueda={mockSetBusqueda} />
    );
    expect(screen.getByText('Buscar')).toBeInTheDocument();
  });

  it('llama a setBusqueda cuando el usuario escribe en el input', () => {
    renderConTema(
      <Header onBuscar={mockOnBuscar} busqueda="" setBusqueda={mockSetBusqueda} />
    );
    const input = screen.getByPlaceholderText('Buscar artista...');
    fireEvent.change(input, { target: { value: 'The Beatles' } });
    expect(mockSetBusqueda).toHaveBeenCalledWith('The Beatles');
  });

  it('llama a onBuscar al hacer submit del formulario', () => {
    renderConTema(
      <Header onBuscar={mockOnBuscar} busqueda="test" setBusqueda={mockSetBusqueda} />
    );
    fireEvent.click(screen.getByText('Buscar'));
    expect(mockOnBuscar).toHaveBeenCalled();
  });
});