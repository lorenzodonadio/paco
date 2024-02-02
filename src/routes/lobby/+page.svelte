<script lang="ts">
	import LobbyGameInvites from './LobbyGameInvites.svelte';
	import LobbyGame from './LobbyGame.svelte';
	import LobbyPlayers from './LobbyPlayers.svelte';
	import LobbyChatWrapper from './LobbyChatWrapper.svelte';
	import { onMount } from 'svelte';
	import { errorToast, neutralToast } from '$lib/ts/toasts';
	import { loadUserOrLogout, lobbyMessages, myGameLobby, user, userId } from '$lib/state/general';
	import { goto } from '$app/navigation';
	import DiceSpinner from '$lib/components/DiceSpinner.svelte';
	import * as Avatar from '$lib/shadcn/ui/avatar';
	import { WS_BE_URL } from '$lib/ts/wsConn';

	// export let data: PageData;
	let loading = true;
	let socket: WebSocket;
	let lobbyUsers: UserDataPub[] = [];
	let lobbyInvites: GameInvite[] = [];
	const sendChatMessage = (msg: ChatMessage) => {
		if (!socket) return;
		try {
			socket.send(JSON.stringify({ k: 'msg', d: msg }));
		} catch (error) {
			errorToast('Error sending message');
		}
	};

	const handleLobbyWsMessage = (e: MessageEvent) => {
		// console.log('received from ws: ', e);
		try {
			const msg: LobbyMessage = JSON.parse(e.data);
			// console.log('received from ws: ', msg);

			switch (msg.k) {
				case 'lobby_users':
					lobbyUsers = msg.d as UserDataPub[];
					break;
				case 'msg':
					lobbyMessages.update((x) => [msg.d as ChatMessage, ...x]);
					break;
				case 'invite':
					const invite = msg.d as GameInvite;
					// Find the index of the invite with the same game_id, if it exists
					const index = lobbyInvites.findIndex((i) => i.game_id === invite.game_id);
					if (index !== -1) {
						// Replace the old invite with the new one
						lobbyInvites[index] = invite;
					} else {
						// Add the invite to the array if it doesn't exist
						lobbyInvites = [invite, ...lobbyInvites];
					}
					console.log('Received invite:', invite);
					// Handle the invite as needed
					break;

				case 'game_update':
					const game = msg.d as GameLobby;
					$myGameLobby = game;
					break;
				case 'delete':
					$myGameLobby = null;
					neutralToast('The Current Lobby Game has been deleted');
					break;
				case 'start':
					neutralToast('Les Pacots! is starting');
					goto(`/pacot/${$myGameLobby?.id}`);
					break;
				default:
					break;
			}
		} catch (error) {
			if (error instanceof Error) console.error(error.message);
		}
	};
	onMount(async () => {
		await loadUserOrLogout();

		try {
			socket = new WebSocket(`${WS_BE_URL}/ws/lobby?userId=${$userId}`);
			socket.onmessage = handleLobbyWsMessage;
		} catch (error) {
			if (error instanceof Error) console.error(error.message);
		}

		loading = false;
	});
</script>

<main class="container px-1 sm:px-8">
	<div class="mb-2 flex justify-between border-b py-2 sm:mb-4">
		<h1 class="h1 text-primary">Lobby</h1>
		{#if $user}
			<Avatar.Root>
				<!-- <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" /> -->
				<Avatar.Fallback class="bg-niagara-50 dark:bg-niagara-800">
					<span class="text-primary">{$user.user_name.slice(0, 2).toUpperCase()}</span>
				</Avatar.Fallback>
			</Avatar.Root>
		{/if}
	</div>
	{#if loading}
		<DiceSpinner></DiceSpinner>
	{:else}
		<div class="mx-auto w-full sm:max-w-5xl sm:px-2">
			<div class="w-full space-y-2 pb-2">
				<LobbyGame></LobbyGame>
				<LobbyGameInvites bind:lobbyInvites></LobbyGameInvites>
			</div>

			<div class="block w-full gap-1.5 px-1 sm:flex">
				<div class="w-full">
					<LobbyPlayers bind:lobbyUsers></LobbyPlayers>
				</div>

				<LobbyChatWrapper on:message={(e) => sendChatMessage(e.detail)}></LobbyChatWrapper>
			</div>
			<!-- <pre>
			{JSON.stringify(lobbyUsers, null, 1)}
		</pre> -->
		</div>
	{/if}
</main>
