import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    borderWidth: '1px',
    padding: '10px',
    margin: '14px 4px'
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification