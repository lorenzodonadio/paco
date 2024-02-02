import toast from 'svelte-french-toast';

export const errorToast = (message: string) => {
	toast.error(message, { duration: 3000, style: 'background: #1A2730; color: #FF7F7F;' });
};
export const successToast = (message: string) => {
	//
	toast.success(message, {
		duration: 3000,
		style: 'background: #1A2730; color: #7fffd4;'
	});
};

export const neutralToast = (message: string, icon: string | null = null) => {
	let opts: any = { duration: 3000, style: 'background: #1A2730; color: #ffffff;' };
	if (icon) opts['icon'] = icon;
	toast(message, opts);
};
