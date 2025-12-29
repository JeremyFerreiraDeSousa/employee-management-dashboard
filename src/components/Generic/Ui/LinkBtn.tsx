import React from 'react'
import Link from 'next/link'
interface ButtonProps {
  url: string
  txt: string
}

export default function submitBtn({ url, txt }: ButtonProps) {
  return (
    <Link
      href={url}
      className="w-max py-4 px-6 flex items-center justify-center mt-4 mx-auto h-11 rounded-xl cursor-pointer text-white bg-red-400 border-b-4 border-red-500 hover:bg-red-500 disabled:bg-gray-300 disabled:border-gray-300 disabled:cursor-not-allowed transition-all"
    >
      {txt}
    </Link>
  )
}
