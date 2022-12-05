import React from 'react'
import Vis8 from '../components/charts/Vis8.js'
import Vis9 from '../components/charts/Vis9.js'

function N2View() {
  return (
    <div className="visPage-body">
      <div className="vis-container">
        <Vis8 />
        <Vis9 />
      </div>
    </div>
  )
}

export default N2View
