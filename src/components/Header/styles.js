import styled from 'styled-components';

const StyledHeader = styled.header`
  background-color: ${(props) => props.theme.colors.headerBg};
  color: ${(props) => props.theme.colors.textLight};
  padding: 20px;
  text-align: center;
  font-family: ${(props) => props.theme.fonts.main};

 
`;

const StyledTitulo = styled.h1`
  color: #7a43cc;
`;

const StyledForm = styled.form`
  background-color: transparent;
  gap: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
`;

const StyledInput = styled.input`
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  font-size: 1rem;
`;

const BtnBuscar = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: ${(props) => props.theme.radii.sm};
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryHover};
  }
`;

export { 
  StyledHeader, 
  StyledForm, 
  StyledInput, 
  BtnBuscar,
  StyledTitulo,
};