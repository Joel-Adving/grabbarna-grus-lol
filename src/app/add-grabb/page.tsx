'use client'

import { NextPage } from 'next'
import { useAddGrabb } from '../../hooks/useAddGrabb'

export const AddSummoner: NextPage = () => {
  const { message, loading, summonerName, handleSubmit, handleInputChange } = useAddGrabb()

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

export default AddSummoner
