import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongs } from '../../redux/slices/searchSlice'; // 👈
import SearchResults from '../SearchResults/searchresult';
import Song from '../Song/song';
import { removeSong } from '../../redux/slices/librarySlice';
import { MainContent, LibraryContainer, Cargando, ProblemaAlCargar, BotonReinternat, BotonEliminar } from './styles';

function MusicLibraryMain({ searchTerm }) { 
  const dispatch = useDispatch();
  const biblioteca = useSelector((state) => state.library);
  const { results, loading, error } = useSelector((state) => state.search);

  useEffect(() => {
    if (searchTerm) {
      dispatch(fetchSongs(searchTerm)); 
    }
  }, [searchTerm, dispatch]);

  return (
    <MainContent>
      {loading && <Cargando>Cargando...</Cargando>}
      {error && (
        <div>
          <ProblemaAlCargar>Hubo un problema: {error}</ProblemaAlCargar>
          <BotonReinternat onClick={() => window.location.reload()}>Reintentar</BotonReinternat>
        </div>
      )}

      {!loading && !error && results.length > 0 && (
        <SearchResults canciones={results} />
      )}

      <hr />

      <LibraryContainer>
        <h2>Mis Favoritos</h2>
        {biblioteca.length === 0 ? (
          <p>Aún no has agregado canciones.</p>
        ) : (
          biblioteca.map((cancion) => (
            <div key={cancion.id} style={{ display: 'flex', alignItems: 'center' }}>
              <Song cancion={cancion} isLibrary={true} />
              <BotonEliminar onClick={() => dispatch(removeSong(cancion.id))}>Eliminar</BotonEliminar>
            </div>
          ))
        )}
      </LibraryContainer>
    </MainContent>
  );
}

export default MusicLibraryMain;