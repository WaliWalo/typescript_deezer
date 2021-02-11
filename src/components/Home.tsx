import React from "react";
import { Button, Spinner, Accordion, Card } from "react-bootstrap";
import {
  SelectedSongActionInterface,
  SongActionInterface,
} from "../types/interfaces";
import { RouteComponentProps } from "react-router-dom";
interface Props {
  routeProps: RouteComponentProps;
  songs: SongActionInterface["payload"];
  handlePagination: (url: string | undefined) => void;
  handleSelectedSong: (songId: SelectedSongActionInterface["payload"]) => void;
}

export default function Home(props: Props) {
  return (
    <div className="mt-3 mb-2">
      {props.songs !== null ? (
        <>
          <Accordion defaultActiveKey="0" style={{ color: "black" }}>
            {props.songs.data.map((result, index) => {
              return (
                <Card key={index}>
                  <Accordion.Toggle as={Card.Header} eventKey={`${index + 1}`}>
                    <img
                      src={result.album.cover_small}
                      alt="album cover"
                      className="mr-3"
                    ></img>
                    {result.title}
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={`${index + 1}`}>
                    <Card.Body>
                      <p>Title: {result.title}</p>
                      <p>
                        Link:{" "}
                        <a target="_blank" rel="noreferrer" href={result.link}>
                          {result.link}
                        </a>
                      </p>
                      <p>Artist: {result.artist.name}</p>
                      <Button
                        onClick={() => {
                          props.handleSelectedSong(result.id);
                          props.routeProps.history.push("/songDetails");
                        }}
                      >
                        More Details
                      </Button>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              );
            })}
          </Accordion>
          {props.songs.prev && (
            <Button
              onClick={() =>
                props.songs && props.handlePagination(props.songs.prev)
              }
              className="mr-3"
            >
              Back
            </Button>
          )}
          {props.songs.next && (
            <Button
              onClick={() =>
                props.songs && props.handlePagination(props.songs.next)
              }
            >
              Next
            </Button>
          )}
        </>
      ) : (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
    </div>
  );
}
