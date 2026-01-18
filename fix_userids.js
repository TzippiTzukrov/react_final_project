const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./Server/db.json', 'utf8'));

data.todos = data.todos.map(todo => ({
  ...todo,
  userId: String(todo.userId)
}));

data.albums = data.albums.map(album => ({
  ...album,
  userId: String(album.userId)
}));

data.posts = data.posts.map(post => ({
  ...post,
  userId: String(post.userId)
}));

fs.writeFileSync('./Server/db.json', JSON.stringify(data, null, 2));
console.log('Fixed all userIds to strings!');