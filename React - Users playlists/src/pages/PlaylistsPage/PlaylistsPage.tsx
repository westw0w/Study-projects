import { ChangeEvent } from "react";
import { PLAYLISTS } from "../../data";
import { Link, useSearchParams } from "react-router-dom";
import "./PlaylistsPage.css";

export function PlaylistsPage() {
  const [searchParam, setSearchParam] = useSearchParams();

  const handleSearchGenre = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setSearchParam({ searchGenre: value.toLowerCase() });
  };

  const handleSearchName = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setSearchParam({ searchName: value.toLowerCase() });
  };

  const searchName = searchParam.get("searchName") || "";
  const searchGenre = searchParam.get("searchGenre") || "";

  const filteredPlaylistsByGenre = searchGenre
    ? PLAYLISTS.filter(({ genre }) => genre.toLowerCase() === searchGenre.toLowerCase())
    : PLAYLISTS.filter(({ genre }) => genre !== "Non Music");

  const filteredPlaylists = filteredPlaylistsByGenre.filter(({ name }) =>
    name.toLowerCase().includes(searchName)
  );

  return (
    <div className="playlistsPage">
      <h2>PlaylistsPage</h2>

      <div className="playlists">
        <label>
          введите жанр{" "}
          <input type="text" value={searchGenre} onChange={handleSearchGenre} data-testid="genre-search-input" />
        </label>
        <label>
          введите название{" "}
          <input type="text" value={searchName} onChange={handleSearchName} data-testid="name-search-input" />
        </label>

        {filteredPlaylists.map(({ id, name, genre }) => (
          <Link to={`/playlists/${id}`} key={id}>
            {name} ({genre})
          </Link>
        ))}
      </div>
    </div>
  );
}

