import axios from 'axios';

export default class SteamService {
    constructor(key, format = 'json') {
        if (!key) {
            throw Error('Steam service requires credentials');
        }

        this.account = {key};

        this.format = format;
        this.host = 'api.steampowered.com';
        this.protocol = 'https';

        this.allowedActions = {
            ISteamUser: {
                GetPlayerSummaries: {version: 'v2'},
                ResolveVanityURL: {version: 'v1'}
            }
        };
    }

    async getPlayerSummaries(steamids) {
        return await this.getData('ISteamUser', 'GetPlayerSummaries', {steamids});
    }

    async getSteamId(vanityurl) {
        return await this.getData('ISteamUser', 'ResolveVanityURL', {vanityurl});
    }

    async getData(i, m, options = {}) {
        if (!this.checkAction(i, m)) {
            throw Error('Unknown Steam action');
        }

        const url = this.getUrl(i, m);
        const params = {
            ...this.account,
            ...options
        };

        const {data: {response}} = await axios.get(url, {params});

        return response;
    }

    checkAction(i, m) {
        return i in this.allowedActions && m in this.allowedActions[i];
    }

    getUrl(i, m) {
        const version = this.allowedActions[i][m].version;

        return `${this.protocol}://${this.host}/${i}/${m}/${version}`;
    }
}
