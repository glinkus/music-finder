import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useToken } from '../context/TokenContext';
import { Button, Table } from 'react-bootstrap';
import TrackCard from '../components/TrackCard';
import { useNavigate } from "react-router-dom";

const AlbumTracks = ({ }) => {
    const { id } = useParams();
    const { accessToken } = useToken()
    const [tracks, setTracks] = useState([])
    const nagivate = useNavigate()

    useEffect(() => {
        let params = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken
            }
        }
        fetch(
            "https://api.spotify.com/v1/albums/" + id + "/tracks", params
        ).then((results) => results.json()).then((data) => { setTracks(data.items); console.log(data.items) })
    }, [])

    return (
        <div className="container mt-4">
            <h2>Track List</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Artists</th>
                        <th>Duration</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    {tracks.map(track => (
                        <TrackCard key={track.id} track={track} />
                    ))}
                </tbody>
            </Table>
            <Button onClick={() => nagivate('/')}>Go back</Button>
        </div>
    )

}

export default AlbumTracks