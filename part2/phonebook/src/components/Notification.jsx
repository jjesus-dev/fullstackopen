const Notification = (props) => {
  if (props.actionPerformed.text === null) {
    return null;
  }

  if (props.actionPerformed.text !== null && props.actionPerformed.success) {
    return (
      <div className="messageBox">
        <p>{props.actionPerformed.text}</p>
      </div>
    )
  } else {
    return (
      <div className="errorMessage">
        <p>{props.actionPerformed.text}</p>
      </div>
    )
  }
}

export default Notification;