<script lang="ts">
	import FaceResults from './FaceResults.svelte';

	import Modal from '$lib/3d/Modal.svelte';
	import { diceAmount, diceConfig, gameState, rollResult } from '$lib/state/dice';
	import { randDiceConfig } from '$lib/ts/diceConfig';
	import { onDestroy, onMount } from 'svelte';
	let dialog: HTMLDialogElement;

	const handlePlayAgain = () => {
		$rollResult = [];
		$diceConfig = randDiceConfig($diceAmount);
		dialog.close();
		$gameState = 'play';
	};
	$: console.log($diceAmount);

	onMount(() => dialog.showModal());
</script>

<Modal bind:dialog on:close={() => ($rollResult = [])}>
	<div style="padding: 4rem;">
		<p>Result:</p>
		<FaceResults></FaceResults>

		<label for="range">
			<p>
				Dice number: {$diceAmount}
			</p>
			<input
				type="range"
				min="2"
				max="15"
				bind:value={$diceAmount}
				id="diceAmountRange"
				name="diceAmountRange"
			/>
		</label>

		<button on:click={handlePlayAgain}>Play Again</button>
	</div>
</Modal>
