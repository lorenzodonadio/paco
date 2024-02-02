<script lang="ts">
	import { Button } from '$lib/shadcn/ui/button';
	import PaperPlane from '$lib/svg/PaperPlane.svelte';
	import { Textarea } from '$lib/shadcn/ui/textarea';
	export let message = '';

	let focus = false;

	$: focuscn = focus ? 'ring-primary-foreground' : 'ring-transparent';
</script>

<div class="{focuscn} w-full grid grid-cols-[1fr_auto] rounded-md overflow-clip ring-4">
	<div class="w-full">
		<Textarea
			class="min-h-[35px] max-h-40 h-10 rounded-r-none focus-visible:ring-0 ring-transparent ring-0"
			rows={0}
			on:blur={() => (focus = false)}
			on:focus={() => (focus = true)}
			bind:value={message}
			placeholder="your message"
		/>
	</div>

	<Button type="submit" class="text-lg rounded-l-none h-full"><PaperPlane /></Button>
</div>
