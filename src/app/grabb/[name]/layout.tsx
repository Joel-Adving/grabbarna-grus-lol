import MainLayout from '@/components/MainLayout'
import NavLink, { NavLinkProps } from '@/components/NavLink'

export default function GrabbLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const { name } = params

  const links: NavLinkProps[] = [
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
  ]

  return (
    <MainLayout className="p-0 m-0">
      <div className="max-w-[740px]">
        <div className="flex gap-8 px-4 py-4 mx-auto text-text font-BeaufortBold sm:px-0">
          {links.map((link, i) => (
            <NavLink key={i} {...link} />
          ))}
        </div>
        {children}
      </div>
    </MainLayout>
  )
}
