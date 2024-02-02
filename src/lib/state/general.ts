import { goto } from '$app/navigation';
import { PUBLIC_BE_URL } from '$env/static/public';
import { persisted } from 'svelte-persisted-store';
import { get, writable } from 'svelte/store';
import { errorToast } from '$lib/ts/toasts';
export const userId = persisted<string | null>('pacot_userid', null);
export const lobbyMessages = persisted<ChatMessage[]>('po_lobby_msgs', []);
export const user = writable<UserData | null>(null);
export const myGameLobby = persisted<GameLobby | null>('pacot_lobby_game', null);

export const logoutAndGoHome = async () => {
	userId.set(null);
	user.set(null);
	myGameLobby.set(null);

	localStorage.clear();
	await goto('/');
};

export const loadUserOrLogout = async () => {
	const res = await fetch(PUBLIC_BE_URL + '/lobby', {
		method: 'GET',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${get(userId)}`
		}
	});

	if (!res.ok) {
		const errorMsg = await res.text();
		errorToast(`Login failed: ${errorMsg}`);
		return await goto('/');
	}

	try {
		user.set(await res.json());
	} catch (error) {
		await logoutAndGoHome();
	}
};
