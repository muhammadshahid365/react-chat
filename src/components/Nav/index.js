import { useContext } from 'react'
import { userContext } from '../../App'
import './index.css'

function Nav() {
  const [loginInfo, setLoginInfo] = useContext(userContext)

  const logout = () => {
    const url = 'http://ec2-54-188-94-253.us-west-2.compute.amazonaws.com:8000/logout'

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: loginInfo.userId,
        token: loginInfo.token
      })
    })
      .then(res => res.json())
      .then(res => {
        if(res.message === 'ok'){
          localStorage.removeItem('token')
          setLoginInfo({})
        }
      })
  }

  return (
    <div className='App-header' >
      <h1>Messaging</h1>
      <div>
        {
          loginInfo.userId ? <button onClick={logout} >Logout</button> : null
        }
      </div>
    </div>
  )
}

export default Nav
