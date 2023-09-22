import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Song } from '../../services/songService';

interface SongState {
  songs: Song[];
  loading: boolean;
  error: string | null;
  selectedGenre: string;
}

const initialState: SongState = {
  songs: [],
  loading: false,
  error: null,
  selectedGenre: '',
};

// Create an action using createAction
export const updateSongRequest  = createAction<{ id: string; updatedSongData: Partial<Song> }>('song/updateSong');



const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    setSongs(state, action: PayloadAction<Song[]>) {
      state.songs = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },

    // Action for creating a song
    createSongSuccess(state, action: PayloadAction<Song>) {
      state.songs.push(action.payload);
    },

    // Action for updating a song
    updateSongSuccess(state, action: PayloadAction<Song>) {
      const updatedSong = action.payload;
      const updatedSongIndex = state.songs.findIndex(song => song._id === updatedSong._id);

      if (updatedSongIndex !== -1) {
        state.songs[updatedSongIndex] = updatedSong;
      }
      state.loading = false;
      state.error = null;
    },
    updateSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Define a reducer to remove a song by its ID
    deleteSongAction: (state, action) => {
      // Remove the deleted song from the state
      state.songs = state.songs.filter((song) => song._id !== action.payload);
    },
    // Add a new reducer to set the selected genre
    setSelectedGenre: (state, action) => {
      state.selectedGenre = action.payload;
    },

  }

});
export const { setSongs, setLoading, setError, createSongSuccess, updateSongSuccess, updateSongFailure, deleteSongAction, setSelectedGenre  } = songSlice.actions;
export default songSlice.reducer;