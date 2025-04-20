const Notification = ({ text }) => {
  const style = {
    border: 'solid',
    borderWidth: '1px',
    padding: '10px',
    marginBottom: '5px'
  }

  if (text === '' || text === undefined) {
    return null
  }

  return (
    <div style={style}>{text}</div>
  )
}

export default Notification