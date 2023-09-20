// statisticsSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Statistics {
  // Define your statistics properties here
  totalSongs: number;
  genreCounts: { _id: string; count: number }[];
  artistAlbumCounts: { _id: { artist: string; album: string }; count: number }[];
  totalArtists: number;
  totalAlbums: number;
  albumSongCounts: Record<string, number>;
  mostPopularGenre: { _id: string; count: number };
  artistWithMostSongs: { _id: { artist: string; album: string }; count: number };
  albumWithMostSongs: { album: string; count: number };
}

const initialState: Statistics = {
    totalSongs: 0,
    genreCounts: [],
    artistAlbumCounts: [],
    totalArtists: 0,
    totalAlbums: 0,
    albumSongCounts: {},
    mostPopularGenre: { _id: '', count: 0 },
    artistWithMostSongs: { _id: { artist: '', album: '' }, count: 0 },
    albumWithMostSongs: { album: '', count: 0 },
};

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    setStatistics(state, action: PayloadAction<Statistics>) {
      return action.payload;
    },
  },
});

export const { setStatistics } = statisticsSlice.actions;
export default statisticsSlice.reducer;
