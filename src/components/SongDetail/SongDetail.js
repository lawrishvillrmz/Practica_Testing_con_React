import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import { addSong } from '../../redux/slices/librarySlice'; 
import useFetch from '../../hooks/useFetch';
import { DetailSection, AlbumImg, BtnFavorito, SongTitle, Cargando } from './songDetailStyle';

const SongDetail = () => { 
  const { songId, albumId } = useParams(); 
  const dispatch = useDispatch(); 

  const { data: albumData, loading: loadingAlbum, error } = useFetch(
    `https://theaudiodb.com/api/v1/json/2/album.php?m=${albumId}`
  );
 
  const { data: trackData, loading: loadingTracks } = useFetch(
    `https://theaudiodb.com/api/v1/json/2/track.php?m=${albumId}`
  );

  const album = albumData?.album?.[0];
  const cancion = trackData?.track?.find((t) => t.idTrack === songId);

  if (loadingAlbum || loadingTracks) return <Cargando>Cargando...</Cargando>;
  if (error) return <p>Error al cargar. Intenta nuevamente.</p>;
  if (!cancion) return <p>No se encontró la canción.</p>;

  return (
    <DetailSection>
      <Link to="/">← Inicio</Link>
      <SongTitle>{cancion.strTrack}</SongTitle>
      <p><strong>Artista:</strong> {cancion.strArtist}</p>
      <p><strong>Álbum:</strong> {cancion.strAlbum}</p>

      {cancion.intDuration > 0 && (
        <p>
          <strong>Duración:</strong>{' '}
          {Math.floor(cancion.intDuration / 60000)}:
          {String(Math.floor((cancion.intDuration % 60000) / 1000)).padStart(2, '0')}
        </p>
      )}

      {cancion.intTrackNumber && (
        <p><strong>Número en el álbum:</strong> {cancion.intTrackNumber}</p>
      )}

      {album?.intYearReleased && (
        <p><strong>Año:</strong> {album.intYearReleased}</p>
      )}

      {album?.strGenre && (
        <p><strong>Género:</strong> {album.strGenre}</p>
      )}

      {album?.strAlbumThumb && (
        <AlbumImg src={album.strAlbumThumb} alt={album.strAlbum} />
      )}

      <BtnFavorito
        onClick={() => dispatch(addSong({
          id: cancion.idTrack,
          albumId: cancion.idAlbum,
          titulo: cancion.strTrack,
          artista: cancion.strArtist,
          album: cancion.strAlbum,
          duracion: cancion.intDuration > 0
            ? `${Math.floor(cancion.intDuration / 60000)}:${String(
                Math.floor((cancion.intDuration % 60000) / 1000)
              ).padStart(2, '0')}`
            : '—',
        }))}
      >
        + Agregar a favoritos
      </BtnFavorito>
    </DetailSection>
  );
};

export default SongDetail;