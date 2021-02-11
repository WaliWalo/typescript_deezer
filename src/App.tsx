import React, { useState } from "react";
import "./App.css";
import { Form, Button, FormControl, Container } from "react-bootstrap";
// import { connect } from "react-redux";
import {
  SelectedSongActionInterface,
  SongActionInterface,
} from "./types/interfaces";
import Home from "./components/Home";
import { Route, useHistory } from "react-router";
// import { bindActionCreators, Dispatch, ActionCreatorsMapObject } from "redux";
import SongDetails from "./components/SongDetails";

// const mapStateToProps = (state: InitialStateInterface) => state;

// const mapDispatchToProps = {
//   setResults: (input: string) => {},
// };

// type songs = SongActionInterface["payload"];

function App() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<SongActionInterface["payload"]>(null);
  const [selectedSong, setSelectedSong] = useState<
    SelectedSongActionInterface["payload"]
  >(null);

  const history = useHistory();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    history.push("/");
    fetchSongs(input);
  };

  const fetchSongs = async (input?: string, url?: string) => {
    let urlString = "";
    if (url) {
      urlString = `https://yabba-dabba-duls-cors-anywhere.herokuapp.com/${url}`;
    } else {
      urlString = `https://yabba-dabba-duls-cors-anywhere.herokuapp.com/https://deezerdevs-deezer.p.rapidapi.com/search?q=${input}`;
    }
    try {
      let response = await fetch(urlString, {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "db388dbec5mshc59db4d245728fep1c2998jsna21051d70dc4",
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        },
      });
      if (response.ok) {
        let data = await response.json();
        setResults(data);
      } else {
        let error = response;
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  const handlePagination = (url: string | undefined) => {
    fetchSongs(undefined, url);
  };

  const handleSelectedSong = (
    songId: SelectedSongActionInterface["payload"]
  ) => {
    setSelectedSong(songId);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Form inline onSubmit={(e) => handleSubmit(e)}>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSearch(e)
            }
            value={input}
          />
          <Button variant="outline-success" type="submit">
            Search
          </Button>
        </Form>
        <Container>
          {results && (
            <Route
              path="/"
              exact
              render={(props) => (
                <Home
                  routeProps={props}
                  songs={results}
                  handlePagination={(url) => handlePagination(url)}
                  handleSelectedSong={(songId) => handleSelectedSong(songId)}
                />
              )}
            ></Route>
          )}
          <Route
            path="/songDetails"
            exact
            render={() => <SongDetails selectedSong={selectedSong} />}
          />
        </Container>
      </header>
    </div>
  );
}

export default App;
