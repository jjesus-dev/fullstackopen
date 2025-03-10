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

module.exports = {
  dummy, totalLikes, favoriteBlog
};