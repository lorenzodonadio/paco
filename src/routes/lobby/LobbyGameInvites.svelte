<script lang="ts">
	import { PUBLIC_BE_URL } from '$env/static/public';
	import { errorToast, successToast } from '$lib/ts/toasts';
	import { logoutAndGoHome, user, userId } from '$lib/state/general';

	import Button from '$lib/shadcn/ui/button/button.svelte';
	import DiceSpinner from '$lib/components/DiceSpinner.svelte';
	import * as Card from '$lib/shadcn/ui/card';

	// export let data: PageData;
	let loading = false;
	export let lobbyInvites: GameInvite[] = [];

	const deleteInvite = (gameId: string) => {
		lobbyInvites = lobbyInvites.filter((x) => x.game_id != gameId);
	};

	const acceptInvite = async (gameId: string) => {
		if (!$user) return logoutAndGoHome();

		loading = true;
		// console.log('ACCEPT: ', gameId);
		const url = PUBLIC_BE_URL + `/game/${gameId}/accept_invite?player_name=${$user.player_name}`;
		const res = await fetch(url, {
			method: 'PUT',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${$userId}`
			}
		});

		loading = false;
		if (!res.ok) {
			const errorMsg = await res.text();
			return errorToast(errorMsg);
		}
		successToast('Accepted Invite');
		deleteInvite(gameId);
		// console.log('RES ACCEPT INVITE');
	};
</script>

{#if lobbyInvites.length > 0}
	<Card.Root>
		<Card.Header>
			<h4 class="h4">Invites</h4>
		</Card.Header>
		<Card.Content>
			<ul class="max-h-80 divide-y overflow-y-auto">
				{#if loading}
					<DiceSpinner></DiceSpinner>
				{:else}
					{#each lobbyInvites as i (i.game_id)}
						<li class="flex justify-between">
							<div class="">
								<p>From: <strong>{i.from}</strong></p>
								<small>At: {new Date(i.at).toLocaleTimeString()}</small>
							</div>
							<div class="my-auto pr-2">
								<Button on:click={() => acceptInvite(i.game_id)}>Accept</Button>
								<Button on:click={() => deleteInvite(i.game_id)} variant="destructive"
									>Refuse</Button
								>
							</div>
						</li>
					{/each}
				{/if}
			</ul>
		</Card.Content>
	</Card.Root>
{/if}
