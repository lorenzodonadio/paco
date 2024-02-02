<script lang="ts">
	import DiceSpinner from '$lib/components/DiceSpinner.svelte';

	import { goto } from '$app/navigation';
	import { PUBLIC_BE_URL } from '$env/static/public';
	import { lobbyMessages, userId } from '$lib/state/general';
	import { errorToast, neutralToast, successToast } from '$lib/ts/toasts';
	import { onMount } from 'svelte';
	import { Button } from '$lib/shadcn/ui/button';
	import { Input } from '$lib/shadcn/ui/input';
	import * as Card from '$lib/shadcn/ui/card';

	let name = '';
	let loading = true;
	const handleLogin = async () => {
		loading = true;
		try {
			const res = await fetch(PUBLIC_BE_URL + '/login', {
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${$userId}`
				},
				body: JSON.stringify({ name: name.trim() })
			});

			if (!res.ok) {
				const errorMsg = await res.text();
				return errorToast(`Login failed: ${errorMsg}`);
			}
			const userData = await res.json();
			userId.set(userData.id); // Assuming the response contains the id
			neutralToast(`Welcome! ${name}`, '🎲');
			await goto('/lobby');
		} catch (error) {
			console.error('Login error:', error);
			// @ts-ignore
			errorToast(`An error occurred: ${error.message}`);
		} finally {
			loading = false;

			$lobbyMessages = [];
		}
	};

	onMount(async () => {
		if ($userId) {
			neutralToast('Welcome back!', '🎲');
			await goto('/lobby');
		}
		loading = false;
	});
</script>

<main class="container flex h-full min-h-screen justify-center">
	<Card.Root class="my-auto w-full max-w-lg p-8">
		<Card.Header>
			<Card.Title class="h1 text-primary">Les pacots</Card.Title>
			<Card.Description class="h4">c'est des mensonges</Card.Description>
			<!-- <h1 class="h1 text-primary">Les pacots</h1>
			<h4 class="h4">c'est des mensonges</h4> -->
		</Card.Header>
		<Card.Content class="space-y-2">
			<!-- <h1 class="h1 text-primary">Les pacots</h1>
			<h4 class="h4">c'est des mensonges</h4> -->
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, voluptatibus et.
				Accusantium, temporibus vitae! Dolores voluptatum numquam quaerat ipsum aliquid in dicta ab
				maxime commodi tempore, voluptas ducimus eius! Inventore.
			</p>

			{#if loading}
				<DiceSpinner></DiceSpinner>
			{:else}
				<form class="flex justify-center pt-4" on:submit|preventDefault={handleLogin}>
					<div class="w-full max-w-md space-y-4">
						<Input
							class="text-xl"
							type="text"
							bind:value={name}
							on:input={() => (name = name.trim())}
							placeholder="Your user name"
							minlength={4}
							maxlength={18}
							required={true}
						/>
						<Button class="w-full text-xl text-primary-foreground" size="lg" type="submit"
							>Play 🎲🎲</Button
						>
						<!-- <input
					type="text"
					bind:value={name}
					placeholder="Your user name"
					minlength="4"
					maxlength="18"
					required={true}
					/> -->
						<!-- <button >Play</button> -->
					</div>
				</form>
			{/if}
		</Card.Content>
	</Card.Root>
</main>
