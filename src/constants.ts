export const API_PLAYLIST_URL = 'https://www.googleapis.com/youtube/v3/playlistItems'
export const LEAGUE_CDN = 'http://ddragon.leagueoflegends.com/cdn/13.15.1'
export const authRequired = ['/add-grabb'] as const

export const leagueTiers = {
  GRANDMASTER: 1,
  MASTER: 2,
  DIAMOND: 3,
  EMERALD: 4,
  PLATINUM: 5,
  GOLD: 6,
  SILVER: 7,
  BRONZE: 8,
  IRON: 9,
  UNRANKED: 10
} as const

export const leagueRanks = {
  I: 1,
  II: 2,
  III: 3,
  IV: 4,
  V: 5
} as const

export const rankColors = {
  GRANDMASTER: 'defeat',
  MASTER: 'experience',
  DIAMOND: 'indigo-300',
  PLATINUM: 'teal-600',
  GOLD: 'yellow-500',
  SILVER: 'gray-400',
  BRONZE: 'border',
  IRON: 'border-dark',
  UNRANKED: 'text'
} as const

export const queueTypes = {
  RANKED_FLEX_SR: 'RANKED FLEX',
  RANKED_SOLO_5x5: 'SOLO/DUO QUEUE',
  RANKED_TFT_PAIRS: 'TFT'
} as const

export const summonerSpells = {
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
  55: 'Summoner_UltBookSmitePlaceholder',
  2201: 'SummonerCherryHold',
  2202: 'SummonerCherryFlash'
} as const

export const matchHistorySelectOptions = [
  { value: 'date', label: 'Date' },
  { value: 'kills', label: 'Kills' },
  { value: 'deaths', label: 'Deaths' },
  { value: 'assists', label: 'Assists' },
  { value: 'kda', label: 'K/D/A' },
  { value: 'totalDamageDealt', label: 'Damage' },
  { value: 'totalDamageDealtToChampions', label: 'Damage To Champions' },
  { value: 'gameLength', label: 'Game Length' },
  { value: 'championId', label: 'Champion' },
  { value: 'goldEarned', label: 'Gold' },
  { value: 'soloKills', label: 'Solo Kills' },
  { value: 'pentaKills', label: 'Penta Kills' },
  { value: 'totalHeal', label: 'Total Healed' },
  { value: 'totalMinionsKilled', label: 'Minions Killed' },
  { value: 'skillshotsDodged', label: 'Skillshots Dodged' },
  { value: 'snowballsHit', label: 'Snowballs Hit' }
]
