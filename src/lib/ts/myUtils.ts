export function isObjEmpty(obj: object) {
	return Object.keys(obj).length === 0;
}

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
