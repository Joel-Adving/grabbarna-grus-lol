import { pool } from '@/lib/db'
import { Match, RankedStats, Summoner } from '@prisma/client'

type SummonerWithRankedStats = Summoner & {
  rankedStats: RankedStats[]
}

const summoners = {
  async findMany() {
    return (await pool.execute('SELECT * FROM db.Summoner ORDER BY name ASC'))[0] as Summoner[]
  },
  async findManyIncludeRankedStats() {
    const summoners = await this.findMany()
    const summonersWithRankedStats = await Promise.all(
      summoners.map(async (summoner) => {
        const [rankedStats] = await pool.execute(`SELECT * FROM db.RankedStats WHERE summonerId = ?`, [
          summoner.summonerId
        ])
        return { ...summoner, rankedStats }
      })
    )
    return summonersWithRankedStats as SummonerWithRankedStats[]
  },
  async findById(id: number) {
    return ((await pool.execute('SELECT * FROM db.Summoner WHERE id = ?', [id]))[0] as Summoner[])[0]
  },
  async findByNameIncludeRankedStats(name: string) {
    const summoner = await this.findByName(name)
    const summonerWithRankedStats = await pool.execute(`SELECT * FROM db.RankedStats WHERE summonerId = ?`, [
      summoner.summonerId
    ])
    return { ...summoner, rankedStats: summonerWithRankedStats[0] } as SummonerWithRankedStats
  },
  async findBySummonerId(summonerId: string) {
    return ((await pool.execute('SELECT * FROM db.Summoner WHERE summonerId = ?', [summonerId]))[0] as Summoner[])[0]
  },
  async findByName(name: string) {
    return ((await pool.execute('SELECT * FROM db.Summoner WHERE name = ?', [name]))[0] as Summoner[])[0]
  },
  async rankedStats(summonerId: string) {
    return (await pool.execute('SELECT * FROM db.RankedStats WHERE summonerId = ?', [summonerId]))[0] as RankedStats[]
  },
  async matches(id: number, limit: number, page: number = 1) {
    const offset = (page - 1) * limit
    return (
      await pool.execute(
        `SELECT m.* 
         FROM db.Match AS m
         INNER JOIN db._MatchToSummoner AS mts ON mts.a = m.id
         WHERE mts.b = ?
         ORDER BY m.date DESC
         LIMIT ?
         OFFSET ?`,
        [id, limit, offset]
      )
    )[0] as Match[]
  }
}

export const db = {
  summoners
}
