import { atom } from 'recoil'

const summonersState = atom({
    key: 'summonersState',
    default: [],
})

export { summonersState }
