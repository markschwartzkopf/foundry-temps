require('./hvserver');
import { promises as sensor } from 'node-dht-sensor';

//const sensor = require('node-dht-sensor').promises;
/* sensor
	.read(22, 2)
	.then((val) => {
		console.log(val);
	})
	.catch(console.error); */

getTempsForever().catch(console.error);

async function getTempsForever() {
	let time = Date.now();
	for (let i = 0; i < 5; i++) {
		const x = await sensor.read(22, 2).catch(console.error);
		console.log(x);
		if (x) {
			x.temperature = Math.round(x.temperature * 18) / 10 + 32;
			x.humidity = Math.round(x.humidity * 10) / 10;
		}
		console.log(x);
		const now = Date.now();
		console.log(now - time);
		await delay(1000).catch(console.error);
		time = now;
	}
}

function delay(ms: number) {
	return new Promise((res) => {
		setTimeout(res, ms);
	});
}
