import { useDispatch } from "react-redux";
import { filterAnecdotes } from "../reducers/filterReducer";

const AnecdoteFilter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const filter = event.target.value

    dispatch(filterAnecdotes(filter))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      <span>Filter: 
        <input type="text"
          onChange={handleChange} /></span>
    </div>
  )
}

export default AnecdoteFilter