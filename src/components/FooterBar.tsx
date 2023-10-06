import React, { ReactNode } from 'react'
import { containerMaxW } from '../config'

type Props = {
  children: ReactNode
}

export default function FooterBar({ children }: Props) {
  const year = new Date().getFullYear()

  return (
    <footer className={`py-2 px-6 ${containerMaxW}`}>
      <div className="items-center justify-between block md:flex">
        <div className="mb-6 text-center md:text-left md:mb-0">
          <b>
            &copy;{year},{` `}
            <a href="xeenon.online" rel="noreferrer" target="_blank">
              Xeenon LTD
            </a>
            .
          </b>
          {` `}
          <span>No Stop .. No Limit</span>
          {` `}
        </div>
        <div className="md:py-2"></div>
      </div>
    </footer>
  )
}
