<div style="height: 12px; display: flex; justify-content: center;">
	<div style="height: 4px; width:4px;" class="spin-element">
		<span>🎲</span>
	</div>
</div>

<!-- cubic-bezier(0.42, 0.2, 0.58, 0) -->

<style>
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.spin-element {
		animation: spin 1.5s linear infinite;
	}
</style>
