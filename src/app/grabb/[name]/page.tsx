import GrabbClient from './GrabbClient'

export const revalidate = 3600 // 1 hour

export default function GrusGrabb() {
  return (
    <>
      <GrabbClient />
    </>
  )
}
