export const getJSON = async url => {
    try {
        const res = await fetch(url)
        const data = await res.json()
        return data
    } catch (error) {
        return error
    }
}

export const sleep = milSecons =>
    new Promise(resolve => {
        setTimeout(resolve, milSecons)
    })

export const percentages = arr =>
    arr.reduce((el, i) => ({ ...el, [i]: Math.trunc((el[i] || 0) + 100 / arr.length) }), {})
