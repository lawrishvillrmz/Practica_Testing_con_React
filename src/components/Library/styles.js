import styled from 'styled-components';

 const MainContent = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
  align-items: flex-start;
`;


 const LibraryContainer = styled.article`
  flex: 1;
  min-width: 300px;
  margin-top: 30px;
  padding: 20px;
  background-color: ${( props ) => props.theme.colors.cardBg};
  border-radius: ${(props ) => props.theme.radii.lg};
  border: 2px solid ${( props ) => props.theme.colors.primary};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  h2 {
    color: ${( props ) => props.theme.colors.primary};
    margin-bottom: 15px;
    font-family: ${( props ) => props.theme.fonts.fallback};
  }

  p {
    color: ${( props ) => props.theme.colors.textMuted};
    font-style: italic;
  }
`;
const Cargando = styled.p`
  color:  #7a43cc;
  font-size: 30px ;
  font-weight: 500;
  text-align: center;
`;

const ProblemaAlCargar = styled.p `
    color: #CF3C21;
    font-size: 20px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
`;

const BotonReinternat = styled.button`
  background-color: #7a43cc;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
`;
const BotonEliminar = styled(BotonReinternat)`
  background-color: #a70e10;
`;

export {
  MainContent,
  LibraryContainer,
  Cargando,
  ProblemaAlCargar,
  BotonReinternat,
  BotonEliminar,
  
};