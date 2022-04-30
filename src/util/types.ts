export interface User {
    uid: string
    email: string | null
    photoURL?: string | null
    name?: string | null
}

export interface UserContext {
    user: User
    signin: () => void
    logout: () => void
    error: string | null
    isPending: boolean
}

export interface Summoner {
    accountId: string
    id: string
    name: string
    profileIconId: number
    puuid: string
    revisionDate: number
    summonerLevel: number
}

export interface summonerRankInfo {
    freshBlood: boolean
    hotStreak: boolean
    inactive: boolean
    leagueId: string
    leaguePoints: number
    losses: number
    queueType: string
    rank: string
    summonerId: string
    summonerName: string
    tier: string
    veteran: boolean
    wins: number
}

export interface SummonersInfo {
    summoners: Array<Summoner>
    ranks: Array<summonerRankInfo>
}

export interface PageInfo {
    totalResults: number
    resultsPerPage: number
}

export interface Snippet {
    channelId: string
    channelTitle: string
    description: string
    playlistId: string
    position: number
    publishedAt: string
    resourceId: any
    thumbnails: any
    title: string
    videoOwnerChannelId: string
    videoOwnerChannelTitle: string
}

export interface PlaylistItem {
    etag: string
    id: string
    kind: string
    snippet: Snippet
}

export interface Playlist {
    etag: string
    items: Array<PlaylistItem>
    kind: string
    pageInfo: PageInfo
}

export interface MatchInfo {
    gameCreation: number
    gameDuration: number
    gameEndTimestamp: number
    gameId: number
    gameMode: string
    gameName: string
    gameStartTimestamp: number
    gameType: string
    gameVersion: string
    mapId: number
    participants: Array<any>
    platformId: string
    queueId: number
    teams: Array<any>
    tournamentCode: string
}

export interface MatchMetaData {
    dataVersion: string
    matchId: string
    participants: Array<string>
}

export interface LeagueMatch {
    info: MatchInfo
    metadata: MatchMetaData
}

export interface SummonerAndRank {
    summoner: summonerRankInfo
    rank: summonerRankInfo
}

export interface PlayerStats {
    assists: number
    baronKills: number
    bountyLevel: number
    challenges: any
    champExperience: number
    champLevel: number
    championId: number
    championName: string
    championTransform: number
    consumablesPurchased: number
    damageDealtToBuildings: number
    damageDealtToObjectives: number
    damageDealtToTurrets: number
    damageSelfMitigated: number
    deaths: number
    detectorWardsPlaced: number
    doubleKills: number
    dragonKills: number
    firstBloodAssist: boolean
    firstBloodKill: boolean
    firstTowerAssist: boolean
    firstTowerKill: boolean
    gameEndedInEarlySurrender: boolean
    gameEndedInSurrender: boolean
    goldEarned: number
    goldSpent: number
    individualPosition: string
    inhibitorKills: number
    inhibitorTakedowns: number
    inhibitorsLost: number
    item0: number
    item1: number
    item2: number
    item3: number
    item4: number
    item5: number
    item6: number
    itemsPurchased: number
    killingSprees: number
    kills: number
    lane: string
    largestCriticalStrike: number
    largestKillingSpree: number
    largestMultiKill: number
    longestTimeSpentLiving: number
    magicDamageDealt: number
    magicDamageDealtToChampions: number
    magicDamageTaken: number
    neutralMinionsKilled: number
    nexusKills: number
    nexusLost: number
    nexusTakedowns: number
    objectivesStolen: number
    objectivesStolenAssists: number
    participantId: number
    pentaKills: number
    perks: any
    physicalDamageDealt: number
    physicalDamageDealtToChampions: number
    physicalDamageTaken: number
    profileIcon: number
    puuid: string
    quadraKills: number
    riotIdName: string
    riotIdTagline: string
    role: string
    sightWardsBoughtInGame: number
    spell1Casts: number
    spell2Casts: number
    spell3Casts: number
    spell4Casts: number
    summoner1Casts: number
    summoner1Id: number
    summoner2Casts: number
    summoner2Id: number
    summonerId: string
    summonerLevel: number
    summonerName: string
    teamEarlySurrendered: boolean
    teamId: number
    teamPosition: string
    timeCCingOthers: number
    timePlayed: number
    totalDamageDealt: number
    totalDamageDealtToChampions: number
    totalDamageShieldedOnTeammates: number
    totalDamageTaken: number
    totalHeal: number
    totalHealsOnTeammates: number
    totalMinionsKilled: number
    totalTimeCCDealt: number
    totalTimeSpentDead: number
    totalUnitsHealed: number
    tripleKills: number
    trueDamageDealt: number
    trueDamageDealtToChampions: number
    trueDamageTaken: number
    turretKills: number
    turretTakedowns: number
    turretsLost: number
    unrealKills: number
    visionScore: number
    visionWardsBoughtInGame: number
    wardsKilled: number
    wardsPlaced: number
    win: boolean
}
