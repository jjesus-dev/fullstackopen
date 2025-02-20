const Search = (props) => {
    return (
        <div>
            <label htmlFor="txtSearch">Find countries:</label>
            <input type="text" name="txtSearch" id="txtSearch"
                value={props.filter}
                onChange={props.onChangeFilter} />
        </div>
    )
}

export default Search;