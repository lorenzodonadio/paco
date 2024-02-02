// Pacot Game Stuff

type WsOnlinePlayers = {
	k: 'online_players';
	d: string[];
};
type WsGameStChange = {
	k: 'st_change';
	d: PacotGamePublic;
};

type WsNewBid = {
	k: 'new_bid';
	d: PacotGamePublic;
};

type WsExacto = {
	k: 'exacto';
	d: string;
};

type WsLostDice = {
	k: 'lost_dice';
	d: PacotPlayer;
};
type WsLostPlayer = {
	k: 'lost_player';
	d: string;
};
type WsTurnEnd = {
	k: 'turn_end';
	d: DiceRoll[];
};
type WsGameEnd = {
	k: 'game_end';
	d: string;
};

type WsGameMessage =
	| WsOnlinePlayers
	| WsGameStChange
	| WsNewBid
	| WsExacto
	| WsLostDice
	| WsLostPlayer
	| WsTurnEnd
	| WsGameEnd;

type PacotPlayer = {
	p_name: string;
	n_dice: number;
};

type DiceRoll = {
	p_name: string;
	roll: number[];
};

type CurrBid = {
	pn: string;
	bid: [number, number];
};

type PacotGamePublic = {
	id: string;
	pls: PacotPlayer[];
	cp: string;
	cb: CurrBid;
	np: number;
	nap: number;
	st: string;
};

type PacotGame = PacotGamePublic & {
	dice_roll: DiceRoll[];
};
