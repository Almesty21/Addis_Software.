
import { all } from 'redux-saga/effects';
import { watchGetSongs, watchCreateSong, watchUpdateSong, watchDeleteSong } from './songSaga'; 
import { watchFetchStatistics } from './statisticsSaga';

export default function* rootSaga() {
  // Use the all effect to run multiple sagas concurrently
  yield all([
    watchGetSongs(), // Start the saga to watch for 'GET_SONGS' action
    watchCreateSong(),
    watchUpdateSong(),
    watchDeleteSong(),
    watchFetchStatistics(),
  ]);
}
