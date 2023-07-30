import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	console.log(data);
	const prayer = await fetchPrayer(data.city, data.country);
	const qibla = await fetchQibla(data.latitude, data.longitude);

	return json({ prayer, qibla });
};

async function fetchPrayer(city: string, country: string) {
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
