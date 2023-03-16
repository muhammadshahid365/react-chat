import { useState, useEffect } from 'react'
import './index.css'
import baseURL from '../../config/endpoint'

function Login({ setLoginInfo, sendJsonMessage, setFriends }) {
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
          initializeConnection(res)
          setUser(res)
          fetchFriends(res)
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
        if(res._id){
          initializeConnection(res)
          localStorage.setItem('token', res.token)
          setUser(res)
          fetchFriends(res)
        }else {
          setError(res.message)
        }
      })
  }

  const initializeConnection = res => {
    sendJsonMessage({
      type: 'initialize',
      userId: res._id,
      token: res.token
    })
  }

  const setUser = (user) => {
    setLoginInfo({username: user.username, userId: user._id, token: user.token})
  }

  const fetchFriends = (user) => {
    const url = `http://${baseURL}:8000/friends-list`
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(res => {
        setFriends(res)
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
