import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog />', () => {
  let container;
  let user;
  const mockHandler = vi.fn();

  beforeEach(() => {
    const blog = {
      author: 'John Doe',
      title: 'How to test React apps',
      likes: 10,
      url: 'http://example.com/howtotest',
      user: ''
    };

    user = userEvent.setup();

    container = render(
      <Blog blog={blog} updateBlog={mockHandler} />
    ).container;
  })

  test('renders default content', () => {
    const div = container.querySelector('.blog');
    expect(div).toHaveTextContent('How to test React apps');
    expect(div).toHaveTextContent('John Doe');
  
    //screen.debug(div);
  });

  test('renders likes & url after clicking the button', async () => {
    const button = screen.getByText('View');
    await user.click(button);
    
    const div = container.querySelector('.blog');
    expect(div).toHaveTextContent('10');
    expect(div).toHaveTextContent('http://example.com/howtotest');
  })

  test('likes a blog 2 times, after showing the full info', async () => {
    const button = screen.getByText('View');
    await user.click(button);

    const likeButton = screen.getByText('like');
    await user.click(likeButton);
    expect(mockHandler.mock.calls).toHaveLength(1);

    await user.click(likeButton);
    expect(mockHandler.mock.calls).toHaveLength(2);
  })
})