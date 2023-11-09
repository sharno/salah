import { useEffect, useState } from "react";

function fetchTimings(city: string, country: string) {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const url = `https://api.aladhan.com/v1/timingsByCity/${day}-${month}-${year}?city=${city}&country=${country}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => res.data);
}

function fetchQibla(latitude: string, longitude: string) {
  const url = `https://api.aladhan.com/v1/qibla/${latitude}/${longitude}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => res.data);
}

export default function PrayerTimes() {
  const [data, setData] = useState<null | any>(null);
  const [qibla, setQibla] = useState<null | any>(null);
  const [city, setCity] = useState("Providence");
  const [country, setCountry] = useState("US");

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((res) => {
        setCity(res.city);
        setCountry(res.country);
        fetchQibla(res.latitude, res.longitude).then(setQibla);
        fetchTimings(res.city, res.country).then(setData);
      });
  }, []);

  return (
    <>
      {!data ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Date: {data.date.readable}</p>
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
                <td>{data.timings.Fajr}</td>
              </tr>
              <tr>
                <td>Sunrise</td>
                <td>{data.timings.Sunrise}</td>
              </tr>
              <tr>
                <td>Dhuhr</td>
                <td>{data.timings.Dhuhr}</td>
              </tr>
              <tr>
                <td>Asr</td>
                <td>{data.timings.Asr}</td>
              </tr>
              <tr>
                <td>Maghrib</td>
                <td>{data.timings.Maghrib}</td>
              </tr>
              <tr>
                <td>Isha</td>
                <td>{data.timings.Isha}</td>
              </tr>
            </tbody>
          </table>
          <p>
            Method: <mark>{data.meta.method.name}</mark>
          </p>
        </>
      )}
      {qibla ? (
        <p>
          Qibla Direction: <mark>{qibla.direction.toFixed(2)}</mark>
        </p>
      ) : null}

      <section>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchTimings(city, country).then(setData);
          }}
        >
          <p>
            <label htmlFor="city">City</label>
            <input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </p>
          <p></p>
          <label htmlFor="country">Country</label>
          <input
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />

          <p>
            <button type="submit">Change</button>
          </p>
        </form>
      </section>
    </>
  );
}
