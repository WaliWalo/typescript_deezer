export interface ErrorActionInterface {
  type: string;
  payload: { id: number; msg: string };
}

export interface SongActionInterface {
  type: string;
  payload: {
    data: Array<Song>;
    total: number;
    next?: string;
    prev?: string;
  } | null;
}

export interface SelectedSongActionInterface {
  type: string;
  payload: number | null;
}

type Song = {
  id: number;
  readable: boolean;
  title: string;
  title_short: string;
  title_version?: string;
  link: string;
  duration: number;
  rank: number;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  preview: string;
  md5_image: string;
  artist: artist;
  album: album;
  type: string;
};

type artist = {
  id: number;
  name: string;
  link: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  tracklist: string;
  type: string;
};

type album = {
  id: number;
  title: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  md5_image: string;
  tracklist: string;
  type: string;
};

export interface SingleSong {
  id: number;
  readable: boolean;
  title: string;
  title_short: string;
  title_version?: string;
  isrc: string;
  link: string;
  share: string;
  duration: number;
  track_position: number;
  disk_number: number;
  rank: number;
  release_date: string;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  preview: string;
  bpm: number;
  gain: number;
  available_countries?: [];
}

export interface InitialStateInterface {
  errors?: Array<ErrorActionInterface["payload"]> | null;
  songs?: SongActionInterface["payload"] | null;
  selectedSong?: SelectedSongActionInterface["payload"] | null;
}
