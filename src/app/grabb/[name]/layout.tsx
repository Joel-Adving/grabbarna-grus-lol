import FriendList from '@/components/FriendList'
import MainLayout from '@/components/MainLayout'
import NavLink, { NavLinkProps } from '@/components/NavLink'

export default function GrabbLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { name } = params

  const links = [
    {
      children: 'STATS',
      href: `/grabb/${name}/stats`,

      targetSegment: 'stats'
    },
    {
      children: 'MATCH HISTORY',
      href: `/grabb/${name}/matches`,

      targetSegment: 'matches'
    },
    {
      children: 'RANKED',
      href: `/grabb/${name}/ranked`,

      targetSegment: 'ranked'
    }
  ] as NavLinkProps[]

  return (
    <MainLayout>
      <div className="flex gap-8 text-text font-BeaufortBold">
        {links.map((link, i) => (
          <NavLink key={i} {...link} />
        ))}
      </div>

      {children}
    </MainLayout>
  )
}
