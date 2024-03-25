import { persisted } from 'svelte-persisted-store';

export const onlinePlayers = persisted<string[]>('pacot_onlineplayers', []);
export const playersRolled = persisted<string[]>('pacot_playersrolled', []);
