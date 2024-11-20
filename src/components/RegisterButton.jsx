import React from 'react'

export default function RegisterButton(props) {
    const {onClick} = props
  return (
    <button
    className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
    onClick={onClick}
  >
    + Register
  </button>
  )
}
