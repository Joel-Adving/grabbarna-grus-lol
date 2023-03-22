export const API_PLAYLIST_URL = 'https://www.googleapis.com/youtube/v3/playlistItems'
export const LEAGUE_CDN = 'http://ddragon.leagueoflegends.com/cdn/13.5.1'
export const authRequired = ['/add-grabb']

export const leagueTiers: Record<string, number> = {
  GRANDMASTER: 1,
  MASTER: 2,
  DIAMOND: 3,
  PLATINUM: 4,
  GOLD: 5,
  SILVER: 6,
  BRONZE: 7,
  IRON: 8,
  UNRANKED: 9
}

export const leagueRanks: Record<string, number> = {
  I: 1,
  II: 2,
  III: 3,
  IV: 4,
  V: 5
}

export const rankColors: Record<string, string> = {
  GRANDMASTER: 'defeat',
  MASTER: 'experience',
  DIAMOND: 'indigo-300',
  PLATINUM: 'teal-600',
  GOLD: 'yellow-500',
  SILVER: 'gray-400',
  BRONZE: 'border',
  IRON: 'border-dark',
  UNRANKED: 'text'
}

export const queueTypes: Record<string, string> = {
  RANKED_FLEX_SR: 'RANKED FLEX',
  RANKED_SOLO_5x5: 'SOLO/DUO QUEUE',
  RANKED_TFT_PAIRS: 'TFT'
}

export const summonerSpells: Record<number, string> = {
  1: 'SummonerBoost',
  3: 'SummonerExhaust',
  4: 'SummonerFlash',
  6: 'SummonerHaste',
  7: 'SummonerHeal',
  11: 'SummonerSmite',
  12: 'SummonerTeleport',
  13: 'SummonerMana',
  14: 'SummonerDot',
  21: 'SummonerBarrier',
  30: 'SummonerPoroRecall',
  31: 'SummonerPoroThrow',
  32: 'SummonerSnowball',
  39: 'SummonerSnowURFSnowball_Mark',
  54: 'Summoner_UltBookPlaceholder',
  55: 'Summoner_UltBookSmitePlaceholder'
}

export const grusGrabbar: string[] = [
  'Reeduns',
  'Bumbiiz',
  'DoomGladiator',
  'TheLewenhaupt',
  'Forssa',
  'smashdude1',
  'Exmortius',
  'ChimpNE',
  'darkeningday',
  'TEEEMO',
  'Loot',
  'Spex8',
  'Leo36737',
  'xXitsyaboiXx',
  'Pappenos'
]
