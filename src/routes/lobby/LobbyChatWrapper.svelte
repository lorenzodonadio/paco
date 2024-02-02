<script lang="ts">
	import LobbyChat from './LobbyChat.svelte';
	import { Button } from '$lib/shadcn/ui/button';
	import { PanelRightCloseIcon, PanelRightOpenIcon } from 'lucide-svelte';

	let showChat = true;
	// onMount(() => {
	// 	socket.onmessage = (e) => {
	// 		console.log('received from ws: ', e);
	// 		try {
	// 			const message = e.data;
	// 			console.log({ message });
	// 		} catch (error) {
	// 			console.error(error.message);
	// 		}
	// 	};
	// });
</script>

<div class="w-20 {showChat ? 'hidden' : 'block'}">
	<Button class="space-x-1" size="sm" variant="ghost" on:click={() => (showChat = true)}>
		<PanelRightOpenIcon size={16} />
		<p>Show</p>
	</Button>
</div>

<div class="w-full sm:max-w-lg {showChat ? 'block' : 'hidden'}">
	<div class="flex justify-between">
		<h3 class="h3">Chat</h3>

		<Button class="space-x-1" size="sm" variant="ghost" on:click={() => (showChat = false)}>
			<p>Hide</p>
			<PanelRightCloseIcon size={16} />
		</Button>
	</div>
	<LobbyChat on:message></LobbyChat>
</div>
