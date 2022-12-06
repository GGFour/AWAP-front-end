import React, { useState, useContext } from 'react'
import { UserAuthContext } from '../components/Contexts'
import PropTypes from 'prop-types'
import Vis1 from '../components/charts/Vis1.js'
import Vis3 from '../components/charts/Vis3.js'
import Vis4 from '../components/charts/Vis4.js'
import Vis5 from '../components/charts/Vis5.js'
import Vis6 from '../components/charts/Vis6.js'
import Vis7 from '../components/charts/Vis7.js'
import Vis8 from '../components/charts/Vis8.js'
import Vis9 from '../components/charts/Vis9.js'
import ChartWrapper from '../components/ChartWrapper.js'

import axios from 'axios'

const VISUALIZATIONS = [Vis1, Vis3, Vis4, Vis5, Vis6, Vis7, Vis8, Vis9]
const STD = VISUALIZATIONS.map(() => ({
  hidden: false,
}))
const URL = '/api/diy'

function DIYVisualizations({ configuration }) {
  const userAuthContextValue = useContext(UserAuthContext)
  const [config, setConfig] = useState(configuration || STD)
  const [viewAsGuest, setViewAsGuest] = useState(false)

  DIYVisualizations.propTypes = {
    configuration: PropTypes.object,
  }

  function saveText(data, idx) {
    let tempConfig = config
    tempConfig[idx].data = data
    setConfig(tempConfig)
  }

  function setHidden(idx) {
    let tempConfig = config
    tempConfig[idx].hidden = !tempConfig[idx].hidden
    setConfig(tempConfig)
  }

  function saveCustom() {
    // send config to server
    axios
      .post(
        `http://localhost:3000${URL}`,
        { configuration: config },
        {
          headers: { Authorization: 'Bearer ' + userAuthContextValue.jwt },
        }
      )
      .then((result) => {
        alert(`Successfully saved with id ${result.data.id}`)
        // redirect the guy to custom visualization view page (the same page, but with other url)
      })
      .catch((err) => alert(err))
  }

  return (
    <>
      <div className="visPage-body">
        <h2>Visualizations</h2>
        <button type="button" onClick={saveCustom}>
          Save My Visualization
        </button>
        <button type="button" onClick={() => setViewAsGuest(!viewAsGuest)}>
          {viewAsGuest ? 'To edit mode' : 'View as a guest'}
        </button>
        <div className="vis-container">
          {VISUALIZATIONS.map((Vis, idx) => (
            <ChartWrapper
              key={idx}
              authorized={userAuthContextValue.jwt != null && !viewAsGuest}
              hide={config[idx].hidden}
              hiddenCallback={() => setHidden(idx)}
              data={config[idx].data}
              dataCallback={(data) => saveText(data, idx)}
            >
              <Vis />
            </ChartWrapper>
          ))}
        </div>
      </div>
    </>
  )
}

export default DIYVisualizations
