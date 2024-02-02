<script lang="ts">
	import GameControls from './GameControls.svelte';
	import { page } from '$app/stores';
	import { loadUserOrLogout, user, userId } from '$lib/state/general';
	import { neutralToast } from '$lib/ts/toasts';
	import { WS_BE_URL } from '$lib/ts/wsConn';
	import { onDestroy, onMount } from 'svelte';
	import DiceApp from '$lib/3d/DiceApp.svelte';
	import { diceAmount, gameState, resetDiceState } from '$lib/state/dice';
	import Card from '$lib/shadcn/ui/card/card.svelte';
	import { Button } from '$lib/shadcn/ui/button';

	// export let data;

	let socket: WebSocket;
	let onlinePlayers: string[] = [];
	let game: PacotGamePublic | null = null;
	let bidMessage = '';
	let endMessage: string | null = null;
	const handleGameWsMessage = (e: MessageEvent) => {
		try {
			const msg: WsGameMessage = JSON.parse(e.data);
			console.log(msg);
			switch (msg.k) {
				case 'online_players':
					onlinePlayers = msg.d;
					break;

				case 'st_change':
					game = msg.d;
					neutralToast('⏱️ ' + game.st + ' ⏱️');
					const damount = game.pls.find((x) => x.p_name === $user?.player_name)?.n_dice;

					if (msg.d.st === 'turnStart') gameState.set('start');

					if (damount) $diceAmount = damount;
					break;

				case 'new_bid':
					if (!game) return;
					game = msg.d;
					bidMessage = `${game.cb.pn} Bids ${game.cb.bid[0]} x ${game.cb.bid[1]}`;
					neutralToast('🎲 ' + bidMessage + ' 🎲');
					break;

				case 'exacto':
					neutralToast('EXACTOOO  ' + msg.d + ' ⚠️🎲');
					break;

				case 'lost_dice':
					// Assuming you want to handle lost_dice similarly to exacto but adjust as necessary
					neutralToast('🎲 LOST DICE  ' + msg.d.p_name + ' 🎲');
					break;

				case 'turn_end':
					// Handle end of turn, e.g., updating game state, UI notifications
					console.log('🏁 Turn ended', msg.d);
					break;

				case 'lost_player':
					// Handle a player losing, e.g., removing them from UI, notifications
					neutralToast('😢 Player out: ' + msg.d + ' 😢');
					break;

				case 'game_end':
					// Handle game end, e.g., declaring winner, resetting game state
					neutralToast('Game ended Winner is ' + msg.d);
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
		<div style="width: 100vw; height: 100vh;">
			<DiceApp></DiceApp>
		</div>

		{#if game}
			<GameControls bind:game></GameControls>
		{/if}
	{/if}
</main>
