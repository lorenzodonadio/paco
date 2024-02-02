<script lang="ts">
	import BidSelector from './BidSelector.svelte';
	import { user, userId } from '$lib/state/general';
	import { Button } from '$lib/shadcn/ui/button';
	import { errorToast, neutralToast } from '$lib/ts/toasts';
	import { PUBLIC_BE_URL } from '$env/static/public';
	import { diceAmount, gameState, rollDice3D, rollResult } from '$lib/state/dice';
	import Card from '$lib/shadcn/ui/card/card.svelte';
	import FaceResults from '$lib/3d/FaceResults.svelte';

	// export let data;
	export let game: PacotGamePublic;
	export let bidMessage = '';
	let showBid = false;

	$: disabledBid = game?.cp != $user?.player_name;

	$: if (game && game.cp === $user?.player_name) {
		neutralToast(`Your Turn! ${$user.user_name}`);
	}

	$: if ($gameState === 'finish') {
		if (game && game.st === 'turnStart') {
			handleRoll($rollResult.map((x) => x.faceUp));
		}
	}

	const handleMyBid = async (bid: [number, number]) => {
		if (!game || !$user) return errorToast('No Game Found');

		const body: CurrBid = {
			pn: $user.player_name,
			bid: bid
		};
		const url = PUBLIC_BE_URL + `/game/${game.id}/bid`;
		const res = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${$userId}`
			},
			body: JSON.stringify(body)
		});

		if (!res.ok) errorToast(await res.text());
	};

	const handleRoll = async (roll: number[]) => {
		if (!game || !$user) return errorToast('No Game Found');

		const body: DiceRoll = { p_name: $user.player_name, roll };
		const url = PUBLIC_BE_URL + `/game/${game.id}/roll`;
		const res = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${$userId}`
			},
			body: JSON.stringify(body)
		});

		if (!res.ok) errorToast(await res.text());
	};

	const handleExacto = async () => {
		if (!game || !$user) return errorToast('No Game Found');
		const url = PUBLIC_BE_URL + `/game/${game.id}/exacto`;
		const res = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${$userId}`
			}
		});

		if (!res.ok) errorToast(await res.text());
	};
	const handleLiar = async () => {
		if (!game || !$user) return errorToast('No Game Found');
		const url = PUBLIC_BE_URL + `/game/${game.id}/liar`;
		const res = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${$userId}`
			}
		});
		if (!res.ok) errorToast(await res.text());
	};
</script>

<div class="absolute left-0 top-0">
	{#if $user}
		<div class="flex justify-center" style="width: 100vw;">
			<Card>
				<h4 class="h4 text-primary">Hello {$user.player_name} - {$user.user_name}</h4>
				{#if game && game.cp === $user?.player_name}
					<h3 class="h3 text-destructive-foreground">Your Turn ⏱️⏱️</h3>
				{/if}
			</Card>
		</div>
	{/if}
	<div class="p-1">
		<p>3Dstate: {$gameState}</p>
		<p>gamestate: {game.st}</p>

		{#if $gameState === 'finish'}
			<p>Result:</p>
			<FaceResults></FaceResults>
		{/if}
	</div>

	<div class="flex justify-center space-y-4 py-6">
		{#if $gameState === 'start'}
			<Button on:click={rollDice3D}>Roll {$diceAmount} Dice</Button>
		{/if}

		<h3 class="h3">{bidMessage}</h3>
	</div>
</div>

<div class="absolute bottom-0" style="width: 100vw;">
	{#if showBid}
		{#key game}
			<BidSelector
				on:bid={(e) => handleMyBid(e.detail)}
				min={Math.floor(game.cb.bid[0] / 2)}
				max={game.np * 5}
			></BidSelector>
		{/key}
	{/if}

	<div class="flex justify-center space-x-4">
		<Button disabled={disabledBid} on:click={handleExacto} variant="secondary">Exacto</Button>
		<Button disabled={disabledBid} on:click={handleLiar} variant="destructive">Liar</Button>
		<Button disabled={disabledBid} on:click={() => (showBid = !showBid)}>
			{#if showBid}
				- Bid
			{:else}
				+ Bid
			{/if}
		</Button>
	</div>
</div>
