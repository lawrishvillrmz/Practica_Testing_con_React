import searchReducer, { fetchSongs } from '../redux/slices/searchSlice';

describe('searchSlice', () => {
  const estadoInicial = { results: [], loading: false, error: null };

  it('estado inicial correcto', () => {
    expect(searchReducer(undefined, { type: '' })).toEqual(estadoInicial);
  });

  it('fetchSongs.pending pone loading en true', () => {
    const estado = searchReducer(estadoInicial, { type: fetchSongs.pending.type });
    expect(estado.loading).toBe(true);
  });

  it('fetchSongs.fulfilled guarda resultados', () => {
    const canciones = [{ id: '1', titulo: 'test' }];
    const estado = searchReducer(estadoInicial, {
      type: fetchSongs.fulfilled.type,
      payload: canciones,
    });
    expect(estado.results).toEqual(canciones);
    expect(estado.loading).toBe(false);
  });
it('fetchSongs.rejected guarda el error', () => {
  const estado = searchReducer(estadoInicial, {
    type: fetchSongs.rejected.type,
    payload: 'Error de red',
    error: { message: 'Error de red' },
  });
  expect(estado.error).toBeTruthy();
  expect(estado.loading).toBe(false);
});
    it('fetchSongs.fulfilled con array vacío', () => {
  const estado = searchReducer(estadoInicial, {
    type: fetchSongs.fulfilled.type,
    payload: [],
  });
  expect(estado.results).toEqual([]);
  expect(estado.loading).toBe(false);
  expect(estado.error).toBeNull();
});

it('fetchSongs.pending limpia el error anterior', () => {
  const estadoConError = { results: [], loading: false, error: 'error previo' };
  const estado = searchReducer(estadoConError, {
    type: fetchSongs.pending.type,
  });
  expect(estado.loading).toBe(true);
  expect(estado.error).toBeNull();
});
        
});