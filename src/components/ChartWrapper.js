/**
 * This component is being used for customizing already existing visualization components
 * for user specific visualization.
 */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

function ChartWrapper({
  children,
  authorized,
  hide,
  hiddenCallback,
  data,
  dataCallback,
}) {
  const [edit, setEdit] = useState(false)
  const [text, setText] = useState(data ? data : '')
  const [hidden, setHidden] = useState(hide || false)

  ChartWrapper.propTypes = {
    children: PropTypes.any,
    authorized: PropTypes.bool,
    hide: PropTypes.bool,
    hiddenCallback: PropTypes.func,
    data: PropTypes.string,
    dataCallback: PropTypes.func,
  }

  function toggleEdit() {
    setEdit(!edit)
  }

  function saveText() {
    setEdit(!edit)
    dataCallback(text)
  }

  function toggleHidden() {
    setHidden(!hidden)
    hiddenCallback()
  }

  if (hidden) {
    return (
      <div className="chart-warpper">
        {authorized ? (
          <button type="button" onClick={toggleHidden}>
            Show
          </button>
        ) : null}
      </div>
    )
  } else {
    return (
      <div className="chart-warpper">
        <p1 className="custom-p">{authorized ? 'Customize your own chart' : null}</p1>
        {authorized ? (
          <button type="button" onClick={toggleHidden}>
            Hide
          </button>
        ) : null}
        {children}
        {!edit ? (
          <>
            {authorized ? (<h2>Add Comment:</h2>) : (data ? <h2>Comment from author:</h2> : null)}
            <h3>{text.length == 0 ? (authorized ? 'Your text here' : data) : text}</h3>
            {authorized ? (
              <button type="button" onClick={() => toggleEdit()}>
                Edit
              </button>
            ) : null}
          </>
        ) : null}
        {edit && authorized ? (
          <>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="edit-input"
            />
            <button type="button" onClick={() => saveText()}>
              Save
            </button>
          </>
        ) : null}
      </div>
    )
  }
}

export default ChartWrapper
