import { PUBLIC_BE_URL } from '$env/static/public';

export const WS_BE_URL = PUBLIC_BE_URL.replace('https', 'wss').replace('http', 'ws');
