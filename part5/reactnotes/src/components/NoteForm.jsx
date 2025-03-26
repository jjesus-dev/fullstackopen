const NoteForm = ({ onSubmit, handleChange, value }) => {
    return (
        <div>
            <h2>Create a new note</h2>

            <form onSubmit={onSubmit}>
                <div>
                    <input type="text" name="txtNote" id="txtNote"
                        value={value} onChange={handleChange} />
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    )
}

export default NoteForm