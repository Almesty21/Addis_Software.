import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { Song, deleteSongService, fetchSongs as getSongsFromApi } from '../../services/songService';
import { Col, Row, Table, Button, Modal, Container, Card, Pagination } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { deleteSongAction } from '../../redux/slices/songSlice';
import GenreFilter from './GenreFilter';
import './songList.css';


const SongList: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const songs = useSelector((state: RootState) => state.song.songs);

  const selectedGenre = useSelector((state: RootState) => state.song.selectedGenre);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [songToDelete, setSongToDelete] = useState('');
  

  useEffect(() => {
    const getSongs = async () => {

      try {
        const data = await getSongsFromApi();

        dispatch({ type: 'song/getSongs', payload: data });
      } catch (error) {
        dispatch({ type: 'getSongsFailure', payload: 'Failed to fetch songs' });
      }
    };

    getSongs();
  }, [dispatch]);

  const handleDeleteConfirmation = (songId: string) => {
    setSongToDelete(songId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteSongService(songToDelete);
      setShowDeleteModal(false);

      window.location.reload();

    } catch (error) {
      console.error('Error deleting song:', error);
      setShowDeleteModal(false);
    }
  };
  

  return (
    <div>
      <Row>
        <Col md={2}></Col>
        <Col md={8}>
        <Card style={{ width: '14rem', margin: '0 auto' }} className='bg-info mt-3 text-center align-item-center justify-content-center'>
          <Card.Header><h2>Songs List</h2></Card.Header> 
        </Card>
          <Container>
      <Row>
        <Col>
          <div className="d-flex justify-content-between">
            <Link to="/create-song" className='mb-2'>
              <Button variant="warning">Add</Button>
            </Link>
            <Link to="/song-statistics">
              <Button variant="warning">
                Songs Statistics
              </Button>
            </Link>
          </div>
          <GenreFilter />
        </Col>
      </Row>
    </Container>
          <div className="table-responsive"> {/* Wrap the table with this div */}
            <Table striped bordered hover>
              <thead>
                <tr className='text-center'>
                  <th>Title</th>
                  <th>Artist</th>
                  <th>Album</th>
                  <th>Genre</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {songs.filter((song) => !selectedGenre || song.genre === selectedGenre)
                  .map((song: Song) => (
                  <tr key={song._id} className='text-center'>
                    <td >{song.title}</td>
                    <td>{song.artist}</td>
                    <td>{song.album}</td>
                    <td>{song.genre}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Button
                          variant="info"
                          onClick={() => navigate(`/update-song/${song._id}`)}
                          style={{ marginRight: '10px' }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteConfirmation(song._id)}
                        >
                          Delete
                        </Button>
                      </div>
                      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                        <Modal.Header closeButton>
                          <Modal.Title>Confirm Deletion</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to delete this song?</Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                            Cancel
                          </Button>
                          <Button variant="danger" onClick={handleConfirmDelete}>
                            Delete
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </td>
                  </tr>
                ))}

              </tbody>
            </Table>
          </div>
        </Col>
        <Col md={2}></Col>
      </Row>
    </div>
  );
};

export default SongList;





