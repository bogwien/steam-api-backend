import { Router } from 'express';
import SteamService from '../services/steam';

const router = Router();

router.get('/player-steam-id', async function (req, res, next) {
	const {key, vanityurl, format} = req.query;

	let response = {};

	try {
		const service = new SteamService(key, format);
		const data = await service.getSteamId(vanityurl);

		response = {data};
	} catch (e) {
		console.error(e);
		response = {error: e.message};
		res.statusCode = 400;
	}

	res.json(response);
});

router.get('/player-summaries', async function (req, res, next) {
	const {key, steamids, format} = req.query;

	let response = {};

	try {
		const service = new SteamService(key, format);
		const data = await service.getPlayerSummaries(steamids);

		response = {data};
	} catch (e) {
		console.error(e);
		response = {error: e.message};
		res.statusCode = 400;
	}

	res.json(response);
});

export default router;
