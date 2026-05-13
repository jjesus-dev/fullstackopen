import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

// Exercise 5.16
test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const inputTitle = container.querySelector('#title')
  const inputUrl = container.querySelector('#url')
  const inputAuthor = container.querySelector('#author')
  const createButton = screen.getByText('Create')

  await user.type(inputTitle, 'testing blog creation')
  await user.type(inputUrl, 'www.testing.com')
  await user.type(inputAuthor, 'Vitest')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing blog creation')
  expect(createBlog.mock.calls[0][0].url).toBe('www.testing.com')
  expect(createBlog.mock.calls[0][0].author).toBe('Vitest')
})
