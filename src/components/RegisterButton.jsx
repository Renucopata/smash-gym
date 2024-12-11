import React from 'react'

export default function RegisterButton(props) {
    const {onClick} = props
  return (
    <button
    className="font-jaro fixed bottom-4 right-4 bg-[#0bae90] text-white p-4 rounded-full shadow-lg hover:bg-emerald-300"
    onClick={onClick}
  >
    + Register
  </button>
  )
}
