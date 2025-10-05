import React from 'react'
import { Outlet } from 'react-router-dom'

function GlobalLayout() {
  return (
    <div><Outlet/></div>
  )
}

export default GlobalLayout