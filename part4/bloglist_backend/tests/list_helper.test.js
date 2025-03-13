const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');

test('Dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

const initialBlogs = [
  {
    title: 'Blog1',
    author: 'John',
    url: 'https://example.com/',
    likes: 13,
    id: '1'
  },
  {
    title: 'Blog2',
    author: 'Jane',
    url: 'https://example2.com/',
    likes: 2,
    id: '2'
  },
  {
    title: 'Blog3',
    author: 'Guy',
    url: 'https://example3.com/',
    likes: 4,
    id: '3'
  },
  {
    title: 'Blog4',
    author: 'Jane',
    url: 'https://example2.com/new',
    likes: 6,
    id: '4'
  }
];

const oneBlogList = Array.of(initialBlogs[1]);

const favorite = {
  'title': 'Blog1',
  'author': 'John',
  'url': 'https://example.com/',
  'likes': 13,
  'id': '1'
};

const authorWithMostBlogs = {
  'author': 'Jane',
  'blogs': 2,
};

const authorWithMostLikes = {
  'author': 'John',
  'likes': 13,
};

describe('Total likes', () => {
  test('of empty list is zero', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0);
  });

  test('when list has only one blog, equals the likes of that', () => {
    assert.strictEqual(listHelper.totalLikes(oneBlogList), 2);
  });

  test('of a bigger list is calculated right', () => {
    assert.strictEqual(listHelper.totalLikes(initialBlogs), 25);
  });
});

describe('Blog', () => {
  test('with the most likes found', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(initialBlogs), favorite);
  });
});

describe('Author', () => {
  test('with the most blogs found', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(initialBlogs), authorWithMostBlogs);
  });

  test('with the most liked blogs', () => {
    assert.deepStrictEqual(listHelper.mostLikes(initialBlogs), authorWithMostLikes);
  });
});

module.exports = {
  initialBlogs
};