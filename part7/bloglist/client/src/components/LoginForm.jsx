const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div>
      <h2>Log in to access the application</h2>
      <form onSubmit={handleLogin} id="loginForm">
        <div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              id="txtUsername"
              onChange={handleUsernameChange}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              id="txtPassword"
              onChange={handlePasswordChange}
            />
          </label>
        </div>
        <div>
          <button type="submit">Log in</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
