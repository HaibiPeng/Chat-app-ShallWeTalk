/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, TextField, Button, makeStyles } from '@material-ui/core';
import loginService from '../services/login' 
import './css/Join.css';

const useStyles = makeStyles((theme) => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '30ch',
    },
  }));

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState(null)
    const [room, setRoom] = useState('')

    const classes = useStyles()
    const inputStyle = { WebkitBoxShadow: "0 0 0 1000px #6ddaf5 inset" };

    const handleLogin = async (event) => {
        let flag = 1
        event.preventDefault()
        /* try {
            const user = await loginService.userLogin({
                username, password
            }).catch(error => {
                window.alert(error.response.data.error)
                flag = 0
            }).finally(() => {
                if (flag === 1) {
                    window.alert('Login successful!')
                    window.localStorage.setItem('loggedChatAppUser', user.token)
                    setToken(user.token)
                }
            })
            setUsername('')
            setPassword('')
        } catch (exception) {
            window.alert('Wrong credentials, please check again!')
        } */
        const user = await loginService.userLogin({
                username, password
            }).catch(error => {
                window.alert(error.response.data.error)
                flag = 0
            })
            if (flag === 1) {
                    window.alert('Login successful!')
                    window.localStorage.setItem('loggedChatAppUser', user.token)
                    setToken(user.token)
                }
            //setUsername('')
            //setPassword('')
    }
    
    return (
        <div className="joinOuterContainer">
            <div className='joinInnerContainer'>
                <h1 className="heading1">Shall We Talk!<span role="img" aria-label="emoji">💬</span></h1>
                <h1 className="heading">LOGIN</h1>
                <Container>
                    <form onSubmit={handleLogin}>
                    <div>
                        <TextField label="Username" placeholder="username" variant="outlined" margin="normal" value={username} type="text"
                        color="primary" className={classes.textField} inputProps={{ style: inputStyle }} required
                        onChange={(e) => {setUsername(e.target.value)}} />
                    </div>
                    <div>
                        <TextField label="Password" placeholder="password" variant="outlined" margin="normal" value={password} type="password"
                        color="primary" className={classes.textField} inputProps={{ style: inputStyle }} required
                        onChange={(e) => {setPassword(e.target.value)}} />
                    </div>
                    <div>
                        <TextField label="Room" placeholder="room" variant="outlined" margin="normal" value={room} type="text" 
                        color="primary" className={classes.textField} inputProps={{ style: inputStyle }} required
                        onChange={(e) => {setRoom(e.target.value)}} />
                    </div>
                    <p></p>
                    <div>
                        <Link onClick={(event) => (!username || !room || !password) ? event.preventDefault() : (token === null ? handleLogin(event) : null)}  
                        to={`/chat?username=${username}&token=${token}&room=${room}`}>
                        {token === null ?
                        <Button className="button" variant="contained" color="primary" id="login-button" type="submit" size="large">
                            Login
                        </Button>
                        :
                        <Button variant="contained" color="primary" id="login-button" type="submit" size="large">
                            Start chatting
                        </Button>
                        }
                        </Link>
                    </div>
                    </form>
                    <p></p>
                    {/* {token !== null
                        ?
                        <Link onClick={(event) => (!username || !room || !password) ? event.preventDefault() : null}  to={`/chat?username=${username}&room=${room}`}>
                            <Button variant="contained" color="primary" id="login-button" type="submit" size="large">
                                Start chatting
                            </Button> 
                        </Link>
                        : null
                    }     
                    <p></p> */}
                    <div>
                        <Link to="/signup">
                            <Button className="button" variant="contained" color="primary" id="go-signup-button" size="large">
                                Go Signup
                            </Button>
                        </Link>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Login