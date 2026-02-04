import { Link, useParams } from "react-router-dom";
import { USERS } from "../../data";
import "./UserInfoPage.css";

export function UserInfoPage() {
	const { userId } = useParams();
	const user = USERS[Number(userId)];

	if (!user) {
		return (
			<div className="userInfoPage">
				<h2>UserInfoPage</h2>

				<div className="users">
					<p data-testid="userlist-error">пользователя таким userId нет</p>
				</div>
			</div>
		);
	}

	return (
		<div className="userInfoPage">
			<h2>UserInfoPage</h2>

			<div className="users">
				<p>{user.jobTitle}</p>
				<p>{user.email}</p>
				<img src={user.avatar} alt="Аватар пользователя" width={200} height={200} />
				<p>{user.fullName}</p>
				<p>{user.bio}</p>
				{user.playlist && (
					<div className="user-playlist">
						<p>
							playlist:
							<Link className="user-playlist__name" to={`/playlists/${user.playlist.id}`}> {user.playlist.name}</Link>
						</p>
					</div>
				)}

			</div>
		</div>
	);
}
