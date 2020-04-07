import { Router } from 'express';
import SteamService from '../services/steam';

const router = Router();

router.get('/player-steam-id', async function (req, res) {
	const {key, vanityurl, format} = req.query;

	let response = {};

	try {
		const service = new SteamService(key, format);
		const data = await service.getSteamId(vanityurl);

		response = {data: data.response};
	} catch (e) {
		console.error(e.response);
		response = {error: e.message};
		res.statusCode = 400;
	}

	res.json(response);
});

router.get('/player-summaries', async function (req, res) {
	const {key, steamids, format} = req.query;

	let response = {};

	try {
		const service = new SteamService(key, format);
		const data = await service.getPlayerSummaries(steamids);

		response = {data: data.response};
	} catch (e) {
		console.error(e.response);
		response = {error: e.message};
		res.statusCode = 400;
	}

	res.json(response);
});

router.get('/player-friend-list', async function (req, res) {
	const {key, steamid, format} = req.query;

	let response = {};

	try {
		const service = new SteamService(key, format);
    const data = await service.getPlayerFriendList(steamid);

		response = {data: data.friendslist};
	} catch (e) {
		console.error(e.response);
		response = {error: e.message};
		res.statusCode = 400;
	}

	res.json(response);
});

router.get('/player-bans', async function (req, res) {
	const {key, steamids, format} = req.query;

	let response = {};

	try {
		const service = new SteamService(key, format);
		const data = await service.getPlayerBans(steamids);

		response = {data: data.players};
	} catch (e) {
		console.error(e.response);
		response = {error: e.message};
		res.statusCode = 400;
	}

	res.json(response);
});

router.get('/user-group-list', async function (req, res) {
	const {key, steamid, format} = req.query;

	let response = {};

	try {
		const service = new SteamService(key, format);
    const data = await service.getUserGroupList(steamid);

		response = {data: data.response};
	} catch (e) {
		console.error(e.response);
		response = {error: e.message};
		res.statusCode = 400;
	}

	res.json(response);
});

router.get('/recently-played-games', async function (req, res) {
	const {key, steamid, count, format} = req.query;

	let response = {};

	try {
		const service = new SteamService(key, format);
    const data = await service.getRecentlyPlayedGames(steamid, count);

		response = {data: data.response};
	} catch (e) {
		console.error(e.response);
		response = {error: e.message};
		res.statusCode = 400;
	}

	res.json(response);
});

router.get('/owned-games', async function (req, res) {
	const {key, steamid, include_appinfo, include_played_free_games, format} = req.query;

	let response = {};

	try {
		const service = new SteamService(key, format);
    const data = await service.getOwnedGames(steamid, include_appinfo, include_played_free_games);

		response = {data: data.response};
	} catch (e) {
		console.error(e.response);
		response = {error: e.message};
		res.statusCode = 400;
	}

	res.json(response);
});

export default router;
