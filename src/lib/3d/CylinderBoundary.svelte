<script lang="ts">
	import { VerticalLineCurve } from '$lib/ts/VerticalLineCurve';
	import { T } from '@threlte/core';
	import { AutoColliders } from '@threlte/rapier';
	export let height: number = 8;
	export let radius: number = 8.4;
	export let visible = false;
</script>

<AutoColliders shape={'trimesh'} restitution={0.6}>
	<T.Mesh position.y={-0.5} {visible}>
		<!-- <T.CircleGeometry args={[10, 60]} /> -->
		<T.TubeGeometry args={[new VerticalLineCurve(height), 30, radius, 20]}></T.TubeGeometry>
		<T.MeshStandardMaterial color="0xFFFFFF" />
	</T.Mesh>
</AutoColliders>
