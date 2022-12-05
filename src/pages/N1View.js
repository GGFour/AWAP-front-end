import React from 'react'
import Vis1 from '../components/charts/Vis1.js'
import Vis3 from '../components/charts/Vis3.js'
import Vis4 from '../components/charts/Vis4.js'
import Vis5 from '../components/charts/Vis5.js'
import Vis6 from '../components/charts/Vis6.js'
import Vis7 from '../components/charts/Vis7.js'

function N1View() {
  return (
    <div className="visPage-body">
      <div className="vis-container">
        <Vis1 />
        <Vis3 />
        <Vis4 />
        <Vis5 />
        <Vis6 />
        <Vis7 />
      </div>
    </div>
  )
}

export default N1View
