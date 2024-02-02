<script lang="ts">
	import { onMount } from 'svelte';
	import { PUBLIC_BE_URL } from '$env/static/public';
	import { errorToast, successToast } from '$lib/ts/toasts';
	import { myGameLobby, user, userId } from '$lib/state/general';
	import DiceSpinner from '$lib/components/DiceSpinner.svelte';
	import Button from '$lib/shadcn/ui/button/button.svelte';
	import InviteDialog from '$lib/components/InviteDialog.svelte';
	import { delay, isObjEmpty } from '$lib/ts/myUtils';
	import Card from '$lib/shadcn/ui/card/card.svelte';
	import CardContent from '$lib/shadcn/ui/card/card-content.svelte';
	import CardHeader from '$lib/shadcn/ui/card/card-header.svelte';
	import DeleteDialog from '$lib/components/DeleteDialog.svelte';
	// export let data: PageData;
	let loading = false;

	const handleCreateGame = async () => {
		loading = true;
		const res = await fetch(PUBLIC_BE_URL + '/create_game', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${$userId}`
			}
		});

		loading = false;

		if (!res.ok) {
			const errorMsg = await res.text();
			return errorToast(`Error creating game: ${errorMsg}`);
		}

		const game = await res.json();

		$myGameLobby = isObjEmpty(game) ? null : game;

		successToast('Game Created');
	};

	const handleStart = async () => {
		if (!$myGameLobby) return;

		if ($myGameLobby.players.length <= 1)
			return errorToast('Invite at least another player to start the game');

		loading = true;
		const url = PUBLIC_BE_URL + `/game/${$myGameLobby.id}/start`;
		const res = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${$userId}`
			}
		});

		if (res.ok) {
			successToast('Starting soon...');
		} else {
			errorToast(`Error Starting Game: ${await res.text()}`);
		}

		loading = false;
	};

	const deleteGame = async () => {
		if (!$myGameLobby) return;

		if ($myGameLobby.players.length <= 1)
			return errorToast('Invite at least another player to start the game');

		loading = true;

		const url = PUBLIC_BE_URL + `/game/${$myGameLobby.id}/delete`;
		const res = await fetch(url, {
			method: 'DELETE',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${$userId}`
			}
		});

		if (res.ok) {
			successToast('Game Deleted');
		} else {
			errorToast(`Error Deleting Game: ${await res.text()}`);
		}

		loading = false;
	};
</script>

<div class="space-y-1">
	<Card>
		{#if loading}
			<div class="flex h-32 items-center justify-center">
				<DiceSpinner></DiceSpinner>
			</div>
		{:else if $myGameLobby != null}
			<CardHeader>
				<div class="flex justify-between">
					<h4 class="h4">Your Game</h4>
					<div class="my-auto flex space-x-2">
						<p>Created By: <strong>{$myGameLobby.created_by}</strong></p>
						{#if $myGameLobby.created_by === $user?.player_name}
							<DeleteDialog triggerMessage="Delete" on:delete={deleteGame}></DeleteDialog>
						{/if}
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div class="flex justify-between">
					<div class="w-full">
						<h5 class="h5">Players:</h5>
						<ul>
							{#each $myGameLobby.players as p}
								<li>{p}</li>
							{/each}
						</ul>
					</div>

					<div class="flex flex-col-reverse">
						{#if $myGameLobby.created_by === $user?.player_name}
							<Button on:click={handleStart} size="lg" class="text-lg">🎲 Start 🎲</Button>
						{/if}
					</div>
				</div>
			</CardContent>
			<!-- <pre>
			{JSON.stringify($myGameLobby, null, 1)}
		</pre> -->
		{:else}
			<CardHeader>
				<div class="flex space-x-4">
					<h4 class="h4">Create a Game to Invite Players</h4>
					<Button on:click={handleCreateGame}>Create Game 🎲</Button>
				</div>
			</CardHeader>
		{/if}
	</Card>

	<!-- <InviteDialog></InviteDialog> -->
</div>
