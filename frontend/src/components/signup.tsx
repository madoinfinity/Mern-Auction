import React, { useState, useEffect } from 'react';
import '../styles/signup.css';
import { useNavigate } from 'react-router-dom';

// Import User interface
interface User {
    Username: string;
    Password: string;
    ItemsOwned: number;
}

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<{ [key: string]: string }>({});
    const [users, setUsers] = useState<User[]>([]); // Use User interface as the type
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch('http://localhost:2000/user/GetUsers');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.log('Error:', error);
            }
        }

        fetchUsers();
    }, []);

    async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const fieldErrors: {
            username?: string;
            password?: string;
            confirmPassword?: string;
            error?: string;
        } = {};

        setError({});

        if (!username.trim()) {
            fieldErrors.username = 'Username is required';
        }

        if (!password.trim()) {
            fieldErrors.password = 'Password is required';
        }

        if (!confirmPassword.trim()) {
            fieldErrors.confirmPassword = 'Confirm Password is required';
        } else if (password !== confirmPassword) {
            fieldErrors.confirmPassword = 'Passwords do not match';
        }

        if (users) {
            const existingUser = users.find((user) => user.Username === username);
            if (existingUser) {
                fieldErrors.username = 'Username already exists';
            }
        }

        if (Object.keys(fieldErrors).length > 0) {
            setError(fieldErrors);
            return;
        }

        try {
            const signuppoint = `http://localhost:8000/user/CreateUser`;
            console.log("SENDING SIGNUP ReQ")
            const response = await fetch(signuppoint, {
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
                console.log("BANA DIA USER YAY")
                sessionStorage.setItem('username', username);
                navigate('/login');
            } else {
                fieldErrors.error = 'Signup failed. Please try again.';
                setError(fieldErrors);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    }

    return (
        <div className="bodySignup">
            <div className="containerSignup">
                <form className="signup-form" onSubmit={handleSignup}>
                    <h2>Signup</h2>
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
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Re-enter your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                        <button type="submit">Sign Up</button>
                    </div>
                    <div className="form-group signup-link">
                        Already have an account? <a href="/">Login</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
