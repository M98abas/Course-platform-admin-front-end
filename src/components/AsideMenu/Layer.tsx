import React from 'react'
import { mdiLogout } from '@mdi/js'
import AsideMenuItem from './Item'
import AsideMenuList from './List'
import { MenuAsideItem } from '../../interfaces'
import { useAppSelector } from '../../stores/hooks'
import Cookies from 'js-cookie'
import Router from 'next/router'
type Props = {
  menu: MenuAsideItem[]
  className?: string
  onAsideLgCloseClick: () => void
}

export default function AsideMenuLayer({ menu, className = '', ...props }: Props) {
  const asideStyle = useAppSelector((state) => state.style.asideStyle)
  const asideBrandStyle = useAppSelector((state) => state.style.asideBrandStyle)
  const asideScrollbarsStyle = useAppSelector((state) => state.style.asideScrollbarsStyle)
  const darkMode = useAppSelector((state) => state.style.darkMode)

  const logoutItem: MenuAsideItem = {
    label: 'Logout',
    icon: mdiLogout,
    color: 'info',
    isLogout: true,
  }

  const handleAsideLgCloseClick = async (e: React.MouseEvent) => {
    await Cookies.remove('token')
    Router.push('/login')
    e.preventDefault()
    props.onAsideLgCloseClick()
  }

  return (
    <aside
      className={`${className} zzz lg:py-2 lg:pl-2 w-60 fixed flex z-40 top-0 h-screen transition-position overflow-hidden`}
    >
      <div
        className={`lg:rounded-2xl flex-1 flex flex-col overflow-hidden dark:bg-slate-900 ${asideStyle}`}
      >
        <div
          className={`flex flex-row h-14 items-center justify-between dark:bg-slate-900 ${asideBrandStyle}`}
        >
          <div className="flex-1 text-center lg:text-left lg:pl-6 xl:text-center xl:pl-0">
            <b className="font-black">Xeenon LTD</b>
          </div>
        </div>
        <div
          className={`flex-1 overflow-y-auto overflow-x-hidden ${
            darkMode ? 'aside-scrollbars-[slate]' : asideScrollbarsStyle
          }`}
        >
          <AsideMenuList menu={menu} />
        </div>
        <ul onClick={handleAsideLgCloseClick}>
          <AsideMenuItem item={logoutItem} />
        </ul>
      </div>
    </aside>
  )
}
