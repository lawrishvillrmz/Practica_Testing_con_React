import { createSlice } from '@reduxjs/toolkit';

const librarySlice = createSlice({
  name: 'library',
  initialState: [],
  reducers: {
    addSong: (state, action) => {
      const existe = state.find((cancion) => cancion.id === action.payload.id);
      if (!existe) {
        state.push(action.payload);
      }
    },
    removeSong: (state, action) => {
      return state.filter((cancion) => cancion.id !== action.payload);
    },
  },
});

export const { addSong, removeSong } = librarySlice.actions;
export default librarySlice.reducer;