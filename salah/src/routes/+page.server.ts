import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const ip = event.getClientAddress();
	console.log(ip);
};
