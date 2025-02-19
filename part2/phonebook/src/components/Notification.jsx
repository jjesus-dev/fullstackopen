const Notification = ({ actionPerformed }) => {
  const templateMessage = `${actionPerformed}`;

  if (actionPerformed === null) {
    return null;
  }

  return (
    <div className="messageBox">
      <p>{templateMessage}</p>
    </div>
  )
}

export default Notification;