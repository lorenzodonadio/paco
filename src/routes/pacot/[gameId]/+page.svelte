<script lang="ts">
	import GameControls from './GameControls.svelte';
	import { page } from '$app/stores';
	import { loadUserOrLogout, user, userId } from '$lib/state/general';
	import { neutralToast } from '$lib/ts/toasts';
	import { WS_BE_URL } from '$lib/ts/wsConn';
	import { onDestroy, onMount } from 'svelte';
	import DiceApp from '$lib/3d/DiceApp.svelte';
	import { diceAmount, diceConfig, gameState, resetDiceState, rollResult } from '$lib/state/dice';
	import Card from '$lib/shadcn/ui/card/card.svelte';
	import { Button } from '$lib/shadcn/ui/button';
	import { onlinePlayers, playersRolled } from '$lib/state/game';
	import { PUBLIC_BE_URL } from '$env/static/public';

	// export let data;
	let loading = false;
	let socket: WebSocket;
	let game: PacotGamePublic | null = null;
	let endMessage: string | null = null;

	const handleGameWsMessage = (e: MessageEvent) => {
		try {
			const msg: WsGameMessage = JSON.parse(e.data);
			console.log(msg);
			switch (msg.k) {
				case 'online_players':
					$onlinePlayers = msg.d;
					break;

				case 'st_change':
					game = msg.d;
					neutralToast(`⏱️ ${game.st} ⏱️`);
					const damount = game.pls.find((x) => x.p_name === $user?.player_name)?.n_dice;

					if (msg.d.st === 'turnStart') gameState.set('start');

					if (damount) $diceAmount = damount;
					break;

				case 'new_bid':
					if (!game) return;
					game = msg.d;
					const bidMessage = `${game.cb.pn} Bids ${game.cb.bid[0]} x ${game.cb.bid[1]}`;
					neutralToast(`🎲 ${bidMessage} 🎲`);
					break;

				case 'exacto':
					neutralToast(`EXACTOOO ${msg.d} +1 🎲`);
					break;

				case 'lost_dice':
					neutralToast(`${msg.d.p_name} LOST DICE  -1 🎲`);
					break;

				case 'turn_end':
					neutralToast('🏁 Turn ended');
					$playersRolled = [];
					console.log('🏁 Turn ended', msg.d);
					break;

				case 'lost_player':
					neutralToast(`😢 PLAYER OUT: ${msg.d} 😢`);
					break;

				case 'game_end':
					neutralToast(`Game ended! THE WINNER IS: ${msg.d}`);
					break;

				case 'dice_roll':
					$playersRolled = [msg.d.player, ...$playersRolled];
					neutralToast(`${msg.d.name} / ${msg.d.player} Rolled Dice 🎲`);
					break;

				default:
					console.warn('Received unknown message type:', msg);
			}
		} catch (error) {
			if (error instanceof Error) console.error('Error handling WebSocket message:', error.message);
		}
	};

	onMount(async () => {
		await loadUserOrLogout();
		console.log('UserId: ', $userId);
		try {
			socket = new WebSocket(`${WS_BE_URL}/ws/game/${$page.params.gameId}?userId=${$userId}`);
			socket.onmessage = handleGameWsMessage;
		} catch (error) {
			if (error instanceof Error) console.error(error.message);
		}

		// avoid the 3d from trowing dice again after a reload mid game by nulling the diceConfig
		if ($rollResult.length > 0) {
			$diceConfig = null;
			neutralToast('You already rolled dice this round');
		}
		if (!game) {
			const res = await fetch(`${PUBLIC_BE_URL}/game/${$page.params.gameId}/`, {
				method: 'GET',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${$userId}`
				}
			});
			if (res.ok) game = await res.json();
		}
		loading = true;
	});

	onDestroy(() => {
		resetDiceState();
	});
</script>

<main class="relative">
	{#if endMessage}
		<Card class="mt-8 flex flex-col justify-center space-y-2 p-6">
			<h3>The game Ended!</h3>

			<h4>{endMessage}</h4>

			<a href="/lobby">
				<Button>Back To Lobby</Button>
			</a>
		</Card>
	{:else}
		<div class="absolute right-0 top-8">
			<ul class="w-96">
				{#each $onlinePlayers as player}
					<li class="flex justify-between">
						<span class={$user?.player_name === player ? 'font-semibold text-primary' : ''}>
							{player}
						</span>

						{#if $playersRolled.includes(player)}
							<span>✔️</span>
						{:else}
							<span>Waiting... ⏱️</span>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
		<div style="width: 100vw; height: 100svh;">
			{#if loading}
				<DiceApp></DiceApp>
			{/if}
		</div>

		{#if game}
			<GameControls bind:game></GameControls>
		{/if}
	{/if}
</main>
