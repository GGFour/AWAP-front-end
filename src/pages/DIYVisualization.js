import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useNavigate, useParams } from 'react-router-dom'
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

const VISUALIZATIONS = [Vis1, Vis3, Vis4, Vis5, Vis6, Vis7, Vis8, Vis9].map(
  (Vis, idx) => ({ vis: Vis, idx: idx })
)
/**
 * Configuration Structure:
 * {
 *   username: string,
 *   split: bool,
 *   visconf: {
 *     id: int,
 *     hidden: bool,
 *     data: str
 *   }[]
 * }
 */
const STD = {
  // username: '',
  split: false,
  visconf: VISUALIZATIONS.map((vis) => ({
    id: vis.idx,
    hidden: false,
  })),
}

const URL = '/api/custom'

/**
 * This function is huge, heavy, overloaded, should be refactored, I'm lazy
 * @returns JSX object
 */
function DIYVisualizations({ isCustom }) {
  const urlParams = useParams()
  const navigate = useNavigate()
  const userAuthContextValue = useContext(UserAuthContext)

  const [config, setConfig] = useState(STD)
  const [isOwner, setIsOwner] = useState()
  const [owner, setOwner] = useState('')
  const [viewAsGuest, setViewAsGuest] = useState(false)
  const [splitViews, setSplitViews] = useState(false)

  DIYVisualizations.propTypes = {
    isCustom: PropTypes.bool,
  }

  useEffect(() => {
    if (isCustom) {
      let id = urlParams.customId
      axios
        .get(`http://localhost:3000${URL}?id=${id}`)
        .then((response) => {
          // alert(JSON.stringify(response.data, null, 2))
          let tmpConf = {
            split: response.data.configuration.split,
            // username: response.data.username,
            visconf: response.data.configuration.visconf,
          }
          setConfig(tmpConf)
          setOwner(response.data.username)
        })
        .catch((err) => {
          alert(err.response.data?.message)
        })
    } else {
      setIsOwner(true)
    }
  }, [isCustom])

  useEffect(() => {
    // setOwner(config.username)
    setSplitViews(config.split)
  }, [config])

  useEffect(() => {
    if (!isCustom) {
      setIsOwner(true)
      return
    }
    if (JWTPayload(userAuthContextValue.jwt)?.user?.username == owner) {
      setIsOwner(true)
    } else {
      setIsOwner(false)
    }
  }, [owner, isCustom])

  function JWTPayload(jwt) {
    if (!jwt) {
      return null
    }
    return JSON.parse(atob(jwt.split('.')[1]))
  }

  function saveText(data, idx) {
    let tempConfig = { ...config }
    tempConfig.visconf[idx].data = data
    setConfig(tempConfig)
  }
  function setHidden(idx) {
    let tempConfig = { ...config }
    tempConfig.visconf[idx].hidden = !tempConfig.visconf[idx].hidden
    setConfig(tempConfig)
  }
  function split() {
    let tmpSplit = !splitViews
    setSplitViews(tmpSplit)
    let tmpConf = { ...config }
    tmpConf.split = tmpSplit
    setConfig(tmpConf)
  }

  function saveCustom() {
    // send config to server
    // alert(JSON.stringify(config, null, 2))
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
        navigate(`/custom/${result.data.id}`)
      })
      .catch((err) => alert(err.response.data?.message))
  }

  if (!isCustom && userAuthContextValue.jwt == null) {
    return <h1>You need to login first to create custom visualization</h1>
  }

  function filterVisByConfig(visualizations, configuration) {
    return visualizations.filter((vis) => !configuration[vis.idx].hidden)
  }
  function splitVisBy1or2(visualizations, split) {
    let divider = split ? 2 : 1
    return visualizations.reduce(function (
      accumulator,
      currentValue,
      currentIndex,
      array
    ) {
      if (currentIndex % divider === 0) {
        accumulator.push(array.slice(currentIndex, currentIndex + divider))
      }
      return accumulator
    },
    [])
  }
  function generateVisualizations(visualizations, configuration) {
    const filtered = filterVisByConfig(visualizations, configuration.visconf)
    const splited = splitVisBy1or2(
      isOwner ? visualizations : filtered,
      splitViews
    )
    return splited.map((visPair) => {
      return (
        <>
          <div className="row align-items-top">
            {visPair.map((vis) => {
              const Vis = vis.vis
              return (
                <>
                  <div className="col">
                    <ChartWrapper
                      authorized={!viewAsGuest && isOwner}
                      hide={configuration.visconf[vis.idx].hidden}
                      hiddenCallback={() => setHidden(vis.idx)}
                      data={configuration.visconf[vis.idx].data}
                      dataCallback={(data) => saveText(data, vis.idx)}
                    >
                      <Vis />
                    </ChartWrapper>
                  </div>
                </>
              )
            })}
          </div>
        </>
      )
    })
  }

  return (
    <>
      <div className="visPage-body">
        <h2>Visualizations</h2>
        {isOwner ? (
          <>
            <button type="button" onClick={saveCustom}>
              Save My Visualization
            </button>
            {viewAsGuest ? ( // I know that it is broken.
              // Breaks the logic for some reason. Refactoring needed. Not in requirments, tho.
              <button
                type="button"
                onClick={() => setViewAsGuest(!viewAsGuest)}
              >
                {viewAsGuest ? 'To edit mode' : 'View as a guest'}
              </button>
            ) : null}

            <button type="button" onClick={split}>
              {splitViews ? 'Unsplit views' : 'Split views by 2 columns  '}
            </button>
          </>
        ) : (
          <h1>Created by {owner}</h1>
        )}

        <div className="container">
          {generateVisualizations(VISUALIZATIONS, config)}
        </div>
      </div>
    </>
  )
}

export default DIYVisualizations
