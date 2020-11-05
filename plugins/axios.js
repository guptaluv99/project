import https from 'https';

export default function ({ $axios, redirect }) {
	$axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });
}