import { createContext, useState } from 'react'
import Nav from './components/Nav'
import ChatScreen from './components/ChatScreen'

function App() {
  const loginState = useState({})

  return (
    <div className="App">
      <userContext.Provider value={loginState} >
        <Nav />
        <ChatScreen />
      </userContext.Provider>
    </div>
  );
}

export default App;

export const userContext = createContext()
