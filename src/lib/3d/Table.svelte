<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import { useTexture } from '@threlte/extras';
	// import { dicenum2rot, randDiceNumber, randRotation } from '$lib/utils/diceRotation';

	import { AutoColliders } from '@threlte/rapier';
</script>

{#await useTexture('/wood_texture.png') then texture}
	<AutoColliders shape={'trimesh'} restitution={0.3}>
		<!-- rotation.x={-Math.PI / 2} -->
		<T.Mesh position.y={-0.55}>
			<!-- <T.CircleGeometry args={[10, 60]} /> -->
			<T.CylinderGeometry args={[8, 8, 1, 50]}></T.CylinderGeometry>
			<T.MeshStandardMaterial map={texture} />
		</T.Mesh>
	</AutoColliders>
{/await}
