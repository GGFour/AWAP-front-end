import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import Vis1 from '../components/charts/Vis1.js'
import Vis3 from '../components/charts/Vis3.js'
import Vis4 from '../components/charts/Vis4.js'
import Vis5 from '../components/charts/Vis5.js'
import Vis6 from '../components/charts/Vis6.js'
import Vis7 from '../components/charts/Vis7.js'
import Vis8 from '../components/charts/Vis8.js'
import Vis9 from '../components/charts/Vis9.js'
import ChartWrapper from '../components/ChartWrapper.js'
import { UserAuthContext } from '../components/Contexts'

const VISUALIZATIONS = [Vis1, Vis3, Vis4, Vis5, Vis6, Vis7, Vis8, Vis9]
const STD = VISUALIZATIONS.map(() => ({
  hidden: false,
}))
const URL = '/custom/diy'

function DIYVisualizations({ isCustom }) {
  const userAuthContextValue = useContext(UserAuthContext)
  const [config, setConfig] = useState(STD)
  const [owner, setOwner] = useState(true)
  const [viewAsGuest, setViewAsGuest] = useState(false)
  const [splitViews, setSplitViews] = useState(false)

  DIYVisualizations.propTypes = {
    isCustom: PropTypes.bool,
  }

  useEffect(() => {
    if (isCustom) {
      let id = useParams().customId
      axios
        .get(`http://localhost:3000/${URL}?id=${id}`)
        .then((response) => {
          setConfig(response.data.configuration)
          if (
            userAuthContextValue.jwt != null &&
            getUsernameFromJwt(userAuthContextValue) == response.data.username
          ) {
            setOwner(true)
          } else {
            setOwner(false)
          }
        })
        .catch((err) => {
          alert(err.message)
        })
    }
  }, [])

  function getUsernameFromJwt(jwt) {
    return JSON.parse(atob(jwt.split('.')[0])).username
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

        <button type="button" onClick={() => setSplitViews(!splitViews)}>
          {splitViews ? 'Unsplit views' : 'Split views by 2 columns  '}
        </button>

        <div className="container">
          {VISUALIZATIONS.reduce(function (
            accumulator,
            currentValue,
            currentIndex,
            array
          ) {
            let divider = splitViews ? 2 : 1

            if (currentIndex % divider === 0) {
              accumulator.push(
                array.slice(currentIndex, currentIndex + divider)
              )
            }

            return accumulator
          },
          []).map((visPair, index) => {
            const VisFromPair1 = visPair[0]
            const confIndex1 = index * visPair.length
            const confIndex2 = confIndex1 + 1
            const VisFromPair2 = visPair[1]
            return (
              <>
                <div className="row align-items-top">
                  <div className="col">
                    <ChartWrapper
                      key={confIndex1}
                      authorized={
                        userAuthContextValue.jwt != null && !viewAsGuest
                      }
                      hide={config[confIndex1].hidden}
                      hiddenCallback={() => setHidden(confIndex1)}
                      data={config[confIndex1].data}
                      dataCallback={(data) => saveText(data, confIndex1)}
                    >
                      <VisFromPair1 />
                    </ChartWrapper>
                  </div>
                  {visPair.length === 2 ? (
                    <div className="col">
                      <ChartWrapper
                        key={confIndex2}
                        authorized={
                          userAuthContextValue.jwt != null && !viewAsGuest
                        }
                        hide={config[confIndex2].hidden}
                        hiddenCallback={() => setHidden(confIndex2)}
                        data={config[confIndex2].data}
                        dataCallback={(data) => saveText(data, confIndex2)}
                      >
                        <VisFromPair2 />
                      </ChartWrapper>
                    </div>
                  ) : null}
                </div>
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default DIYVisualizations
