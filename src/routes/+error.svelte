<script>
	import { page } from '$app/stores';
	import { Button } from '$lib/shadcn/ui/button';
</script>

<div class="flex min-h-screen items-center justify-center">
	<div class="w-full max-w-md space-y-4">
		<div>
			<h3 class="h3 text-center">Oops! An error occurred</h3>
		</div>
		<div>
			<h2 class="h2 text-center text-destructive-foreground">
				{$page.status}
				{$page.error?.message}
			</h2>
		</div>
		<div class="text-center">
			<a href="/">
				<Button>Home</Button>
			</a>
		</div>
	</div>
</div>
