import { API_BASE_URL } from "./api";
import axios from 'axios';

export interface Statistics {
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

export const fetchSongStatistics = async (): Promise<Statistics[]> => {
    try {
      const response = await axios.get<Statistics[]>(`${API_BASE_URL}/get-statistics`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };