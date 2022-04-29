export async function getJSON(url) {
    try {
        const res = await fetch(url)
        const data = await res.json()
        return data
    } catch (err) {
        console.log(err)
    }
}

export const sleep = milSecons =>
    new Promise(resolve => {
        setTimeout(resolve, milSecons)
    })

export const percentages = arr =>
    arr.reduce((el, i) => ({ ...el, [i]: Math.trunc((el[i] || 0) + 100 / arr.length) }), {})

export const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1)
