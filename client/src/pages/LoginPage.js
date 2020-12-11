import React from 'react'
import axios from 'axios'
import makeToast from '../Toaster'
import { withRouter } from 'react-router-dom'

const LoginPage = ({history, setupSocket}) => {
    
    const emailRef = React.createRef()
    const passwordRef = React.createRef()

    const loginUser = (props) => {
        const email = emailRef.current.value
        const password = passwordRef.current.value

        axios.post('http://localhost:8081/user/login',{
            email,
            password,
        }).then( response =>{
            makeToast("success", response.data.message)
            localStorage.setItem('DC_TOKEN', response.data.token)
            history.push("/dashboard")
            console.log(props)
            setupSocket()
        }).catch( err => {
            // console.log(err)
            makeToast('error', err.message)
        })
    }

    return (
        <div className="card">
            <div className="cardHeader">Login</div>
            <div className="cardBody">
                <div className="inputGroup">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="email@gmail.com"
                        id="email"
                        ref={emailRef}
                    />
                </div>
                <div className="inputGroup">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="password..."
                        id="password"
                        ref={passwordRef}
                    />
                </div>

                <button onClick={loginUser}>Login</button>
            </div>
        </div>
    )
}

export default withRouter(LoginPage)