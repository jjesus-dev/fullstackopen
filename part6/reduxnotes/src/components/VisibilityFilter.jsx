import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const VisibilityFilter = (props) => {
  const dispatch = useDispatch()

  return (
    <div>
      <span>
        All <input type="radio" name="filter"
        onChange={() => dispatch(filterChange('ALL'))} />
      </span>
      <span>
        Important <input type="radio" name="filter"
        onChange={() => dispatch(filterChange('IMPORTANT'))} />
      </span>
      <span>
        NonImportant <input type="radio" name="filter"
        onChange={() => dispatch(filterChange('NONIMPORTANT'))} />
      </span>
    </div>
  )
}

export default VisibilityFilter