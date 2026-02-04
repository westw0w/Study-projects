import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import * as router from "react-router-dom";
import { PlaylistsPage } from "./PlaylistsPage";

const mockSetSearchParam = jest.fn();
const mockUseSearchParams = jest.spyOn(router, "useSearchParams");

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <MemoryRouter>
      {component}
    </MemoryRouter>
  );
};

describe("PlaylistsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseSearchParams.mockReturnValue([
      new URLSearchParams(),
      mockSetSearchParam
    ]);
  });

  it("вызывает setSearchParam при вводе жанра плейлиста", () => {
    renderWithRouter(<PlaylistsPage />);

    const input = screen.getByTestId("genre-search-input");
    fireEvent.change(input, { target: { value: "Rock" } });

    expect(mockSetSearchParam).toHaveBeenCalledWith({ searchGenre: "rock" });
  });

  it("фильтрует плейлисты на основе введенного текста", () => {
    mockUseSearchParams.mockReturnValue([
      new URLSearchParams({ searchGenre: "rock" }),
      mockSetSearchParam
    ]);

    renderWithRouter(<PlaylistsPage />);

    expect(screen.getByText("Great Rock Hits (Rock)")).toBeInTheDocument();
  });
});