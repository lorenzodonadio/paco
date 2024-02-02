<script lang="ts">
	import { Button } from '$lib/shadcn/ui/button';
	import * as Avatar from '$lib/shadcn/ui/avatar';
	import { Check, UserPlusIcon } from 'lucide-svelte';
	import { logoutAndGoHome, myGameLobby, user, userId } from '$lib/state/general';
	import { errorToast } from '$lib/ts/toasts';
	import { PUBLIC_BE_URL } from '$env/static/public';

	export let lobbyUsers: UserDataPub[] = [];

	const handleInvitePlayer = async (playerName: string) => {
		if (!$user) return logoutAndGoHome();
		if (!$myGameLobby) return errorToast('Create a Game First');

		const body: GameInvite = {
			from: $user.player_name,
			to: playerName,
			game_id: $myGameLobby.id,
			at: Date.now()
		};
		const url = PUBLIC_BE_URL + '/invite_to_game';
		const res = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${$userId}`
			},
			body: JSON.stringify(body)
		});

		if (!res.ok) {
			const errorMsg = await res.text();
			return errorToast(`Error creating game: ${errorMsg}`);
		}
	};
</script>

<div class="flex justify-between pr-6">
	<h4 class="h4">{lobbyUsers.length} online players</h4>
	<!-- <p class="pt-2">{lobbyUsers.length} Online</p> -->
</div>
<div class="max-h-80 min-h-[80px] overflow-y-auto pb-4">
	{#each lobbyUsers as player (player.player)}
		{#if player.player != $user?.player_name}
			<div class="flex justify-between px-1 pt-2 sm:px-2">
				<div class="flex space-x-2">
					<Avatar.Root>
						<!-- <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" /> -->
						<Avatar.Fallback class="bg-niagara-50 dark:bg-niagara-800">
							<span class="text-primary">{player.name.slice(0, 2).toUpperCase()}</span>
						</Avatar.Fallback>
					</Avatar.Root>

					<div class="">
						<p class="text-primary">{player.player}</p>
						<p>{player.name}</p>
					</div>
				</div>

				{#if $myGameLobby}
					{#if $myGameLobby.players.includes(player.player)}
						<span class="text-primary">
							<Check></Check>
						</span>
					{:else}
						<Button variant="ghost" on:click={() => handleInvitePlayer(player.player)}>
							<p class="flex gap-2"><UserPlusIcon size={20} /> Invite 🎲</p>
						</Button>
					{/if}
				{/if}
			</div>
		{/if}
	{/each}
</div>
