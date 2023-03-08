'use client'

import { useAddGrabb } from '../../hooks/useAddGrabb'

export default function AddSummoner() {
  //   const { user } = useAuth()
  const { message, loading, summonerName, handleSubmit, handleInputChange } = useAddGrabb()

  //   if (!user || user.name !== 'Joel Adving') return null

  return null

  return (
    <section className="container text-text font-BeaufortBold">
      <h1>Add Summoner</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-start">
        <input
          className="text bg-background border-[1px] border-neutral-700"
          type="text"
          value={summonerName}
          onChange={handleInputChange}
          placeholder="Summoner name"
          required
        />
        {message && <p>{message}</p>}
        {!loading && <button>SUBMIT</button>}
        {loading && <button disabled>LOADING</button>}
      </form>
    </section>
  )
}
