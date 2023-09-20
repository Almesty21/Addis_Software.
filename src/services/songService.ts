import axios from 'axios';
import { API_BASE_URL } from "./api";

// Define interfaces for your data (Song)
export interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

// Function to fetch songs from the API
export const fetchSongs = async () : Promise<Song[]> => {
  console.log("fetch songs: ", fetchSongs);
  try {
    const response = await axios.get<Song[]>(`${API_BASE_URL}/get-all-songs`);
    console.log("response from fetch: ", response);
    return response.data;
  } catch (err) {
    throw(err);
  }
}

// Function to create a new song
export const createSong = async (newSongData: Partial<Song>) : Promise<Song> => {
  try {
    const response = await axios.post<Song>(`${API_BASE_URL}/create-song`, newSongData);
    console.log("response from create song: ", response);
    return response.data;
  } catch(err) {
    throw(err);
  }
}

// Function to update a song by ID
export const updateSong = async (id: string, updatedSongData: Partial<Song>) : Promise<Song> => {
  try {
    const response = await axios.put<Song>(`${API_BASE_URL}/update-song/${id}`, updatedSongData);
    console.log("response service updated: ", response.data)
    return response.data;
  } catch (err) {
    throw err;
  }
}

// Function to delete a song by ID
export const deleteSongService = async (id: string) : Promise<void> => {
  console.log("api url: ", API_BASE_URL);
  try {
    console.log("erriieieie: ", id);
    await axios.delete(`${API_BASE_URL}/delete-song/${id}`);
  } catch (error) {
    throw new Error('Failed to delete song');
  }
}

