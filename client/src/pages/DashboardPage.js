import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function DashboardPage() {

    const [chatRooms, setChatRooms] = React.useState([])

    const getChatRooms = ()=>{
        axios
        .get('http://localhost:8081/chatroom', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('DC_TOKEN')
            }
        })
        .then( response => {
            setChatRooms(response.data)
        })
        .catch( err => {
            setTimeout(getChatRooms, 3000)
        })
    }

    React.useEffect( () => {
        getChatRooms()
    }, [])

    return (
        <div className="card">
        <div className="cardHeader">Dashboard</div>
        <div className="cardBody">
            <div className="inputGroup">
                <label htmlFor="chatroomName">Chat Room Name</label>
                <input 
                    type="text" 
                    name="text" 
                    placeholder="developers Only"
                    id="chatroomName"
                />
            </div>
            <button>Create Chat Room</button>

            <div className="chatrooms">
                {chatRooms.map((chatroom) => (
                    <div key={chatroom._id} className="chatroom">
                        <div>{chatroom.name}</div>
                        <Link to={`/chatroom/${chatroom._id}`}><div className="join">Join</div></Link>
                    </div>
                ))}
            </div>
        </div>
    </div>
    )
}
