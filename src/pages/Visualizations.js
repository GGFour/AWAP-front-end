import React from 'react'
import Vis1 from '../components/charts/Vis1.js'
import Vis3 from '../components/charts/Vis3.js'
import Vis4 from '../components/charts/Vis4.js'
import Vis5 from '../components/charts/Vis5.js'
import Vis6 from '../components/charts/Vis6.js'
import Vis7 from '../components/charts/Vis7.js'
import Vis8 from '../components/charts/Vis8.js'
import Vis9 from '../components/charts/Vis9.js'

function Visualizations() {
  return (
    <>
      <div className="visPage-body">
        <h2>Visualizations</h2>
        <div className="vis-contianer">
          <Vis1 />
          <Vis3 />
          <Vis4 />
          <Vis5 />
          <Vis6 />
          <Vis7 />
          <Vis8 />
          <Vis9 />
        </div>
      </div>
    </>
  )
}

export default Visualizations
