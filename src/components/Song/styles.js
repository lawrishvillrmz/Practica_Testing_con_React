import styled from 'styled-components';

 const SongCard = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  background-color: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.radii.md};
  transition: transform 0.2s, box-shadow 0.2s;
  border-left: ${({ $isLibrary, theme }) =>
    $isLibrary ? `4px solid ${theme.colors.primary}` : 'none'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(123, 81, 236, 0.9);
  }
`;

 const SongInfo = styled.article`
  h3 {
    margin: 0;
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.white};
  }

  p {
    margin: 4px 0 0;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

 const BtnAdd = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.radii.sm};
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

export {
  SongCard,
  SongInfo,
  BtnAdd,
};