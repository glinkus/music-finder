import React from "react";
import './../index.css';

const AlbumCard = ({album}) => {
    return(
        <div className="card">
            <img 
            src={album.images[0].url} 
            alt={album.name}
            className="image"
            />
            <div className="content">
                <h3 className="title">{album.name}</h3>
                <p className="release">Release date: {album.release_date}</p>
                <a
                    href={album.external_urls.spotify}
                    target="_black"
                    className="album-button"
                >
                    Open in Spotify
                </a>
            </div>
        </div>
    )
}

export default AlbumCard