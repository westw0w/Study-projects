import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { useParams } from "react-router-dom";
import { UserInfoPage } from "./UserInfoPage";
import { USERS } from "../../data";
import * as router from "react-router-dom";

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useParams: jest.fn(),
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <MemoryRouter>
      {component}
    </MemoryRouter>
  );
};

describe("UserInfoPage", () => {
  it("Проверка сообщения об ошибке, если пользователь не найден", () => {
    jest.spyOn(router, "useParams").mockReturnValue({ userId: "-1" });
    renderWithRouter(<UserInfoPage />);

    const errorElement = screen.getByTestId("userlist-error");
    expect(errorElement).toHaveTextContent("пользователя таким userId нет");
  });

  describe("Проверка отображения информации о Пользователе", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.spyOn(router, "useParams").mockReturnValue({ userId: "0" });
      renderWithRouter(<UserInfoPage />);
    });

    it("Проверка email пользователя", () => {
      const genreElement = screen.getByText(USERS[0].email);
      expect(genreElement).toBeInTheDocument();
    });

    it("Проверка имени пользователя", () => {
      const genreElement = screen.getByText(USERS[0].fullName);
      expect(genreElement).toBeInTheDocument();
    });

    it("Проверка ссылки на плейлист", () => {
      const playlist = USERS[0].playlist;
      if (playlist) {
        expect(screen.getByText(playlist.name)).toBeInTheDocument();
      }
    });

  });
})