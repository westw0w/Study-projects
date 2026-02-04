export interface IUser {
	id: number;
	email: string;
	fullName: string;
	jobTitle: string;
	avatar: string;
	bio: string;
	playlist?: TPlaylist;
}

interface IPlaylistFull {
	id: number;
	genre: string;
	name: string;
	songs: string[];
}

interface IPlaylistEmty {
	id: number;
	genre: "Non Music";
	name: "";
	songs: [];
}

export type TPlaylist = IPlaylistFull | IPlaylistEmty;
