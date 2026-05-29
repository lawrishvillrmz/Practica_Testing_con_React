import styled from 'styled-components';
import { BtnAdd } from '../Song/styles';

const ResultadosSection = styled.section`
  color: ${(props) => props.theme.colors.primary};
`;

const CancionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export { 
  ResultadosSection,
  CancionRow,
  BtnAdd,
};