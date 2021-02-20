/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './css/Chat.css';
import InfoBar from './InfoBar';
import Input from './Input';
import Messages from './Messages';
import UserContainer from './UserContainer';

let socket

const Chat = ({ location }) => {
    const [username, setUsername] = useState('')
    const [room, setRoom] = useState('')
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState([])
    const [messages, setMessages] = useState([])
    const [token, setToken] = useState(null)
    const ENDPOINT = 'https://chatapp-shallwetalk.herokuapp.com/'
    
    useEffect(() => {
        const { username, room } = queryString.parse(location.search)

        socket = io(ENDPOINT)

        setUsername(username)
        setRoom(room)

        socket.emit('join', { username: username, room: room }, (error) => {
            if(error) {
                alert(error)
            }
        })
    }, [ENDPOINT, location.search])

    const disconnected = () => {
        socket.emit('disconnected')
        socket.off()
    }

    window.onbeforeunload = () => {
        socket.emit('disconnected')
        socket.off()
        return 'refreshing/leaving this page?'
    }

    window.onhashchange = () => {
        socket.emit('disconnected')
        socket.off()
        return 'refreshing/leaving this page?'
    }

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    }, [messages, users])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedChatAppUser')
        if (loggedUserJSON) {
            setToken(loggedUserJSON)
        }
    }, [])

    const sendMessage = (event) => {
        event.preventDefault();
        
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} setToken={setToken} disconnected={disconnected} />
                <Messages messages={messages} username={username} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <UserContainer users={users} />
        </div>
    )
}

export default Chat