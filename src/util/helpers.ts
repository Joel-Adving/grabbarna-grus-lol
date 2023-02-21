export async function getJSON(url: string) {
  try {
    const res = await fetch(url)
    const data = await res.json()
    return data
  } catch (e) {
    console.log(e)
  }
}

export const sleep = (milSecons: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, milSecons)
  })

export const percentages = (arr: Array<any>) =>
  arr.reduce((el, i) => ({ ...el, [i]: Math.trunc((el[i] || 0) + 100 / arr.length) }), {})

export const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1)
