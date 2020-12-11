import React from 'react'
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import io from 'socket.io-client'

import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import RegisterPage from './pages/RegisterPage'
import ChatRoomPage from './pages/ChatroomPage'
import makeToast from './Toaster';

function App() {

  const [socket, setSocket] = React.useState(null)

  const setupSocket = ()=>{
    const token = localStorage.getItem('DC_TOKEN')
    if(token.length > 0 && !socket){
      
      const newSocket = io.connect('/', {
        query:{
          token: localStorage.getItem('DC_TOKEN')
        }
      })
      
      newSocket.on('disconnect', ()=>{
        setSocket(null)
        setTimeout(setupSocket, 3000)
        makeToast('error', 'Socket Disconnected')
      })
      
      newSocket.on('connect', ()=> {
        console.log(newSocket)
        makeToast('success', 'Socket Connected')
      })

      console.log(newSocket)
      setSocket(newSocket)
    } 
  }

  React.useEffect( ()=> {
    setupSocket()
    console.log(socket)
  }, [])

  return (
    <div className="App">
      <BrowserRouter history={createBrowserHistory}>
        <Switch>
          <Route path="/" component={IndexPage} exact/>
          <Route 
            path="/login" 
            render={() =><LoginPage setupSocket={setupSocket} />} 
            exact
            
          />
          <Route 
            path="/dashboard" 
            render={() => <DashboardPage socket={socket}/> } 
            exact
          />
          <Route 
            path="/chatroom/:id" 
            render={() => <ChatRoomPage socket={socket}/>} 
            exact
          />
          <Route path="/register" component={RegisterPage} exact/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
