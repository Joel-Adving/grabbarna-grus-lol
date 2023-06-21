export async function getSummoners() {
  try {
    const res = await fetch(`${process.env.API_URL}/summoners`)
    return await res.json()
  } catch (err) {}
}
