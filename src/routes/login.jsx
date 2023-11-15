import { useState } from 'react';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = () => {
        if (username == 'admin' && password == 'admin') {
            console.log('login success');
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = '/';
        }
        else {
            alert('Wrong username or password')
        }
    };

    return (
        <div className="container mt-5">
            <div className="col-md-6 offset-md-3">
                <div>
                    <h2 className="mb-4">Login</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={handleLogin}>
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;