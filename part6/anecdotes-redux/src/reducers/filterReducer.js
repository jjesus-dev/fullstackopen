export const filterAnecdotes = (filter) => {
  return {
    type: 'FILTER_ANECDOTES',
    payload: filter,
  }
}

const filterReducer = (state = '', action) => {
  console.log('filtering:', action);
  
  switch (action.type) {
    case 'FILTER_ANECDOTES':
      return action.payload
    default:
      return state
  }
}

export default filterReducer