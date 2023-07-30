<script lang="ts">
	import { onMount } from 'svelte';

	let city = 'Providence';
	let country = 'US';
	let latitude = 0;
	let longitude = 0;

	let prayer: any = null;
	let qibla: any = null;
	async function updateLocation() {
		const ip = await fetch('https://ipapi.co/json/');
		const ipjson = await ip.json();
		city = ipjson.city;
		country = ipjson.country;
		latitude = ipjson.latitude;
		longitude = ipjson.longitude;
		return ipjson;
	}

	onMount(() => {
		updateLocation()
			.then((json) => fetch('/api/data', { method: 'post', body: JSON.stringify(json) }))
			.then((res) => res.json())
			.then((data) => {
				prayer = data.prayer;
				qibla = data.qibla;
			});
	});
</script>

<main>
	{#if prayer}
		<p>Date: {prayer.date.readable}</p>
		<table>
			<thead>
				<tr>
					<th>Prayer</th>
					<th>Time</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Fajr</td>
					<td>{prayer.timings.Fajr}</td>
				</tr>
				<tr>
					<td>Sunrise</td>
					<td>{prayer.timings.Sunrise}</td>
				</tr>
				<tr>
					<td>Dhuhr</td>
					<td>{prayer.timings.Dhuhr}</td>
				</tr>
				<tr>
					<td>Asr</td>
					<td>{prayer.timings.Asr}</td>
				</tr>
				<tr>
					<td>Maghrib</td>
					<td>{prayer.timings.Maghrib}</td>
				</tr>
				<tr>
					<td>Isha</td>
					<td>{prayer.timings.Isha}</td>
				</tr>
			</tbody>
		</table>
		<p>
			Method: <mark>{prayer.meta.method.name}</mark>
		</p>
	{:else}
		<p>Loading...</p>
	{/if}

	{#if qibla}
		<p>
			Qibla Direction: <mark>{qibla.direction.toFixed(2)}</mark>
		</p>
	{/if}

	<section>
		<form
			on:submit={(e) => {
				e.preventDefault();
				// fetchTimings(city, country).then((res) => (prayer = res));
			}}
		>
			<p>
				<label for="city">City</label>
				<input id="city" name="city" bind:value={city} />
			</p>
			<p>
				<label for="country">Country</label>
				<input id="country" name="county" bind:value={country} />
			</p>
			<p>This part changes the prayer times only, not the Qibla</p>
			<p>
				<button type="submit">Change</button>
			</p>
		</form>
	</section>
</main>
