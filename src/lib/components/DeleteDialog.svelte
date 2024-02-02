<script lang="ts">
	import * as AlertDialog from '$lib/shadcn/ui/alert-dialog';
	import Button from '$lib/shadcn/ui/button/button.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let title = 'Are you absolutely sure?';
	export let message =
		'This action cannot be undone. This will permanently delete and disband your party';
	export let triggerMessage = 'Open';
	export let btnText = 'Delete';
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger>
		<Button variant="destructive">{triggerMessage}</Button>
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>{title}</AlertDialog.Title>
			<AlertDialog.Description>
				{message}
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action
				class="bg-destructive text-destructive-foreground hover:bg-destructive/80"
				on:click={() => dispatch('delete')}
			>
				{btnText}
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
