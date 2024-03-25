<script lang="ts">
	import { Slider } from '$lib/shadcn/ui/slider';
	export let min = 0;
	export let max = 100;
	export let value: number[] | undefined;
</script>

<div class="pb-2 pt-0.5">
	<Slider bind:value bind:max bind:min step={1} />
</div>
