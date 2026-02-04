import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PlaylistsInfoPage } from "./PlaylistsInfoPage";
import { PLAYLISTS } from "../../data";
import { MemoryRouter } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as router from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <MemoryRouter>
      {component}
    </MemoryRouter>
  );
};

describe("PlaylistsInfoPage", () => {
  it("Проверка сообщения об ошибке, если плейлист не найден", () => {
    jest.spyOn(router, "useParams").mockReturnValue({ playlistId: "-1" });
    renderWithRouter(<PlaylistsInfoPage />);

    const errorElement = screen.getByTestId("playlist-error")
    expect(errorElement).toHaveTextContent("Плейлиста с таким Id нет");
  });

  describe("Проверка отображения информации о плейлисте", () => {
    beforeEach(() => {
      jest.spyOn(router, "useParams").mockReturnValue({ playlistId: "0" });
      renderWithRouter(<PlaylistsInfoPage />);
    });

    it("Проверка жанра в плейлисте", () => {
      const genreElement = screen.getByText(`Жанр: ${PLAYLISTS[0].genre}`);
      expect(genreElement).toBeInTheDocument();
    });

    it("Проверка названия в плейлисте", () => {
      const nameElement = screen.getByText(`Название: ${PLAYLISTS[0].name}`);
      expect(nameElement).toBeInTheDocument();
    });

    it("Проверка количества песен в плейлисте", () => {
      const songElements = screen.getAllByText(/^- /);
      expect(songElements).toHaveLength(PLAYLISTS[0].songs.length);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
  });
})