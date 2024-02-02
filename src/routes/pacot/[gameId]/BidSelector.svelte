<script lang="ts">
	import { Button } from '$lib/shadcn/ui/button';
	import Card from '$lib/shadcn/ui/card/card.svelte';
	import { createEventDispatcher } from 'svelte';
	import DiceNumSelector from './DiceNumSelector.svelte';
	import NumSelect from './NumSelect.svelte';
	import { error } from '@sveltejs/kit';
	import { errorToast } from '$lib/ts/toasts';
	const dispatch = createEventDispatcher();

	export let min: number;
	export let max: number;
	let amount = [0];
	let diceNumber: number | null = null;

	$: disabled = diceNumber === null;

	const confirmBid = () => {
		if (diceNumber === null) return errorToast('Select a Dice First');
		dispatch('bid', [amount[0], diceNumber]);
	};
</script>

<div class="flex w-full justify-center">
	<Card class="mx-auto flex max-w-lg flex-col space-y-3 px-6 py-3">
		<div class="flex h-11 w-full justify-between">
			<h3 class="h3 my-auto">Your Bid:</h3>

			<h3 class="h3 flex space-x-2">
				<span class="my-auto">
					{amount[0]} x
				</span>
				{#if diceNumber}
					<img
						class="h-11 w-11 rounded-lg object-cover"
						alt="selected_dice"
						src="/diceFaces/{diceNumber}.png"
					/>
				{:else}
					<span class="my-auto">❔</span>
				{/if}
			</h3>
		</div>
		<NumSelect {max} {min} bind:value={amount}></NumSelect>
		<DiceNumSelector bind:selected={diceNumber}></DiceNumSelector>

		<div class="flex justify-center">
			<Button on:click={confirmBid} {disabled} size="lg">Confirm Bid</Button>
		</div>
	</Card>
</div>
