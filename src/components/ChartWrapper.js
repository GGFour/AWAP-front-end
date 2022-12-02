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
  const [text, setText] = useState(data)
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
      <>
        {authorized ? (
          <button type="button" onClick={toggleHidden}>
            Show
          </button>
        ) : null}
      </>
    )
  } else {
    return (
      <>
        {authorized ? (
          <button type="button" onClick={toggleHidden}>
            Hide
          </button>
        ) : null}
        {children}
        {!edit ? (
          <>
            <h3>{text + (authorized && !text ? 'Change mee. . .' : '')}</h3>
            {authorized ? (
              <button type="button" onClick={() => toggleEdit()}>
                Edit
              </button>
            ) : null}{' '}
          </>
        ) : null}
        {edit && authorized ? (
          <>
            <input value={text} onChange={(e) => setText(e.target.value)} />
            <button type="button" onClick={() => saveText()}>
              Save
            </button>
          </>
        ) : null}
      </>
    )
  }
}

export default ChartWrapper
