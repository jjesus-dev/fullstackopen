import { render, screen } from '@testing-library/react';
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