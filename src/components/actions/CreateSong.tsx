import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSong } from '../../services/songService';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './createSong.css';

const CreateSong: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newSong, setNewSong] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
  });
  const [confirmationMessage, setConfirmationMessage] = useState('');



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSong({
      ...newSong,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Call your createSong service function here with newSong data
      const addNewSong = await createSong(newSong);

      // Assuming createSong returns the newly created song, you can dispatch an action
      // to add it to the song list in Redux
      dispatch({ type: 'song/addSong', payload: addNewSong });

      // Optionally, you can reset the form or perform any other actions
      setNewSong({
        title: '',
        artist: '',
        album: '',
        genre: '',
      });

      // Set the confirmation message
      setConfirmationMessage(`Song "${addNewSong.title}" created successfully!`);

      // Automatically clear the confirmation message after 3 seconds (3000 milliseconds)
      setTimeout(() => {
        setConfirmationMessage('');
      }, 3000);
      navigate('/songs');
    } catch (error) {
      console.error('Error creating song:', error);
    }

  }

  return (
    <Container>
      <Row className="justify-content-center vh-100 d-flex">
        <Col lg={6}>
          <Form className="p-4" onSubmit={handleSubmit}>
            <h2 className='text-center mb-4'>Create Song</h2>
            {confirmationMessage && (
              <div className="alert alert-success" role="alert" style={{ background: '#004d00', color: '#ffffff', textAlign: 'center' }}>
                {confirmationMessage}
              </div>
            )}
            <Form.Group controlId="title" className="mb-3 mt-3">
              <Row>
                <Col sm={3}>
                  <Form.Label>Title: </Form.Label>
                </Col>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    name="title"
                    value={newSong.title}
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
                    value={newSong.artist}
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
                    value={newSong.album}
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
                    value={newSong.genre}
                    onChange={handleInputChange}
                    placeholder="Enter genre"
                  />
                </Col>
              </Row>
            </Form.Group>
            <div className="text-center">
              <Button variant="primary" type="submit" className="mt-3">
                Create Song
              </Button>
              <Link to="/songs">
                <Button variant="warning" className="mt-3" style={{ marginLeft: '5px' }}>Songs List</Button>
              </Link>
            </div>


          </Form>

        </Col>
      </Row>
    </Container>
  );
};


export default CreateSong;