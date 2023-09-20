import { call, put, takeLatest, SagaReturnType, takeEvery } from 'redux-saga/effects';
import { Song, createSong, fetchSongs, updateSong, deleteSongService } from '../../services/songService'; // Import your service
import { setSongs, setLoading, setError, createSongSuccess, updateSongSuccess, updateSongFailure, deleteSong, deleteSongAction } from '../slices/songSlice';
import { PayloadAction } from '@reduxjs/toolkit';



export interface DeleteSongAction {
    type: string;
    payload: {
        id: string;
    };
}

function* getSongsSaga() {
    try {
        yield put(setLoading(true));

        // Use `SagaReturnType` to infer the return type of `fetchSongs`
        const songs: SagaReturnType<typeof fetchSongs> = yield call(fetchSongs);

        yield put(setSongs(songs));
        yield put(setLoading(false));
    } catch (err) {
        yield put(setError('Failed to fetch songs')); 
        yield put(setLoading(false));
    }
}

// Saga for creating a song
function* createSongSaga(action: PayloadAction<Song>) {
    try {
        const newSong: SagaReturnType<typeof createSong> = yield call(createSong, action.payload);
        yield put(createSongSuccess(newSong));
    } catch (error) {
        throw error;
    }
}

// Saga for updating a song
function* updateSongSaga(action: PayloadAction<{ id: string; updatedSongData: Partial<Song> }>) {
    try {
        const { id, updatedSongData } = action.payload;
        const updatedSong: Song = yield call(updateSong, id, updatedSongData);
        yield put(updateSongSuccess(updatedSong));
    } catch (err) {
        yield put(updateSongFailure('Failed to update song'));
    }
}

function* deleteSongSaga(action: ReturnType<typeof deleteSongAction>) {
    try {
      const songIdToDelete = action.payload;
      yield call(deleteSongService, songIdToDelete);
  
      // Dispatch a success action to update the UI
      yield put(deleteSong(songIdToDelete));
    } catch (error) {
      // Handle errors if needed
      console.error('Error deleting song:', error);
    }
  }

// Watchers
export function* watchGetSongs() {
    console.log('Saga is listening for song/getSongs actions');

    // Replace with your action type
    yield takeLatest('song/getSongs', getSongsSaga); 
}
export function* watchCreateSong() {
    yield takeLatest('song/createSong', createSongSaga);
}

// Watcher saga
export function* watchUpdateSong() {
    yield takeLatest('song/updateSong', updateSongSaga);
}

// Watch for deleteSong actions and run the deleteSongSaa
export function* watchDeleteSong() {
    yield takeEvery(deleteSongAction.type, deleteSongSaga);
}
