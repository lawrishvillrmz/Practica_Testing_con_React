import libraryReducer, { addSong, removeSong } from '../redux/slices/librarySlice';

describe('librarySlice', () => {
  it('estado inicial es array vacío', () => {
    expect(libraryReducer(undefined, { type: '' })).toEqual([]);
  });

  it('addSong agrega una canción', () => {
    const cancion = { id: '1', titulo: 'Test', artista: 'Artista' };
    const estado = libraryReducer([], addSong(cancion));
    expect(estado).toHaveLength(1);
    expect(estado[0].titulo).toBe('Test');
  });

  it('removeSong elimina una canción por id', () => {
    const estadoInicial = [
      { id: '1', titulo: 'Test' },
      { id: '2', titulo: 'Test2' },
    ];
    const estado = libraryReducer(estadoInicial, removeSong('1'));
    expect(estado).toHaveLength(1);
    expect(estado[0].id).toBe('2');
  });

  it('addSong no duplica canciones', () => {
    const cancion = { id: '1', titulo: 'Test' };
    const estadoConCancion = [cancion];
    const estado = libraryReducer(estadoConCancion, addSong(cancion));
    expect(estado).toHaveLength(1);
  });
});