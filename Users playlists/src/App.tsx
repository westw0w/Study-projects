import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./app.css";
import { MainPage, UserInfoPage, UsersPage } from "./pages";
import { PlaylistsInfoPage } from "./pages/PlaylistsInfoPage/PlaylistsInfoPage";
import { PlaylistsPage } from "./pages/PlaylistsPage/PlaylistsPage";

export function App() {
	return (
		<BrowserRouter>
			<div className="header">_</div>

			<div className="section">
				<nav className="navMenu">
					<Link to={"/"}>Главная</Link>
					<Link to={"/users"}>Пользователи</Link>
					<Link to={"/playlists"}>Плейлисты</Link>
				</nav>

				<main className="content">
					<Routes>
						<Route path="/" element={<MainPage />} />
						<Route path="/users" element={<UsersPage />} />
						<Route path="/users/:userId" element={<UserInfoPage />} />
						<Route path="/playlists" element={<PlaylistsPage />} />
						<Route path="/playlists/:playlistId" element={<PlaylistsInfoPage />} />
					</Routes>
				</main>
			</div>

			<div className="footer">
				<a href="https://skillbox.ru/code/">https://skillbox.ru/</a>
			</div>
		</BrowserRouter>
	);
}
