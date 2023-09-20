import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { setSelectedGenre } from '../../redux/slices/songSlice';
import { Form } from 'react-bootstrap';
import './genreFilter.css';

// Define FormControlElement type
type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const GenreFilter: React.FC = () => {
  const dispatch = useDispatch();
  const selectedGenre = useSelector((state: RootState) => state.song.selectedGenre);
  const songs = useSelector((state: RootState) => state.song.songs);

  // Extract unique genres from your songs
  const availableGenres: string[] = Array.from(new Set(songs.map((song) => song.genre)));

  const handleGenreChange = (event: React.ChangeEvent<FormControlElement>) => {
    const genre = event.target.value;
    dispatch(setSelectedGenre(genre !== 'all' ? genre : null));
  };

  return (
    <Form.Group className="mb-4 mt-2"> {/* Wrap with Form.Group */}
      <Form.Control
        as="select"
        value={selectedGenre || 'all'}
        onChange={(event: React.ChangeEvent<FormControlElement>) => handleGenreChange(event as any)}
        className="w-100" // Use Bootstrap's width classes
      >
        <option value="all">All Genres</option>
        {availableGenres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default GenreFilter;
