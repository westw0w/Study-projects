import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { UsersPage } from "./UsersPage";
import * as router from "react-router-dom";

const mockSetSearchParam = jest.fn();
const mockUseSearchParams = jest.spyOn(router, "useSearchParams");

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <MemoryRouter>
      {component}
    </MemoryRouter>
  );
};

describe("UsersPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseSearchParams.mockReturnValue([
      new URLSearchParams(),
      mockSetSearchParam
    ]);
  });

  it("вызывает setSearchParam при вводе имени пользователя", () => {
    renderWithRouter(<UsersPage />);

    const input = screen.getByTestId("user-search-input");
    fireEvent.change(input, { target: { value: "John" } });

    expect(mockSetSearchParam).toHaveBeenCalledWith({ searchName: "john" });
  });

  it("фильтрует пользователей на основе введенного текста", () => {
    mockUseSearchParams.mockReturnValue([
      new URLSearchParams({ searchName: "abraham" }),
      mockSetSearchParam
    ]);

    renderWithRouter(<UsersPage />);

    expect(screen.getByText("Abraham Walsh")).toBeInTheDocument();
  });
});