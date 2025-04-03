import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

test('renders content', () => {
  const blog = {
    author: 'John Doe',
    title: 'How to test React apps'
  };

  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector('.blog');
  expect(div).toHaveTextContent('How to test React apps');
  expect(div).toHaveTextContent('John Doe');

  //screen.debug(div);
});

test('renders likes & url after clicking the button', async () => {
  const blog = {
    author: 'John Doe',
    title: 'How to test React apps',
    likes: 10,
    url: 'http://example.com/howtotest'
  };

  const user = userEvent.setup();

  const { container } = render(
    <Blog blog={blog} />
  );

  const button = screen.getByText('View');
  await user.click(button);
  
  const div = container.querySelector('.blog');
  expect(div).toHaveTextContent('10');
  expect(div).toHaveTextContent('http://example.com/howtotest');


})