import React from 'react'
import axios from 'axios'
import makeToast from '../Toaster'

export default function RegisterPage({history}) {

    const nameRef = React.createRef()
    const emailRef = React.createRef()
    const passwordRef = React.createRef()

    const registerUser = (props) => {
        const name = nameRef.current.value
        const email = emailRef.current.value
        const password = passwordRef.current.value

        axios.post('http://localhost:8080/user/register',{
            name,
            email,
            password,
        }).then( response =>{
            makeToast("success", response.data.message)
            history.push("/login")
            // console.log(props)
        }).catch( err => {
            // console.log(err)
            makeToast('error', err.message)
        })
    }

    return (
        <div className="card">
            <div className="cardHeader">Register</div>
            <div className="cardBody">
            <div className="inputGroup">
                <label htmlFor="username">UserName</label>
                <input 
                    type="text" 
                    name="text" 
                    placeholder="hasnat amir"
                    id="username"
                    ref={nameRef}
                />
            </div>
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

            <button onClick={registerUser}>Register</button>
            </div>
        </div>
    )
}
