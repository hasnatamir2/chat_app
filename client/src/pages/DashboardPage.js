import React from 'react'

export default function DashboardPage() {
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
                <div className="chatroom">
                    <div>developers Only</div>
                    <div className="join">Join</div>
                </div>
                <div className="chatroom">
                    <div>developers Only</div>
                    <div className="join">Join</div>
                </div>
                <div className="chatroom">
                    <div>developers Only</div>
                    <div className="join">Join</div>
                </div>
            </div>
        </div>
    </div>
    )
}
