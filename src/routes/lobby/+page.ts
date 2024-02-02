import { userId } from '$lib/state/general';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { get } from 'svelte/store';

export const load = (async () => {
	if (!get(userId)) return redirect(300, '/');
	return {};
}) satisfies PageLoad;
