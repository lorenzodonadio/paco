type UserData = {
	player_name: string;
	user_name: string;
	id: string;
	created_at: string;
};

type UserDataPub = {
	player: string;
	name: string;
};

type ChatMessage = {
	msg: string;
	from: string;
	name: string;
	at: number;
};

type LobbyMessage = {
	k: string;
	d: UserDataPub[] | ChatMessage | GameInvite | GameLobby;
};

type GameLobby = {
	id: string;
	created_by: string;
	players: string[];
};

type GameInvite = {
	from: string;
	to: string;
	game_id: string;
	at: number;
};

type DiceRoll = {
	p_name: string;
	roll: number[];
};
