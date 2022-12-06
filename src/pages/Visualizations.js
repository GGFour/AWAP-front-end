import React from 'react'
import { Link } from 'react-router-dom'
function Visualizations() {
  return (
    <>
      <div className="visPage-body">
        <h2>Visualizations</h2>
        <div className="vis-container">
          <Link to="/n1view">Go to Vis1 - Vis7 and Vis10</Link>
          <Link to="/n2view">Go to Vis8 - Vis9</Link>
        </div>
      </div>
    </>
  )
}

export default Visualizations
