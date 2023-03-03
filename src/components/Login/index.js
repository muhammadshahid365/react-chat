import { useState } from 'react'
import './index.css'

function Login({ setLoginInfo, sendJsonMessage }) {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const login = (e) => {
    e.preventDefault()
    const url = 'http://localhost:8000/login'
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
            userId: res.userId
          })
          setLoginInfo({username, userId: res.userId})
        }else {
          setError(res.message)
        }
      })
  }

  return (
    <div className='login'>
      <h1>Login</h1>
      <form onSubmit={login} >
        <label>Choose a username</label>
        <input type='text' onChange={e => setUsername(e.target.value)} />
        <p style={{color: 'red'}} >{error}</p>
        <div>
          <button type='submit' >Login</button>
        </div>
      </form>
      
    </div>
  )
}

export default Login
