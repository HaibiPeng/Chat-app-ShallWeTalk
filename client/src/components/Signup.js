/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, TextField, Button, makeStyles } from '@material-ui/core';
import signupService from '../services/signup'
import './css/Join.css';

const useStyles = makeStyles((theme) => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '30ch',
    },
  }));

const Signup = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [verifypassword, setverifyPassword] = useState('')

    const classes = useStyles()
    const inputStyle = { WebkitBoxShadow: "0 0 0 1000px #6ddaf5 inset" };

    const addUser = (event) => {
        let flag = 1
        event.preventDefault()
        if ( password === verifypassword) {
            signupService.createUser({
                username: username,
                password: password
            })
            .catch(error => {
                window.alert(error.response.data.error)
                console.log(1)
                flag=0
            }).finally(() => {
                if (flag === 1) {
                    window.alert('Sign up successful, go login!')
                }
            })
        } else {
            window.alert('Passwords did not match, please check again!')
        }
        setUsername('')
        setPassword('')
        setverifyPassword('')
    }
    
    return (
        <div className="joinOuterContainer">
            <div className='joinInnerContainer'>
                <h1 className="heading1">Shall We Talk?<span role="img" aria-label="emoji">💬</span></h1>
                <h1 className="heading">Sign Up</h1>
                <Container>
                    <form onSubmit={addUser}>
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
                        <TextField label="Verify password" placeholder="verify password" variant="outlined" margin="normal" value={verifypassword} 
                        type="password" color="primary" className={classes.textField} inputProps={{ style: inputStyle }} required
                        onChange={(e) => {setverifyPassword(e.target.value)}} />
                    </div>
                    <p></p>
                    <div>
                        <Button className="button" variant="contained" color="primary" id="signup-button" type="submit" size="large">
                        Sign up
                        </Button>         
                    </div>
                    <p></p>
                    <div>
                        <Link to="/">
                            <Button className="button" variant="contained" color="primary" id="go-signin-button" type="submit" size="large">
                                Go Login
                            </Button>
                        </Link>
                    </div>
                    </form>
                </Container>
            </div>
        </div>
    )
}

export default Signup