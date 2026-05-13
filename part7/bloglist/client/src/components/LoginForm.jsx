import { TextField, Button } from '@mui/material'

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  const separatorStyle = {
    marginTop: 10,
  }

  return (
    <div>
      <h2>Log in to access the application</h2>
      <form onSubmit={handleLogin} id="loginForm">
        <div style={separatorStyle}>
          <TextField
            id="username"
            label="Username:"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>

        <div style={separatorStyle}>
          <TextField
            id="password"
            label="Password:"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div style={separatorStyle}>
          <Button type="submit" variant="contained">
            Log in
          </Button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
