const _ = require('lodash');

const blogs = [
  {
    'title': 'Blog1',
    'author': 'John',
    'url': 'https://example.com/',
    'likes': 13,
    'id': '1'
  },
  {
    'title': 'Blog2',
    'author': 'Jane',
    'url': 'https://example2.com/',
    'likes': 2,
    'id': '2'
  },
  {
    'title': 'Blog3',
    'author': 'Guy',
    'url': 'https://example3.com/',
    'likes': 4,
    'id': '3'
  },
  {
    'title': 'Blog4',
    'author': 'Jane',
    'url': 'https://example2.com/new',
    'likes': 6,
    'id': '4'
  }
];

const mostLikes = _.chain(blogs)
  .groupBy('author')
  .map((blog, author) => ({
    author: author,
    likes: _.sumBy(blog, 'likes')
  }))
  .maxBy('likes')
  .value();

console.log(mostLikes);