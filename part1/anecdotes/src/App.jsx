import { useState } from 'react'

const Button = (props) => {
  return(
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const TopAnecdote = (props) => {
  return (<p>{props.text}</p>)
}

const App = () => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Uint16Array(8));
  const [topAnecdote, setTopAnecdote] = useState(0);

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const randomNumber = () => {
    return Math.floor(Math.random() * (anecdotes.length));
  }

  const handleAnecdoteClick = () => {
    const randomAnecdote = randomNumber();
    setSelected(randomAnecdote);
  }

  const handleVoteClick = (anecdote) => {
    const newVotes = [...votes]
    newVotes[anecdote] += 1;
    setVotes(newVotes);
    getTopAnecdote(newVotes);
  }

  const getTopAnecdote = (newVotes) => {
    let numVotes = 0;
    let anecdoteIndex = 0;

    newVotes.forEach(function(value, element) {
      if (value > numVotes) {
        numVotes = value;
        anecdoteIndex = element;
      }
    });

    setTopAnecdote(anecdoteIndex);
  }

  return (
    <>
      <div>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>
        <Button onClick={() => handleVoteClick(selected)} text={'Vote'} />
        <Button onClick={handleAnecdoteClick} text={'Next anecdote'} />
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <TopAnecdote text={anecdotes[topAnecdote]} />
        <p>has {votes[topAnecdote]} votes</p>
      </div>
    </>
  )
}

export default App
