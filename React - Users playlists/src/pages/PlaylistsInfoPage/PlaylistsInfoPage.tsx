import { Link, useParams } from "react-router-dom";
import { PLAYLISTS } from "../../data";
import "./PlaylistsInfoPage.css"


export function PlaylistsInfoPage() {
  const { playlistId } = useParams();
  const playlist = PLAYLISTS[Number(playlistId)];

  if (!playlist) {
    return (
      <div className="PlaylistsInfoPage">
        <div className="playlist__wrapper">
          <h2>PlaylistsInfoPage</h2>
        </div>
        <div className="playlist">
          <p data-testid="playlist-error" >Плейлиста с таким Id нет</p>
        </div>
      </div>
    );
  }

  return (
    <div className="PlaylistsInfoPage" data-testid="playlist-info">
      <div className="playlist__wrapper">
        <h2>PlaylistsInfoPage</h2>
        <Link className="playlist__genre" to={`/playlists?searchGenre=${playlist.genre}`}>Жанр: {playlist.genre}</Link>
        <p>Название: {playlist.name}</p>
      </div>
      <div className="playlist">
        {playlist.songs.map((song) => (
          <p key={crypto.randomUUID()}>- {song}</p>
        ))}
      </div>
    </div>
  );
}
