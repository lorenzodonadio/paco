import type { DiceConfig } from '$lib/types/dice';
import { randPos, randRotation } from '$lib/ts/diceRotation';
import { nanoid } from 'nanoid';
// randPos(): [number, number, number]
export const collissionrandDiceConfig = (amount: number): DiceConfig[] => {
	const diceConfig = [];

	for (let i = 0; i < amount; i++) {
		diceConfig.push({ id: nanoid(5), pos: randPos(), rot: randRotation() });
	}
	return diceConfig;
};

export const randDiceConfig = (amount: number): DiceConfig[] => {
	const diceConfig: DiceConfig[] = [];
	const maxAttempts = amount * 3;
	let attempts = 0;

	while (diceConfig.length < amount) {
		const newPos = randPos();

		if (attempts < maxAttempts) {
			let collision = false;
			for (let i = 0; i < diceConfig.length; i++) {
				if (isColliding(newPos, diceConfig[i].pos)) {
					collision = true;
					break;
				}
			}
			if (!collision) diceConfig.push({ id: nanoid(5), pos: newPos, rot: randRotation() });
		} else {
			diceConfig.push({ id: nanoid(5), pos: newPos, rot: randRotation() });
		}

		attempts++;
	}

	return diceConfig;
};

const isColliding = (
	pos1: [number, number, number],
	pos2: [number, number, number],
	minDist = 1
): boolean => {
	const dx = pos1[0] - pos2[0];
	const dy = pos1[1] - pos2[1];
	const dz = pos1[2] - pos2[2];
	const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
	return distance < minDist;
};
