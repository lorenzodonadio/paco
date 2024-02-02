<script lang="ts">
	export let dialog: HTMLDialogElement;
	export let title: string | null = null;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialog} on:close on:click={() => dialog.close()}>
	<article style="max-width: 462px;" on:click|stopPropagation>
		{#if title}
			<header>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<span on:click={() => dialog.close()} aria-label="Close" class="close"></span>
				<p>{title}</p>
			</header>
		{/if}
		<slot />
	</article>
</dialog>
