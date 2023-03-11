export const swrConfig = {
  dedupingInterval: 3600000, // one hour
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  provider: () => new Map()
}
