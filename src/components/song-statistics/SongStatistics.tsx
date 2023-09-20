import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongStatistics, Statistics } from '../../services/statisticsService'; 
import { RootState } from '../../redux/store/store';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './songStatistics.css';
import { Link } from 'react-router-dom';

const SongStatistics: React.FC = () => {
  const dispatch = useDispatch();
  const statistics = useSelector((state: RootState) => state.statistics);

  useEffect(() => {
    const getSongStatistics = async () => {
      try {
        const data = await fetchSongStatistics();
        dispatch({ type: 'statistics/fetchStatistics', payload: data });
      } catch (error) {
        dispatch({ type: 'getSongStatisticsFailure', payload: 'Failed to fetch songs' });
      }
    };
    getSongStatistics();
  }, [dispatch]);

  return (
    <>
      <Container>
        <Card style={{ width: '18rem', margin: '0 auto' }} className='bg-warning mt-3 text-center align-item-center justify-content-center'>
          <Card.Header><h2>Song Statistics</h2></Card.Header>
          
        </Card>
        <Container className="d-flex justify-content-center">
      <Row>
        <Col>
          <Link to="/songs">
            <Button variant="warning" className="mt-3">
              Songs List
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
        <Row className="mt-5">
          <Col md={2}></Col>
          <Col md={8}>
            <Row>
              <Col md={5} className="equal-height-col">
                <Card>
                  <Card.Header className='text-center bg-info'>Song Statistics</Card.Header>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Total Songs: <strong>{statistics.totalSongs}</strong></ListGroup.Item>
                    <ListGroup.Item>Total Artists: <strong>{statistics.totalArtists}</strong></ListGroup.Item>
                    <ListGroup.Item>Total Albums: <strong>{statistics.totalAlbums}</strong></ListGroup.Item>
                    <ListGroup.Item>Most Popular Genre: <strong>{statistics.mostPopularGenre._id}</strong></ListGroup.Item>
                    <ListGroup.Item>Artist with Most Songs: <strong>{statistics.artistWithMostSongs._id.artist}</strong></ListGroup.Item>
                    <ListGroup.Item>Album with Most Songs: <strong>{statistics.albumWithMostSongs.album}</strong></ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
              <Col md={2}></Col>
              <Col md={5} className="equal-height-col">
                <Card>
                  <Card.Header className='text-center bg-info'>Genre Counts:</Card.Header>
                  <ListGroup variant="flush">
                    {statistics.genreCounts.map((genre) => (
                      <ListGroup.Item key={genre._id}>{genre._id}: <strong>{genre.count}</strong></ListGroup.Item>
                    ))}

                  </ListGroup>
                </Card>
              </Col>
            </Row>
              </Col>
              <Col md={2}></Col>
            </Row>
            <Row className="mt-5 mb-5">
              <Col md={2}></Col>
              <Col md={8}>
                <Row>
                  <Col md={5} className="equal-height-col">
                    <Card>
                      <Card.Header className='text-center bg-info'>Artist Album Counts:</Card.Header>
                      <ListGroup variant="flush">
                      {statistics.artistAlbumCounts.map((artistAlbum) => (
              <ListGroup.Item key={artistAlbum._id.artist + artistAlbum._id.album}>
                Artist: <strong>{artistAlbum._id.artist}</strong>, <br />Album: <strong>{artistAlbum._id.album}</strong>, <br /> Count: <strong>{artistAlbum.count}</strong>
              </ListGroup.Item>
            ))}
                      </ListGroup>
                      
                    </Card>
                  </Col>
                  <Col md={2}></Col>
                  <Col md={5} className="equal-height-col">
                  <Card>
                      <Card.Header className='text-center bg-info'>Album Song Counts:</Card.Header>
                      <ListGroup variant="flush">
                      {Object.keys(statistics.albumSongCounts).map((album) => (
              <ListGroup.Item key={album}>Album: <strong>{album}</strong>, <br /> Count: <strong>{statistics.albumSongCounts[album]}</strong></ListGroup.Item>
            ))}
                      </ListGroup>
                    </Card>
                  </Col>
                </Row>
          </Col>
          <Col md={2}></Col>
        </Row>
      </Container>
    </>
  );
};

export default SongStatistics;
