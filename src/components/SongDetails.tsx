import React, { useEffect, useState } from "react";
import { Container, Jumbotron, Spinner } from "react-bootstrap";
import { SelectedSongActionInterface, SingleSong } from "../types/interfaces";

interface Props {
  selectedSong: SelectedSongActionInterface["payload"];
}

export default function SongDetails(props: Props) {
  const [song, setSong] = useState<SingleSong | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetchSong(props.selectedSong);
  });

  useEffect(() => {
    audio && (playing ? audio.play() : audio.pause());
  }, [playing]);

  const fetchSong = async (songId: SelectedSongActionInterface["payload"]) => {
    try {
      const response = await fetch(
        `https://deezerdevs-deezer.p.rapidapi.com/track/${songId}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "db388dbec5mshc59db4d245728fep1c2998jsna21051d70dc4",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          },
        }
      );
      if (response.ok) {
        let data = await response.json();
        setSong(data);
        setAudio(new Audio(data.preview));
      } else {
        let error = response.status;
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const togglePlay = () => {
    setPlaying(!playing);
  };

  return (
    <Jumbotron fluid className="mt-3">
      <Container style={{ color: "black" }}>
        {song ? (
          <>
            <h1>{song.title}</h1>
            <p>
              <strong>Link: </strong>
              {song.link}
            </p>
            <p>
              <strong>Release Date: </strong>
              {song.release_date}
            </p>
            <audio className="audio-element">
              <source src={song.preview}></source>
            </audio>
            <button onClick={togglePlay}>
              <span>Play Audio</span>
            </button>
          </>
        ) : (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
      </Container>
    </Jumbotron>
  );
}
