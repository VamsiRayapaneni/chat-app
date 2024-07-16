import './App.css'
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
const socket = io.connect("http://localhost:3001")


function App() {
    const [message, setmessage] = useState("");
    const [msgReceive, setMsgReceive] = useState("");
    const sendMessage = () => {
        // Emiting the message to server
        socket.emit("send_msg", { message })
    }

    // Here the message received from server and setting the state variable to print
    useEffect(() => {
        socket.on("receive_msg", ({ data }) => {
            setMsgReceive(data.message)
        })
    }, [socket]);
    return (
        <div className='App'>
            <input placeholder='Type Message'
                onChange={(event) => {
                    setmessage(event.target.value);
                }}
            />
            <button onClick={sendMessage}>Send Message</button>
            <h3>{`Received Data :  ${msgReceive}`}</h3>
        </div>)
}
export default App;