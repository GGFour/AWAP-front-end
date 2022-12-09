import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserAuthContext } from '../components/Contexts'

const URL = '/api/listcustom'
function UserInventory() {
  const [id, setId] = useState([])
  const userAuthContextValue = useContext(UserAuthContext)
  const headers = {
    Authorization: 'Bearer ' + userAuthContextValue.jwt,
  }
  useEffect(() => {
    axios
      .get(`http://localhost:3000${URL}`, { headers })
      .then((response) => {
        setId(response.data)
      })
      .catch((e) => {
        alert(e)
      })
  }, [])

  return (
    <>
      <div>My Custom Visualizations</div>
      <ul>
        {id.map((row, idx) => (
          <>
            <li>
              <Link to={`/custom/${row.id}`}>My vis {idx}</Link>
            </li>
          </>
        ))}
      </ul>
    </>
  )
}

export default UserInventory
