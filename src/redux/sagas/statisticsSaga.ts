// statisticsSaga.ts

import { SagaReturnType, call, put, takeLatest } from 'redux-saga/effects';
import { Statistics, fetchSongStatistics } from '../../services/statisticsService'; // Your statistics service
import { setStatistics } from '../slices/statisticsSlice';

function* fetchStatisticsSaga() {
    try {
      // Call your statistics service
      const statistics: Statistics = yield call(fetchSongStatistics); 
      // Dispatch the data to the store
      yield put(setStatistics(statistics)); 
    } catch (error) {
      console.error('Failed to fetch statistics:', error);
    }
  }

export function* watchFetchStatistics() {
  yield takeLatest('statistics/fetchStatistics', fetchStatisticsSaga); 
}
