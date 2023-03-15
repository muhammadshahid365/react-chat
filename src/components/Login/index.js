import { useState, useEffect } from 'react'
import './index.css'
import baseURL from '../../config/endpoint'

function Login({ setLoginInfo, sendJsonMessage }) {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [previousToken, setPreviousToken ] = useState(localStorage.getItem('token'))

  useEffect(() => {
    const url = `http://${baseURL}:8000/verify-token`

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({previousToken})
    }).then(res => res.json())
      .then(res => {
        if(res._id){
          sendJsonMessage({
            type: 'initialize',
            userId: res._id,
            token: res.token
          })
          setLoginInfo({username: res.username, userId: res._id, token: res.token})
        } else {
          setPreviousToken(null)
          localStorage.removeItem('token')
        }
      })
  }, [])

  const login = (e) => {
    e.preventDefault()
    const url = `http://${baseURL}:8000/login`
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username})
    })
      .then(res => res.json())
      .then(res => {
        if(res.userId){
          sendJsonMessage({
            type: 'initialize',
            userId: res.userId,
            token: res.token
          })
          setLoginInfo({username, userId: res.userId, token: res.token})
          localStorage.setItem('token', res.token)
        }else {
          setError(res.message)
        }
      })
  }

  return (
    <div className='login'>
      <h1>Login</h1>
      {
        previousToken ? 
          <h3>Please wait...</h3> :
          <form onSubmit={login} >
            <label>Choose a username</label>
            <input type='text' onChange={e => setUsername(e.target.value)} />
            <p style={{color: 'red'}} >{error}</p>
            <div>
              <button type='submit' >Login</button>
            </div>
          </form>
      }
    </div>
  )
}

export default Login
