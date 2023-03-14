export interface User {
  email: string | null
  image?: string | null
  name?: string | null
}

export interface Summoner {
  accountId: string
  id: string
  name: string
  profileIconId: number
  puuid: string
  revisionDate: number
  summonerLevel: number
  rankedStats: Array<summonerRankInfo>
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
  metaData: MatchMetaData
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

export type Match = {
  id: number
  date: number
  matchId: string
  info: Info
  metaData: MetaData
}

type Info = {
  mapId: number
  teams: Team[]
  gameId: number
  queueId: number
  gameMode: string
  gameName: string
  gameType: string
  platformId: string
  gameVersion: string
  gameCreation: number
  gameDuration: number
  participants: Participant[]
  tournamentCode: string
  gameEndTimestamp: number
  gameStartTimestamp: number
}

type Team = {
  win: boolean
  bans: Ban[]
  teamId: number
  objectives: Objectives
}

type Ban = {
  pickTurn: number
  championId: number
}

type Objectives = {
  baron: Baron
  tower: Tower
  dragon: Dragon
  champion: Champion
  inhibitor: Inhibitor
  riftHerald: RiftHerald
}

type Baron = {
  first: boolean
  kills: number
}

type Tower = {
  first: boolean
  kills: number
}

type Dragon = {
  first: boolean
  kills: number
}

type Champion = {
  first: boolean
  kills: number
}

type Inhibitor = {
  first: boolean
  kills: number
}

type RiftHerald = {
  first: boolean
  kills: number
}

export type Participant = {
  win: boolean
  lane: string
  role: string
  item0: number
  item1: number
  item2: number
  item3: number
  item4: number
  item5: number
  item6: number
  kills: number
  perks: Perks
  puuid: string
  deaths: number
  teamId: number
  assists: number
  baitPings: number
  goldSpent: number
  holdPings: number
  nexusLost: number
  pushPings: number
  totalHeal: number
  allInPings: number
  baronKills: number
  basicPings: number
  challenges: Challenges
  champLevel: number
  championId: number
  goldEarned: number
  nexusKills: number
  pentaKills: number
  riotIdName: string
  summonerId: string
  timePlayed: number
  bountyLevel: number
  dangerPings: number
  doubleKills: number
  dragonKills: number
  profileIcon: number
  quadraKills: number
  spell1Casts: number
  spell2Casts: number
  spell3Casts: number
  spell4Casts: number
  summoner1Id: number
  summoner2Id: number
  tripleKills: number
  turretKills: number
  turretsLost: number
  unrealKills: number
  visionScore: number
  wardsKilled: number
  wardsPlaced: number
  championName: string
  commandPings: number
  getBackPings: number
  onMyWayPings: number
  summonerName: string
  teamPosition: string
  assistMePings: number
  killingSprees: number
  participantId: number
  riotIdTagline: string
  summonerLevel: number
  firstBloodKill: boolean
  firstTowerKill: boolean
  inhibitorKills: number
  inhibitorsLost: number
  itemsPurchased: number
  nexusTakedowns: number
  summoner1Casts: number
  summoner2Casts: number
  champExperience: number
  needVisionPings: number
  timeCCingOthers: number
  trueDamageDealt: number
  trueDamageTaken: number
  turretTakedowns: number
  enemyVisionPings: number
  firstBloodAssist: boolean
  firstTowerAssist: boolean
  largestMultiKill: number
  magicDamageDealt: number
  magicDamageTaken: number
  objectivesStolen: number
  totalDamageDealt: number
  totalDamageTaken: number
  totalTimeCCDealt: number
  totalUnitsHealed: number
  championTransform: number
  enemyMissingPings: number
  individualPosition: string
  inhibitorTakedowns: number
  totalMinionsKilled: number
  totalTimeSpentDead: number
  visionClearedPings: number
  damageSelfMitigated: number
  detectorWardsPlaced: number
  largestKillingSpree: number
  physicalDamageDealt: number
  physicalDamageTaken: number
  consumablesPurchased: number
  damageDealtToTurrets: number
  gameEndedInSurrender: boolean
  neutralMinionsKilled: number
  teamEarlySurrendered: boolean
  largestCriticalStrike: number
  totalHealsOnTeammates: number
  damageDealtToBuildings: number
  eligibleForProgression: boolean
  longestTimeSpentLiving: number
  sightWardsBoughtInGame: number
  damageDealtToObjectives: number
  objectivesStolenAssists: number
  visionWardsBoughtInGame: number
  gameEndedInEarlySurrender: boolean
  trueDamageDealtToChampions: number
  magicDamageDealtToChampions: number
  totalDamageDealtToChampions: number
  physicalDamageDealtToChampions: number
  totalDamageShieldedOnTeammates: number
}

type Perks = {
  styles: Style[]
  statPerks: StatPerks
}

type Style = {
  style: number
  selections: Selection[]
  description: string
}

type Selection = {
  perk: number
  var1: number
  var2: number
  var3: number
}

type StatPerks = {
  flex: number
  defense: number
  offense: number
}

type Challenges = {
  kda: number
  soloKills: number
  takedowns: number
  bountyGold: number
  doubleAces: number
  gameLength: number
  multikills: number
  abilityUses: number
  buffsStolen: number
  perfectGame: number
  flawlessAces: number
  hadOpenNexus: number
  quickCleanse: number
  snowballsHit: number
  wardsGuarded: number
  earliestBaron: number
  goldPerMinute: number
  skillshotsHit: number
  unseenRecalls: number
  wardTakedowns: number
  baronTakedowns: number
  legendaryCount: number
  maxKillDeficit: number
  mythicItemUsed: number
  poroExplosions: number
  quickSoloKills: number
  soloBaronKills: number
  teamBaronKills: number
  damagePerMinute: number
  dragonTakedowns: number
  lostAnInhibitor: number
  turretTakedowns: number
  fastestLegendary: number
  fullTeamTakedown: number
  initialBuffCount: number
  initialCrabCount: number
  outnumberedKills: number
  pickKillWithAlly: number
  quickFirstTurret: number
  scuttleCrabKills: number
  skillshotsDodged: number
  epicMonsterSteals: number
  killParticipation: number
  multiKillOneSpell: number
  saveAllyFromDeath: number
  takedownsInAlcove: number
  turretPlatesTaken: number
  controlWardsPlaced: number
  stealthWardsPlaced: number
  '12AssistStreakCount': number
  acesBefore15Minutes: number
  deathsByEnemyChamps: number
  earliestElderDragon: number
  killsUnderOwnTurret: number
  riftHeraldTakedowns: number
  teamRiftHeraldKills: number
  dancedWithRiftHerald: number
  killsNearEnemyTurret: number
  outnumberedNexusKill: number
  teamDamagePercentage: number
  teamElderDragonKills: number
  visionScorePerMinute: number
  elderDragonMultikills: number
  takedownOnFirstTurret: number
  earliestDragonTakedown: number
  takedownsFirstXMinutes: number
  wardTakedownsBefore20M: number
  enemyJungleMonsterKills: number
  jungleCsBefore10Minutes: number
  killAfterHiddenWithAlly: number
  landSkillShotsEarlyGame: number
  perfectDragonSoulsTaken: number
  tookLargeDamageSurvived: number
  alliedJungleMonsterKills: number
  maxLevelLeadLaneOpponent: number
  takedownsInEnemyFountain: number
  effectiveHealAndShielding: number
  immobilizeAndKillWithAlly: number
  knockEnemyIntoTeamAndKill: number
  laneMinionsFirst10Minutes: number
  playedChampSelectPosition?: number
  threeWardsOneSweeperCount: number
  completeSupportQuestInTime: number
  dodgeSkillShotsSmallWindow: number
  multiTurretRiftHeraldCount: number
  survivedSingleDigitHpCount: number
  turretsTakenWithRiftHerald: number
  damageTakenOnTeamPercentage: number
  laningPhaseGoldExpAdvantage: number
  moreEnemyJungleThanOpponent: number
  thirdInhibitorDestroyedTime?: number
  enemyChampionImmobilizations: number
  killsWithHelpFromEpicMonster: number
  maxCsAdvantageOnLaneOpponent: number
  twentyMinionsIn3SecondsCount: number
  epicMonsterStolenWithoutSmite: number
  blastConeOppositeOpponentCount: number
  multikillsAfterAggressiveFlash: number
  killsOnRecentlyHealedByAramPack: number
  survivedThreeImmobilizesInFight: number
  earlyLaningPhaseGoldExpAdvantage: number
  elderDragonKillsWithOpposingSoul: number
  epicMonsterKillsNearEnemyJungler: number
  takedownsBeforeJungleMinionSpawn: number
  visionScoreAdvantageLaneOpponent: number
  kTurretsDestroyedBeforePlatesFall: number
  outerTurretExecutesBefore10Minutes: number
  killsOnOtherLanesEarlyJungleAsLaner?: number
  takedownsAfterGainingLevelAdvantage: number
  killedChampTookFullTeamDamageSurvived: number
  epicMonsterKillsWithin30SecondsOfSpawn: number
  junglerTakedownsNearDamagedEpicMonster: number
  getTakedownsInAllLanesEarlyJungleAsLaner?: number
  controlWardTimeCoverageInRiverOrEnemyHalf?: number
  killingSprees?: number
  highestWardKills?: number
  highestChampionDamage?: number
  junglerKillsEarlyJungle?: number
  killsOnLanersEarlyJungleAsJungler?: number
  soloTurretsLategame?: number
  highestCrowdControlScore?: number
  firstTurretKilledTime?: number
  baronBuffGoldAdvantageOverThreshold?: number
  fasterSupportQuestCompletion?: number
}

type MetaData = {
  matchId: string
  dataVersion: string
  participants: string[]
}
