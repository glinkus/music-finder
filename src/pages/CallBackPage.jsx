import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../context/TokenContext';

const clientId = import.meta.env.VITE_CLIENT_ID;
const redirectUri = 'http://127.0.0.1:5173/callback';

const CallbackPage = () => {
  const navigate = useNavigate();
  const { setUserAccessToken  } = useToken();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    const codeVerifier = localStorage.getItem('code_verifier');

    if (!code || !codeVerifier) {
      console.error('Missing code or code_verifier');
      return;
    }

    const fetchAccessToken = async () => {
      const body = new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      });

      try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: body.toString(),
        });

        const data = await response.json();

        if (data.access_token) {
          setUserAccessToken(data.access_token);
          localStorage.setItem('spotify_access_token', data.access_token);
          navigate('/favorites');
        } else {
          console.error('Failed to get token', data);
        }
      } catch (err) {
        console.error('Error exchanging code for token:', err);
      }
    };

    fetchAccessToken();
  }, []);

  return <p>Logging in and retrieving access token...</p>;
};

export default CallbackPage;
