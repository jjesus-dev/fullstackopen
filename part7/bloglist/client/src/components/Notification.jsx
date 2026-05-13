import { Alert } from '@mui/material'

const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }

  const style = {
    margin: '10px',
    padding: '10px',
  }

  return (
    <Alert style={style} severity={notification.type}>
      {notification.text}
    </Alert>
  )
}

export default Notification
