import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSongs = createAsyncThunk(
  'search/fetchSongs',
  async (busqueda, { rejectWithValue }) => {
    try {
      const response = await fetch(
       `https://corsproxy.io/?https://theaudiodb.com/api/v1/json/2/searchalbum.php?s=${busqueda}`
      );
      const data = await response.json();

      if (!data.album) throw new Error('No se encontraron resultados');

      const primerAlbum = data.album[0];
      const trackResponse = await fetch(
        `https://corsproxy.io/?https://theaudiodb.com/api/v1/json/2/track.php?m=${primerAlbum.idAlbum}`
      );
      const trackData = await trackResponse.json();

      return trackData.track.map((track) => ({
        id: track.idTrack,
        albumId: track.idAlbum,
        titulo: track.strTrack,
        artista: track.strArtist,
        album: track.strAlbum,
        duracion:
          track.intDuration && track.intDuration > 0
            ? `${Math.floor(track.intDuration / 60000)}:${String(
                Math.floor((track.intDuration % 60000) / 1000)
              ).padStart(2, '0')}`
            : '—',
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    results: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetResults: (state) => {
      state.results = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetResults } = searchSlice.actions;
export default searchSlice.reducer;