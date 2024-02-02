<script lang="ts">
	export let selected: number | null = null;
</script>

<div class="flex flex-wrap gap-2 px-2">
	{#each [1, 2, 3, 4, 5, 6] as n}
		{@const isSel = selected === n}
		<button
			on:click={() => (selected = n)}
			class="{isSel
				? 'opacity-100 ring ring-primary'
				: 'opacity-40 ring-0'} h-9 w-9 overflow-clip rounded-sm shadow-lg"
		>
			<img class="h-9 w-9 object-cover" alt="{n}_dice" src="/diceFaces/{n}.png" />
		</button>
	{/each}
</div>
