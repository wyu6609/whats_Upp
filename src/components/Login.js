import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {setValue} from '../redux/user'
function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  function handleChange(e){
    if(e.target.name === 'username'){
      setUsername(e.target.value);
    }else{
      setPassword(e.target.value);
    }
  }
  function handleSubmit(e){
    e.preventDefault()
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })    
    })
    .then(response => response.json())
    .then(data => {
        if (data.authenticated) {
            localStorage.setItem('jwt_token', data.token)
            dispatch(setValue(data.user.data));
        } else {
            alert('Password/Username combination not found')
        }   
    })
  }
  return (
    <div>
        <h3>Login</h3>
        <form onSubmit={(e) => handleSubmit(e)} >
          <input type='text' name="username" onChange={(e) => handleChange(e)} value={username} placeholder="username"/>
          <input  type='password' name="password" onChange={(e) => handleChange(e)} value={password} placeholder="password"/>
          <button type='submit'/>
        </form>
    </div>
  )
}

export default Login