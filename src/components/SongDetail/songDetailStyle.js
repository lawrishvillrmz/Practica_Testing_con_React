import styled from 'styled-components';

 const DetailSection = styled.section`
  padding: 2rem;
  max-width: 600px;
  color: ${( props ) => props.theme.colors.textLight};
`;

 const BackLink = styled.a`
  color: ${(props) => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

 const AlbumImg = styled.img`
  width: 200px;
  border-radius: ${( props ) => props.theme.radii.md};
  margin-top: 1rem;
  display: block;
`;

 const BtnFavorito = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: ${(props) => props.theme.radii.sm};
  cursor: pointer;
  font-weight: 600;
  margin-top: 1.5rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryHover};
  }
`;

 const SongTitle = styled.h2`
  margin-top: 1rem;
`;

const Cargando = styled.p`
  color:  #4c9141;
  font-size: 90px ;
  font-weight: 600;
`;


export {
  DetailSection,
  BackLink,
  AlbumImg,
  BtnFavorito,
  SongTitle,
  Cargando,
};