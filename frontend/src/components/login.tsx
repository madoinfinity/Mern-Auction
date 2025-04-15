import React, { useState } from 'react';
import '../styles/login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const fieldErrors: { username?: string; password?: string; error?: string } = {};
        setError({});

        if (!username.trim()) {
            fieldErrors.username = 'Username is required';
        }

        if (!password.trim()) {
            fieldErrors.password = 'Password is required';
        }

        // If there are errors, set the error state
        if (Object.keys(fieldErrors).length > 0) {
            setError(fieldErrors);
            return;
        }

        try {
            const loginpoint = `http://localhost:8000/user/LoginUser`;
            const response = await fetch(loginpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Username: username,
                    Password: password,
                }),
            });

            if (response.status === 200) {
                sessionStorage.setItem('username', username);
                console.log("hogaya login")
                navigate('/home');
            } else {
                fieldErrors.error = 'Invalid username or password';
                setError(fieldErrors);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    }

    return (
        <div className="bodyLogin">
            <div className="containerLogin">
                <form className="login-form" onSubmit={handleLogin}>
                    <h2>Login</h2>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && (
                        <div>
                            {Object.keys(error).map((key, index) => (
                                <p key={index} style={{ color: 'red' }}>
                                    {error[key]}
                                </p>
                            ))}
                        </div>
                    )}

                    <div className="form-group">
                        <button type="submit">Login</button>
                    </div>
                    <div className="form-group signup-link">
                        Don't have an account? <a href="/signup">Sign up</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
