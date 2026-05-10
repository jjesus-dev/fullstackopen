import { render, screen } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  id: 1,
  title: 'Component testing is done with react-testing-library',
  url: 'https://testing-library.com/',
  author: 'Me',
}

test('renders exact content', () => {
  render(<Blog key={1} blog={blog} />)

  // Add the `author` because Blog element renders it & test fails without it
  const element = screen.getByText(
    'Component testing is done with react-testing-library by Me',
  )
  expect(element).toBeDefined()
})

test('renders & contains content', () => {
  render(<Blog key={1} blog={blog} />)

  // Without the `author` & succeeds
  const element = screen.getByText(
    'Component testing is done with react-testing-library',
    { exact: false },
  )
  expect(element).toBeDefined()
})

test('does not render the content', () => {
  render(<Blog key={1} blog={blog} />)

  // Not the same content but doesn't fail
  const element = screen.queryByText('This is not the actual content')
  expect(element).toBeNull()
})
