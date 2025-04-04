import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test('<BlogForm /> updates parent and calls onSubmit', async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  const { container } = render(<BlogForm createBlog={createBlog} />);

  const inputTitle = container.querySelector('#txtTitle');
  const inputAuthor = container.querySelector('#txtAuthor');
  const inputUrl = container.querySelector('#txtUrl');
  const sendButton = screen.getByText('Create');

  await user.type(inputTitle, 'Testing blog form...');
  await user.type(inputAuthor, 'John Doe');
  await user.type(inputUrl, 'http://example.com/reactForms');
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('Testing blog form...');
  expect(createBlog.mock.calls[0][0].author).toBe('John Doe');
  expect(createBlog.mock.calls[0][0].url).toBe('http://example.com/reactForms');

})