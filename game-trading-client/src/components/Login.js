import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/login', { username, password })
            .then(response => {
                if (response.data.success) {
                    // Handle successful login, like redirecting to a dashboard
                } else {
                    alert('Login failed');
                }
            })
            .catch(error => {
                // Handle errors
                alert('Error during login');
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
