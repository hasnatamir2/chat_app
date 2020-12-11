import React from 'react'
import { withRouter } from 'react-router-dom'
// import io from 'socket.io-client'

const ChatroomPage = (props, {socket}) =>{

    const chatroomId = props.match.params.id
    const [messages, setMessages] = React.useState([])
    const messageRef = React.useRef()

    const sendMessage = ()=> {
        if(socket){
            socket.emit('chatroomMessage', {
                chatroomId,
                message: messageRef.current.value
            })
        }
    }

    React.useEffect( () => {
        console.log(props)
        // socket.emit('joinRoom', {
        //     chatroomId,
        // })

        // socket.emit('newMessage', ({message, userId, name}) => {
        //     setMessages(...messages, message)
        // })
        return () => {
            socket.emit('leaveRoom', {
                chatroomId,
            })
        }
    }, [])
    return (
        <div className="chatroomPage">
            <div className="chatroomSection">
                <div className="cardHeader">
                    ChatRoom
                </div>
                <div className="chatroomContent">
                {/* {messages.map((message)=> (
                    <div key={chatroomId} className="message">
                        <span className="otherMessage">{message.name} -</span>{" "}{message.message}
                    </div>
                ))} */}
                <div className="message">
                        <span className="otherMessage">Faizan:</span> hello bro!
                    </div>
                    <div className="message">
                        <span className="otherMessage">Faizan:</span> progress??
                    </div>

                    <div className="message">
                        <span className="ownMessage">Hasnat:</span> hi!
                    </div>
                </div>
                <div className="chatroomActions">
                    <div>
                        <input 
                            type="text"
                            name="message"
                            placeholder="message..."
                            ref={messageRef}
                        />
                    </div>
                    <div>
                        <button className="join" onClick={sendMessage}>send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(ChatroomPage)