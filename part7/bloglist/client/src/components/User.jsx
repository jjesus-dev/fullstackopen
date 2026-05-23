import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'

const User = ({ user, loggedUser }) => {
  //console.log(user)
  // conditional rendering in case `user` or `loggedUser` aren't defined
  if (!user) {
    return (
      <Typography variant="h5" component="div" sx={{ marginTop: 2 }}>
        This user doesn't exist.
      </Typography>
    )
  }

  if (!loggedUser) {
    return (
      <Typography variant="h5" component="div" sx={{ marginTop: 2 }}>
        Please log in first.
      </Typography>
    )
  }

  return (
    <Card variant="outlined" sx={{ marginTop: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {user.name}
        </Typography>
        <br />
        <Typography>Added blogs:</Typography>
        <List sx={{ color: 'text.secondary' }}>
          {user.blogs.map((b) => (
            <ListItem key={b.id}>
              <ListItemText primary={b.title} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

export default User
