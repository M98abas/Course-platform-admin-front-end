import {
  mdiMonitor,
  mdiTicketPercent,
  mdiAccountCreditCard,
  mdiAdvertisements,
  mdiAccountGroup,
  mdiBookEducation,
  mdiHandshake,
  mdiLock,
  mdiMessageAlert,
  mdiBellBadge,
  mdiForum,
  mdiPercent,
  mdiSpider,
  mdiBullhorn,
} from '@mdi/js'
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/',
    icon: mdiMonitor,
    label: 'Dashboard',
  },
  {
    href: '/constractors',
    label: 'Constractors',
    icon: mdiAccountGroup,
  },
  {
    href: '/course',
    label: 'Course',
    icon: mdiBookEducation,
  },
  {
    href: '/enrollment',
    label: 'Enrolled',
    icon: mdiHandshake,
  },
  {
    href: '/copon',
    label: 'Copon',
    icon: mdiTicketPercent,
  },
  {
    href: '/discount',
    label: 'Discount',
    icon: mdiPercent,
  },
  {
    href: '/payments',
    label: 'Payments',
    icon: mdiAccountCreditCard,
  },
  {
    href: '/ads',
    label: 'Ads',
    icon: mdiAdvertisements,
  },
  {
    href: '/venomdata',
    label: 'Venom',
    icon: mdiSpider,
  },
  {
    href: '/announcements',
    label: 'FUDED ACCOUNT Ads',
    icon: mdiBullhorn,
  },
  {
    href: '/token',
    label: 'Token',
    icon: mdiLock,
  },
  {
    href: '/notification',
    label: 'Notification',
    icon: mdiBellBadge,
  },
  {
    href: '/sendSMS',
    label: 'Direct message',
    icon: mdiAdvertisements,
  },
  {
    href: '/commonQuestion',
    label: 'CommonQuestion',
    icon: mdiForum,
  },
  {
    href: '/feedback',
    label: 'Feedback',
    icon: mdiMessageAlert,
  },
]

export default menuAside
