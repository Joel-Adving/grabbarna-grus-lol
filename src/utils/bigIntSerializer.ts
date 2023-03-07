declare global {
  interface BigInt {
    toJSON(): number
  }
}

export const bigIntSerializer = () => {
  BigInt.prototype.toJSON = function () {
    return Number(this)
  }
}
