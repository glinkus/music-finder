import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { generateCodeVerifier, generateCodeChallenge } from '../pkce';

const clientId = import.meta.env.VITE_CLIENT_ID;
const redirectUri = "http://127.0.0.1:5173/callback";
const scopes = ["user-top-read"];

const CustomNavbar = () => {
  const handleLogin = async () => {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    localStorage.setItem('code_verifier', codeVerifier);

    const loginUrl = `https://accounts.spotify.com/authorize?` +
      `client_id=${clientId}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent(scopes.join(' '))}` +
      `&code_challenge_method=S256` +
      `&code_challenge=${codeChallenge}`;

    window.location.href = loginUrl;
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md" sticky="top">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" style={{ alignItems: 'center' }}>
            <Nav.Link as={Link} style={{ margin: '1rem' }} to="/">Spotify Album Finder</Nav.Link>
            <Nav.Link as={Link} to="/favorites">Favorite Artists</Nav.Link>
            <Button variant="success" style={{ margin: '20px' }} onClick={handleLogin}>
              Login with Spotify
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
