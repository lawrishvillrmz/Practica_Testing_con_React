import { Link } from 'react-router-dom';
import Song from '../Song/song';
import { ResultadosSection, CancionRow, BtnAdd } from './styles';
import { useDispatch } from 'react-redux';
import { addSong } from '../../redux/slices/librarySlice';
const SearchResults = ({ canciones }) => {
  const dispatch = useDispatch();

  return (
    <ResultadosSection>
      <h2>Resultados de Búsqueda</h2>
      {canciones.map((cancion) => (
        <CancionRow key={cancion.id}>
          <Link to={`/song/${cancion.id}/${cancion.albumId}`} style={{ textDecoration: 'none', flex: 1 }}>
            <Song cancion={cancion} isLibrary={false} hideButton={true} />
          </Link>
          <BtnAdd onClick={() => dispatch(addSong(cancion))}>Agregar</BtnAdd>
        </CancionRow>
      ))}
    </ResultadosSection>
  );
};

export default SearchResults;