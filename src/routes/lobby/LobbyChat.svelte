<script lang="ts">
	import Chat from '$lib/components/Chat.svelte';
	import { lobbyMessages, logoutAndGoHome, user } from '$lib/state/general';
	import * as Avatar from '$lib/shadcn/ui/avatar';
	import { getRelTimeString } from '$lib/ts/relTimeString';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	const dispatch = createEventDispatcher();
	let message = '';
	let refreshChatDate = Date.now();
	const sendMessage = () => {
		if (!$user) return logoutAndGoHome();
		if (message === '') return;
		const newMessage: ChatMessage = {
			msg: message,
			from: $user.player_name,
			name: $user.user_name,
			at: Date.now()
		};
		dispatch('message', newMessage);
		message = '';
	};

	onMount(() => {
		const inter = setInterval(() => (refreshChatDate = Date.now()), 30000);

		return () => clearInterval(inter);
	});
</script>

<div class="max-h-92 flex flex-col-reverse gap-2 overflow-y-auto py-2 pr-2 text-sm sm:text-base">
	{#each $lobbyMessages as m}
		<!-- <div class="">
			<p>{m.msg}</p>
		</div> -->
		<!-- class="bg-niagara-700" -->
		{#if m.from === $user?.player_name}
			<div class="grid grid-cols-[1fr_auto] gap-1.5 shadow-sm">
				<div
					class="space-y-1 rounded-md rounded-tr-none border-primary-foreground bg-niagara-50 p-1.5 dark:bg-niagara-800"
				>
					<header class="flex items-center justify-between">
						{#key refreshChatDate}
							<small class="opacity-50">{getRelTimeString(m.at)}</small>
						{/key}
						<div class="flex space-x-2 font-bold">
							<p class="text-primary">{m.from}</p>
							<p>{m.name}</p>
						</div>
					</header>
					<p class="max-h-40 overflow-y-auto whitespace-pre-wrap">{m.msg}</p>
				</div>

				<div class="">
					<Avatar.Root>
						<!-- <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" /> -->
						<Avatar.Fallback class="bg-niagara-50 dark:bg-niagara-800">
							<span class="text-primary">{m.name.slice(0, 2).toUpperCase()}</span>
						</Avatar.Fallback>
					</Avatar.Root>
				</div>
			</div>
		{:else}
			<div class="grid grid-cols-[auto_1fr] gap-1.5 shadow-sm">
				<div class="">
					<Avatar.Root>
						<!-- <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" /> -->
						<Avatar.Fallback>
							<span class="text-primary">{m.name.slice(0, 2).toUpperCase()}</span>
						</Avatar.Fallback>
					</Avatar.Root>
				</div>
				<div
					class="space-y-1 rounded-md rounded-tl-none border-primary-foreground bg-zinc-50 p-1.5 dark:bg-niagara-900"
				>
					<header class="flex items-center justify-between">
						<div class="flex space-x-2 font-bold">
							<p class="text-primary">{m.from}</p>
							<p>{m.name}</p>
						</div>
						{#key refreshChatDate}
							<small class="opacity-50">{getRelTimeString(m.at)}</small>
						{/key}
					</header>
					<p class="max-h-40 overflow-y-auto whitespace-pre-wrap">{m.msg}</p>
				</div>
			</div>
		{/if}
	{/each}
</div>
<form on:submit|preventDefault={sendMessage}>
	<Chat bind:message></Chat>
</form>
