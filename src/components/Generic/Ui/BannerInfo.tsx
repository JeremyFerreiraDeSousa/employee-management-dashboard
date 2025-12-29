'use client'

import { useState } from 'react'

type BannerType = 'info' | 'error'

interface BannerProps {
  show?: boolean
  msg: string
  type: BannerType
}

export default function BannerInfo({ show = true, msg, type }: BannerProps) {
  const [isVisible, setIsVisible] = useState(show)

  if (!isVisible) return null

  const typeBg: Record<BannerType, string> = {
    info: 'bg-blue-500',
    error: 'bg-red-500'
  }

  return (
    <div
      onClick={() => setIsVisible(false)}
      className={`${typeBg[type]} relative bg-blue-500 text-white cursor-pointer p-2 rounded-md shadow-md flex items-center justify-between w-full my-5`}
    >
      <p className="text-base">{msg}</p>
      <button
        onClick={() => setIsVisible(false)}
        className="ml-4 text-xl text-white cursor-pointer focus:outline-none"
        aria-label="Close banner"
      >
        &times;
      </button>
    </div>
  )
}
