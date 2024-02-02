<script lang="ts">
	import Modal from '$lib/3d/Modal.svelte';
	import {
		diceAmount,
		diceConfig,
		gameState,
		groupDiceByFaceUp,
		rollResult
	} from '$lib/state/dice';
	import { randDiceConfig } from '$lib/ts/diceConfig';
	import { onDestroy, onMount } from 'svelte';
	let dialogStart: HTMLDialogElement;

	const handleStart = () => {
		$rollResult = [];
		$diceConfig = randDiceConfig($diceAmount);
		$gameState = 'play';
		dialogStart.close();
	};
	onMount(() => {
		$rollResult = [];
		dialogStart.showModal();
	});
</script>

<Modal bind:dialog={dialogStart}>
	<div style="padding: 4rem;">
		<h1>Les Paccots</h1>
		<button on:click={handleStart}>Start</button>
	</div>
</Modal>
