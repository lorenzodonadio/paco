import { get, writable } from 'svelte/store';
import type { DiceConfig } from '$lib/types/dice';
import { randDiceConfig } from '$lib/ts/diceConfig';
import { persisted } from 'svelte-persisted-store';
export interface RollResult {
	id: string;
	faceUp: number;
}

export type GameStates = 'start' | 'play' | 'finish';
export const gameState = persisted<GameStates>('po_dicegamestate', 'start');
export const diceAmount = persisted<number>('po_diceamount', 5);
export const rollResult = persisted<RollResult[]>('po_dicerollresult', []);
export const diceConfig = persisted<DiceConfig[] | null>('po_diceconfig', null);

export const rollDice3D = () => {
	gameState.set('play');
	rollResult.set([]);
	diceConfig.set(randDiceConfig(get(diceAmount)));
};
export function checkGameFinished() {
	const dice = get(diceConfig);
	const results = get(rollResult).map((x) => x.id);

	if (!dice || dice.length < 1) return;
	if (results.length < 1) return;

	for (const id of dice.map((x) => x.id)) {
		if (!results.includes(id)) return;
	}

	gameState.set('finish');
}

export function groupDiceByFaceUp(diceResults: RollResult[]): { [faceUpValue: number]: number } {
	const groupedResults: { [faceUpValue: number]: number } = {};

	diceResults.forEach((die) => {
		if (groupedResults[die.faceUp]) {
			groupedResults[die.faceUp]++;
		} else {
			groupedResults[die.faceUp] = 1;
		}
	});

	return groupedResults;
}
