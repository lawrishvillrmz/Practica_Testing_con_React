import { SongCard, SongInfo, BtnAdd } from './styles';

const Song = ({ cancion, onAdd, isLibrary, hideButton }) => {
  const { titulo, artista, album, duracion } = cancion;

  return (
    <SongCard $isLibrary={isLibrary}>
      <SongInfo>
        <h3>{titulo}</h3>
        <p>{artista} • {album} ({duracion})</p>
      </SongInfo>

      {!isLibrary && !hideButton && (
        <BtnAdd onClick={() => onAdd(cancion)}>Agregar</BtnAdd>
      )}
    </SongCard>
  );
};

export default Song;