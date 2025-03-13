const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');

test('Dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

const oneBlogList = Array.of(listHelper.initialBlogs[1]);

describe('Total likes', () => {
  test('of empty list is zero', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0);
  });

  test('when list has only one blog, equals the likes of that', () => {
    assert.strictEqual(listHelper.totalLikes(oneBlogList), 2);
  });

  test('of a bigger list is calculated right', () => {
    assert.strictEqual(listHelper.totalLikes(listHelper.initialBlogs), 25);
  });
});

describe('Blog', () => {
  test('with the most likes found', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(listHelper.initialBlogs), listHelper.favorite);
  });
});

describe('Author', () => {
  test('with the most blogs found', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(listHelper.initialBlogs), listHelper.authorWithMostBlogs);
  });

  test('with the most liked blogs', () => {
    assert.deepStrictEqual(listHelper.mostLikes(listHelper.initialBlogs), listHelper.authorWithMostLikes);
  });
});
