import { useEffect, useState } from 'react';
import { useToken } from '../context/TokenContext';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';

function FavoritesPage() {
  const { userAccessToken } = useToken();
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    if (!userAccessToken) return;

    fetch('https://api.spotify.com/v1/me/top/artists?limit=10', {
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.items)) {
          setTopArtists(data.items);
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch(err => console.error('Failed to fetch top artists:', err));
  }, [userAccessToken]);

  return (
    <Container className="mt-4">
      <h2>Your Favorite Artists</h2>
      <Row>
        {topArtists.map(artist => (
          <Col md={4} key={artist.id} className="mb-4">
            <Card style={{ backgroundColor: 'white', color: 'black' }}>
              {artist.images?.[0]?.url && (
                <Card.Img variant="top" src={artist.images[0].url} />
              )}
              <Card.Body>
                <Card.Title>{artist.name}</Card.Title>

                <Card.Text>
                  <strong>Followers:</strong> {artist.followers?.total.toLocaleString() ?? 'N/A'}
                </Card.Text>

                <Card.Text>
                  <strong>Popularity:</strong> {artist.popularity}
                </Card.Text>

                {artist.genres && artist.genres.length > 0 && (
                  <Card.Text>
                    <strong>Genres:</strong>{' '}
                    {artist.genres.map((genre, index) => (
                      <Badge bg="info" key={index} className="me-1">
                        {genre}
                      </Badge>
                    ))}
                  </Card.Text>
                )}

                <a
                  href={artist.external_urls?.spotify}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-success mt-2"
                >
                  Open in Spotify
                </a>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default FavoritesPage;
