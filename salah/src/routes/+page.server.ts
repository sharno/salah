import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const ip = event.getClientAddress();
	console.log(ip);
};

export const actions: Actions = {
	async default({ request }) {
		const data = await request.json();
		console.log(data);
		const timings = await fetchTimings(data.city, data.country);
		const qibla = await fetchQibla(data.latitude, data.longitude);

		return { timings, qibla };
	}
};

async function fetchTimings(city: string, country: string) {
	const url = `https://api.aladhan.com/v1/timingsByCity/29-07-2023?city=${city}&country=${country}`;
	const res = await fetch(url);
	const { data } = await res.json();
	return data;
}

async function fetchQibla(latitude: number, longitude: number) {
	const url = `https://api.aladhan.com/v1/qibla/${latitude}/${longitude}`;
	const res = await fetch(url);
	const { data } = await res.json();
	return data;
}
