import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store/store';
import { Song, updateSong } from '../../services/songService';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { updateSongRequest  } from '../../redux/slices/songSlice';
import './editSong.css';



const EditSong: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const songs = useSelector((state: RootState) => state.song.songs);
    const [editedSong, setEditedSong] = useState<Partial<Song>>({
        title: '',
        artist: '',
        album: '',
        genre: '',
    });

    useEffect(() => {
        // Find the song to edit by its ID
        const songToEdit = songs.find(song => song._id === id);
        if (songToEdit) {
            setEditedSong(songToEdit);
        }
    }, [id, songs]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedSong({ ...editedSong, [name]: value });
    };

    const handleUpdateSong = async () => {
        try {
            if (id) {
                
                // Dispatch the updateSongSuccess action
                await dispatch(updateSongRequest({ id, updatedSongData: editedSong }));
                navigate('/songs');
            } else {
                console.error('Song ID is undefined.'); // Handle this case as needed
            }
        } catch (error) {
            dispatch({ type: 'updateSongFailure', payload: 'Failed to fetch songs' });
        }
        
    }

    return (
        <Container>
            <Row className="justify-content-center vh-100 d-flex">
                <Col lg={6}>
                    <Form className="p-4" onSubmit={handleUpdateSong}>
                        <h2 className='text-center mb-4'>Edit Song</h2>
                        <Form.Group controlId="title" className="mb-3 mt-3">
                            <Row>
                                <Col sm={3}>
                                    <Form.Label>Title: </Form.Label>
                                </Col>
                                <Col sm={9}>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        value={editedSong.title}
                                        onChange={handleInputChange}
                                        placeholder="Enter title"
                                        required
                                    />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group controlId="artist" className="mb-3">
                            <Row>
                                <Col sm={3}>
                                    <Form.Label>Artist: </Form.Label>
                                </Col>
                                <Col sm={9}>
                                    <Form.Control
                                        type="text"
                                        name="artist"
                                        value={editedSong.artist}
                                        onChange={handleInputChange}
                                        placeholder="Enter artist"
                                        required
                                    />
                                </Col>
                            </Row>


                        </Form.Group>

                        <Form.Group controlId="album" className="mb-3">
                            <Row>
                                <Col sm={3}>
                                    <Form.Label>Album: </Form.Label>
                                </Col>
                                <Col sm={9}>
                                    <Form.Control
                                        type="text"
                                        name="album"
                                        value={editedSong.album}
                                        onChange={handleInputChange}
                                        placeholder="Enter album"
                                    />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group controlId="genre">
                            <Row>
                                <Col sm={3}>
                                    <Form.Label>Genre: </Form.Label>
                                </Col>
                                <Col sm={9}>
                                    <Form.Control
                                        type="text"
                                        name="genre"
                                        value={editedSong.genre}
                                        onChange={handleInputChange}
                                        placeholder="Enter genre"
                                    />
                                </Col>
                            </Row>
                        </Form.Group>
                        <div className="text-center">
                            <Button variant="primary" type="submit" className="mt-3">
                                Edit Song
                            </Button>
                            <Link to="/songs">
                                <Button variant="danger" className="mt-3" style={{ marginLeft: '5px' }} onClick={() => navigate('/songs')}>Cancel</Button>
                            </Link>
                        </div>


                    </Form>

                </Col>
            </Row>
        </Container>
    );

}

export default EditSong;