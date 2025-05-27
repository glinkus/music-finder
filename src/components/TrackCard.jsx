import React from "react";

import './../index.css';
import { Button } from "react-bootstrap";

const TrackCard = ({ track }) => {

    const duration = `${Math.floor(track.duration_ms / 60000)}:${(Math.floor((track.duration_ms % 60000) / 1000)).toString().padStart(2, '0')}`
    return (
            <tr>
            <td>{track.track_number}</td>
            <td>{track.name}</td>
            <td>{
                track.artists.map((artist, index) => (
                    <span key={artist.id}>
                        <p>{artist.name}</p>
                        {index < track.artists.length - 1 ? ', ' : ''}
                    </span>
                ))
            }
            </td>
            <td>{duration}</td>
            <td>
                <Button
                    variant="success"
                    size="sm"
                    href={track.external_urls.spotify}
                    target="_blank"
                >
                    Open
                </Button>
            </td>
        </tr>
    )
}

export default TrackCard