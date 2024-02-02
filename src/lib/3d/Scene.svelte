<script lang="ts">
	import CylinderBoundary from './CylinderBoundary.svelte';
	import DiceEmitter from './DiceEmitter.svelte';
	import Table from './Table.svelte';
	import { T } from '@threlte/core';
	import { OrbitControls, AudioListener, useGltf } from '@threlte/extras';

	//preload this?
	useGltf('/gltfModels/dice/scene.gltf');
</script>

<T.DirectionalLight position={[2, 10, 5]} castShadow />
<T.DirectionalLight position={[-2, 8, 8]} castShadow />
<T.AmbientLight intensity={0.2}></T.AmbientLight>
<!-- rotation.y={-Math.PI / 2} -->
<!-- on:create={({ ref }) => {
		ref.lookAt(10, 0, 0);
	}} -->
<!--  -->
<T.PerspectiveCamera makeDefault position={[5, 10, 10]}>
	<OrbitControls
		enableDamping
		maxDistance={20}
		minDistance={1}
		minAzimuthAngle={-4 * Math.PI * (3 / 4)}
		maxAzimuthAngle={4 * Math.PI * (3 / 4)}
		minPolarAngle={0}
		maxPolarAngle={4 * Math.PI * (3 / 8)}
	/>
	<AudioListener />
</T.PerspectiveCamera>

<DiceEmitter></DiceEmitter>

<Table></Table>

<CylinderBoundary></CylinderBoundary>
