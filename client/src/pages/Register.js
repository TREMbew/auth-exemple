import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {registerUser} from '../actions/authActions';

const Register = () => {
    const [info, setInfo] = useState({
        firstname : "",
        lastname : "",
        phone : "",
        email : "",
        password : "",
    })
    const dispatch = useDispatch()
    const handleChange = e => {
        e.preventDefault()
        setInfo({...info, [e.target.name] : e.target.value})
    }
    const registerNow = e => {
        e.preventDefault();
        dispatch(registerUser(info))
    }
    return (
        <form onSubmit={registerNow}>
            <div>
                <label>Firstname</label>
                <input type='text' name='firstname' onChange={handleChange}/>
            </div>
            <div>
                <label>Lastname</label>
                <input type='text' name='lastname' onChange={handleChange}/>
            </div>
            <div>
                <label>Phone</label>
                <input type='text' name='phone' onChange={handleChange}/>
            </div>
            <div>
                <label>Email</label>
                <input type='text' name='email' onChange={handleChange}/>
            </div>
            <div>
                <label>Password</label>
                <input type='password' name='password' onChange={handleChange}/>
            </div>
            <button type='submit'>Register</button>
        </form>
    )
}

export default Register
