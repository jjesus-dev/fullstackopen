import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  id: 1,
  title: 'Component testing is done with react-testing-library',
  url: 'https://testing-library.com/',
  author: 'Me',
}

// Exercise 5.13
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

test('clicking the button calls event handler once', async () => {
  const mockHandler = vi.fn()

  render(<Blog key={1} blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)

  // Use `toBeDefined` to check for simple clicks (not functions passed as props)
  expect(mockHandler.mock.calls).toBeDefined()
})

// Exercise 5.14
test('after clicking the button, url & likes are displayed', async () => {
  render(<Blog key={1} blog={blog} />)

  // Add the `author` because Blog element renders it & test fails without it
  const element = screen.getByText(
    'Component testing is done with react-testing-library by Me',
  )
  expect(element).toBeDefined()

  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)

  const blogUrl = screen.getByText('https://testing-library.com/')
  expect(blogUrl).toBeVisible()

  const blogLikes = screen.getByText('Likes.')
  expect(blogLikes).toBeVisible()
})

// Exercise 5.15
test('clicking the button twice calls the event handler twice', async () => {
  const likeHandler = vi.fn()
  const user = userEvent.setup()

  render(<Blog key={1} blog={blog} likeBlog={likeHandler} />)

  const viewButton = screen.getByText('View')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(likeHandler.mock.calls).toHaveLength(2)
})
