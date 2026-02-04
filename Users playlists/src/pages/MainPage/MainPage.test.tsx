import { render, screen } from "@testing-library/react";
import { MainPage } from "./MainPage";
import "@testing-library/jest-dom";

describe("MainPage", () => {
  it("Снапшот страницы MainPage", () => {
    render(<MainPage />);
    const mainPage = screen.getByTestId("main-page");
    expect(mainPage).toMatchSnapshot();
  });
})
