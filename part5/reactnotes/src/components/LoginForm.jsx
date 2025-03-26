const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}) => {
    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="txtUsername">Username</label>
                    <input type="text" name="txtUsername" id="txtUsername"
                        value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <label htmlFor="txtPassword">Password</label>
                    <input type="password" name="txtPassword" id="txtPassword"
                        value={password} onChange={handlePasswordChange} />
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;