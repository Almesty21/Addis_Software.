import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SongList from './components/song-list/SongList';

import './App.css';
import CreateSong from './components/actions/CreateSong';
import EditSong from './components/actions/EditSong';
import SongStatistics from './components/song-statistics/SongStatistics';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/songs" />} />
        <Route path="/songs" element={<SongList />} />
        <Route path="/create-song" element={<CreateSong />} />
        <Route path="/update-song/:id" element={<EditSong />} />
        <Route path="/song-statistics" element={<SongStatistics />} />
      </Routes>
        </Router>
        </>
  );
}

export default App;
