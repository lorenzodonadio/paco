import { Vector3 } from 'three';

export type DiceNumbers = 1 | 2 | 3 | 4 | 5 | 6;

const NUM_TO_ROT_MAP: Record<DiceNumbers, [number, number, number]> = {
	1: [Math.PI / 2, 0, 0],
	2: [-Math.PI / 2, 0, 0],
	3: [Math.PI / 2, -Math.PI / 2, 0],
	4: [Math.PI / 2, Math.PI / 2, 0],
	5: [Math.PI, 0, 0],
	6: [0, 0, 0]
};

export const faceNormals = {
	1: new Vector3(0, 0, -1),
	2: new Vector3(0, 0, 1),
	3: new Vector3(-1, 0, 0),
	4: new Vector3(1, 0, 0),
	5: new Vector3(0, -1, 0),
	6: new Vector3(0, 1, 0)
};

export const getFacePoints = (pos: [number, number, number]) => {
	const offset = 0.15; // Adjust this offset to be slightly less than half the dice's width
	const position = new Vector3(...pos);
	let facePoints = {};

	for (const [face, normal] of Object.entries(faceNormals)) {
		// Scale the normal by the offset and add to the position
		//@ts-ignore
		facePoints[face] = normal.clone().multiplyScalar(offset).add(position);
	}

	return facePoints as Record<DiceNumbers, Vector3>;
};

export const dicenum2rot = (n: DiceNumbers) => {
	return NUM_TO_ROT_MAP[n];
};

export const randDiceNumber = (): DiceNumbers => {
	return (Math.floor(Math.random() * 6) + 1) as DiceNumbers;
};
export const randRotation = (): [number, number, number] => {
	const randomAngle = () => Math.random() * 2 * Math.PI;
	return [randomAngle(), randomAngle(), randomAngle()];
};

export const randPos = (): [number, number, number] => {
	const rp = () => 4 * (Math.random() - 0.5);
	return [rp(), Math.random() + 5, rp()];
};

// const v1 = new Euler(0, 0, -1);
// const v2 = new Euler(0, 0, 1);
// const v3 = new Euler(-1, 0, 0);
// const v4 = new Euler(1, 0, 0);
// const v5 = new Euler(0, -1, 0);
// const v6 = new Euler(0, 1, 0);
