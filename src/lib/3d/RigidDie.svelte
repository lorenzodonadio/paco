<script lang="ts">
	import { T } from '@threlte/core';
	import DiceScene from './DiceScene.svelte';
	import { Collider, RigidBody } from '@threlte/rapier';
	// import { Vector3, type Group, type Object3DEventMap, Quaternion, Euler } from 'three';
	import { getFacePoints } from '$lib/ts/diceRotation';
	import { checkGameFinished, rollResult } from '$lib/state/dice';

	export let position: [number, number, number];
	export let rotation: [number, number, number];
	export let id: string;
	// const diceSound = new Audio('/dice-95077.mp3');
	// const initialNormal = new Vector3(0, 1, 0).applyEuler(new Euler().fromArray(rotation));
	// console.log({ initialNormal });

	let rigidBody: RigidBody;
	let facePoints = getFacePoints(position);

	const handleSleep = () => {
		// const position = rigidBody.position();

		const faceUp = getFaceUp();
		// console.log('Up-facing face:', getFaceUp());

		rollResult.update((x) => [...x, { id, faceUp }]);
		checkGameFinished();
	};

	const getFaceUp = () => {
		const rotation = rigidBody.rotation();

		// Transform each point with the dice's position and rotation
		let highestY = -Infinity;
		let face = 0;
		for (let i = 1; i <= 6; i++) {
			// @ts-ignore
			const worldPoint = facePoints[i].clone().applyQuaternion(rotation);
			if (worldPoint.y > highestY) {
				highestY = worldPoint.y;
				face = i;
			}
		}
		return face;
	};
</script>

<T.Group {rotation} {position}>
	<!-- on:collisionexit={firesound} -->
	<RigidBody bind:rigidBody gravityScale={2} on:sleep={handleSleep}>
		<Collider
			contactForceEventThreshold={50}
			restitution={0.75}
			shape={'roundCuboid'}
			args={[0.3, 0.3, 0.3, 0.2]}
		/>
		<DiceScene></DiceScene>
	</RigidBody>

	<T.Line></T.Line>
</T.Group>
