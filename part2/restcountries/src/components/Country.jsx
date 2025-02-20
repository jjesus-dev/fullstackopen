const Country = (props) => {
    return (
        <li key={props.id}>{props.name}</li>
    )
}

export default Country;