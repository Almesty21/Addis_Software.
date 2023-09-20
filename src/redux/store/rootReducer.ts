import { combineReducers } from 'redux';
import songReducer from '../slices/songSlice'; 
import statisticsReducer from '../slices/statisticsSlice';

// Combine your reducers into a single rootReducer
const rootReducer = combineReducers({
  song: songReducer, // Assign the song reducer to the 'song' key in the root state
  statistics: statisticsReducer, // Assign the statistics reducer to the 'statistics' key in the root state
});

// Export the rootReducer for use in your store configuration
export default rootReducer;
