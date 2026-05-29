import { StyledHeader, StyledForm, StyledInput, BtnBuscar, StyledTitulo } from './styles';

const Header = ({ onBuscar, busqueda, setBusqueda }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onBuscar();
  };

  return (
    <StyledHeader>
      <StyledTitulo>Sonoro Music</StyledTitulo>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          placeholder="Buscar artista..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <BtnBuscar type="submit">Buscar</BtnBuscar>
      </StyledForm>
    </StyledHeader>
  );
};

export default Header;