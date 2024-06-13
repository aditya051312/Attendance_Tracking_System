import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/users/login', { email, password });
            if (res.data.success) {
                history.push('/books');
            } else {
                alert(res.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;