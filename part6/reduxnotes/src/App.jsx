import NewNote from "./components/NewNote"
import Notes from "./components/Notes"

const App = () => {
  const filterSelected = (value) => {
    console.log(value);
  }

  return (
    <div>
      <NewNote />
      <div>
        <span>
          All <input type="radio" name="filter"
          onChange={() => filterSelected('ALL')} />
        </span>
        <span>
          Important <input type="radio" name="filter"
          onChange={() => filterSelected('IMPORTANT')} />
        </span>
        <span>
          NonImportant <input type="radio" name="filter"
          onChange={() => filterSelected('NONIMPORTANT')} />
        </span>
      </div>
      <Notes />
    </div>
  )
}

export default App