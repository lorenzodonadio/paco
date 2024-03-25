<script lang="ts">
	import { groupDiceByFaceUp, rollResult } from '$lib/state/dice';
</script>

<div class="diceResult">
	{#each Object.entries(groupDiceByFaceUp($rollResult)) as [f, v]}
		{@const src = `/diceFaces/${f}.png`}
		<div class="resCont">
			<p>{v + 'x '}</p>
			<img alt="{v}x{f}" {src} />
		</div>
	{/each}
</div>

<style>
	img {
		object-fit: contain;
		height: 2rem;
		width: 2rem;
		border-radius: 0.5rem;
		box-shadow: 2rem;
	}

	.resCont {
		padding-right: 6px;
		font-weight: 600;
		display: flex;
	}
	.diceResult {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 2rem;
	}
</style>
