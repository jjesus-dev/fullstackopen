const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let sum = 0;

  if (blogs.length > 0) {
    blogs.forEach(blog => {
      sum = sum + blog.likes;
    });
  }

  return sum;
};

const favoriteBlog = (blogs) => {
  const likes = blogs.map(x => x.likes);

  const favorite = blogs.find(
    fav => fav.likes === Math.max(...likes)
  );

  return favorite;
};

const mostBlogs = (blogs) => {
  let temp = [];

  blogs.forEach((blog) => {
    if (temp.findIndex((t) =>
      t.author.toLowerCase() === blog.author.toLowerCase()) < 0) {
        temp.push({ "author": blog.author, "blogs": 0 });
    }
  });

  let blogCount = 0;
  let authorWithMostBlogs = null;

  temp.forEach((element) => {
    const filtered = blogs.filter(
      (blog) => blog.author === element.author
    );

    if (filtered.length > blogCount) {
      blogCount = filtered.length;
      authorWithMostBlogs = element;
    }
  });

	authorWithMostBlogs.blogs = blogCount;
	
  return authorWithMostBlogs;
};

const mostLikes = (blogs) => {
  const likesSum = _.chain(blogs)
    .groupBy('author')
    .map((blog, author) => ({
      author: author,
      likes: _.sumBy(blog, 'likes')
    }))
    .maxBy('likes')
    .value();
  
  console.log(likesSum);
	
  return likesSum;
};

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
};