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
                ResolveVanityURL: {version: 'v1'},
                GetFriendList: {version: 'v1'},
                GetPlayerBans: {version: 'v1'},
                GetUserGroupList: {version: 'v1'}
            },
            IPlayerService: {
              GetRecentlyPlayedGames: {version: 'v1'},
              GetOwnedGames: {version: 'v1'}
            }
        };
    }

    async getPlayerSummaries(steamids) {
        return await this.getData('ISteamUser', 'GetPlayerSummaries', {steamids});
    }

    async getPlayerBans(steamids) {
      return await this.getData('ISteamUser', 'GetPlayerBans', {steamids});
    }

    async getPlayerFriendList(steamid) {
      return await this.getData('ISteamUser', 'GetFriendList', {steamid});
    }

    async getUserGroupList(steamid) {
      return await this.getData('ISteamUser', 'GetUserGroupList', {steamid});
    }

    async getSteamId(vanityurl) {
        return await this.getData('ISteamUser', 'ResolveVanityURL', {vanityurl});
    }

    async getRecentlyPlayedGames(steamid, count = 0) {
      return await this.getData('IPlayerService', 'GetRecentlyPlayedGames', {steamid, count});
    }

    async getOwnedGames(steamid, include_appinfo = true, include_played_free_games = false) {
      return await this.getData('IPlayerService', 'GetOwnedGames', {steamid, include_appinfo, include_played_free_games});
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

        const {data} = await axios.get(url, {params});

        return data;
    }

    checkAction(i, m) {
        return i in this.allowedActions && m in this.allowedActions[i];
    }

    getUrl(i, m) {
        const version = this.allowedActions[i][m].version;

        return `${this.protocol}://${this.host}/${i}/${m}/${version}`;
    }
}
