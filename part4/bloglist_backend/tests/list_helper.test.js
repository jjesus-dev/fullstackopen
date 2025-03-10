const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');

test('Dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

const blogs = [
  {
    "title": "Blog1",
    "author": "John",
    "url": "https://example.com/",
    "likes": 13,
    "id": "1"
  },
  {
    "title": "Blog2",
    "author": "Jane",
    "url": "https://example2.com/",
    "likes": 2,
    "id": "2"
  },
  {
    "title": "Blog3",
    "author": "Guy",
    "url": "https://example3.com/",
    "likes": 4,
    "id": "3"
  }
];

const oneBlogList = Array.of(blogs[1]);

describe('Total likes', () => {
  test('of empty list is zero', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0);
  });

  test('when list has only one blog, equals the likes of that', () => {
    assert.strictEqual(listHelper.totalLikes(oneBlogList), 2);
  });

  test('of a bigger list is calculated right', () => {
    assert.strictEqual(listHelper.totalLikes(blogs), 19);
  });
});