import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserAuthContext } from '../components/Contexts'

const URL1 = '/api/listcustom'
const URL2 = '/api/custom'
function UserInventory() {
  const [customVis, setCustomVis] = useState([])
  const userAuthContextValue = useContext(UserAuthContext)
  const headers = {
    Authorization: 'Bearer ' + userAuthContextValue.jwt,
  }
  useEffect(() => {
    axios
      .get(`http://localhost:3000${URL1}`, { headers })
      .then((response) => {
        setCustomVis(response.data)
      })
      .catch((e) => {
        alert(e)
      })
  }, [])

  const deleteCustomVis = (index, urlId) => {
    axios
      .delete(`http://localhost:3000${URL2}?id=${urlId}`, {
        headers,
      })
      .then(() => {
        let newCostumVis = [...customVis]
        newCostumVis.splice(index, 1) //remove the the item at the specific index
        setCustomVis(newCostumVis)
      })
      .catch((e) => {
        alert(e)
      })
  }

  return (
    <div className="user-inventory">
      <div>My Custom Visualizations</div>
      <ul>
        {customVis.map((row, idx) => (
          <>
            <li className="custom-list" key={idx}>
              <Link to={`/custom/${row.id}`}>My vis No. {idx}</Link>
              <button
                className="delete-btn"
                onClick={() => deleteCustomVis(idx, row.id)}
              >
                delete
              </button>
            </li>
          </>
        ))}
      </ul>
    </div>
  )
}

export default UserInventory
