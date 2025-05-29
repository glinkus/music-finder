
import './../App.css'
import { FormControl, InputGroup, Container, Button, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from "react"
import AlbumCard from './../components/AlbumCard';
import { useToken } from '../context/TokenContext';

const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
function AlbumDisplay() {
  const [searchInput, setSearchInput] = useState("")
  const {publicAccessToken, setPublicAccessToken } = useToken()
  const [albums, setAlbums] = useState([])

  useEffect(() => {
    let authParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        clientId + "&client_secret=" + clientSecret,
    }
    fetch("https://accounts.spotify.com/api/token", authParams)
      .then((result) => result.json())
      .then((data) => setPublicAccessToken(data.access_token))

  }, [])
  async function search() {
    let artistParams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + publicAccessToken
      }
    }

    const artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
      artistParams
    ).then((results) => results.json())
      .then((data) => { return data.artists.items[0].id })
    console.log(artistID)
    
    await fetch(
      "https://api.spotify.com/v1/artists/" +
      artistID +
      "/albums?include_groups=album&market=US&limit=50",
      artistParams
    )
      .then((result) => result.json())
      .then((data) => {
        setAlbums(data.items);
      });
  }


  return (
    <>
      <Container>
        <InputGroup>
          <FormControl
            placeholder="Search For Artist"
            type="input"
            aria-label="Search for an Artist"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                search();
              }
            }}
            onChange={(e) => setSearchInput(e.target.value)}
            style={{
              width: "300px",
              height: "35px",
              borderWidth: "0px",
              borderStyle: "solid",
              borderRadius: "5px",
              marginRight: "10px",
              paddingLeft: "10px",
            }}
          />

          <Button onClick={search}>Search</Button>
        </InputGroup>
      </Container>
      <Container>
        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            alignContent: "center",
          }}
        >
          
            {albums.map((album) => {
              return (<AlbumCard key={album.key} album={album} />)
            })}
          
        </Row>
      </Container>
    </>
  )
}

export default AlbumDisplay
