import React, {useState} from 'react'

const Login = () => {
    const [info, setInfo] = useState({
        firstname : "",
        lastname : "",
        phone : "",
        email : "",
        password : "",
    })
    const handleChange = e => {
        e.preventDefault()
        setInfo({...info, [e.target.name] : e.target.value})
    }
    return (
        <form>
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

export default Login
