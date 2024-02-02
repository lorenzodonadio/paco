<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { Gizmo, Grid, HTML, Sky } from '@threlte/extras';
	import { Debug, World, useRapier } from '@threlte/rapier';
	import Scene from './Scene.svelte';

	let debug = false;
</script>

<!-- size={{ width: 200, height: 200 }} -->

<Canvas>
	<World>
		<Scene />
		<HTML slot="fallback" transform>
			<p>
				It seems your browser<br />
				doesn't support WASM.<br />
				I'm sorry.
			</p>
		</HTML>

		{#if debug}
			<Debug></Debug>
			<Gizmo></Gizmo>
			<Grid sectionColor={'#ff3e00'} sectionThickness={1} cellColor={'#cccccc'} gridSize={20} />
		{/if}
	</World>
</Canvas>
