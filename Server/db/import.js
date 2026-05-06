import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import pool, { query } from '../config/db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(readFileSync(path.join(__dirname, 'original_data.json'), 'utf8'));

// Map old string IDs to new auto-increment IDs
const userIdMap = {};
const postIdMap = {};
const albumIdMap = {};

async function importUsers() {
  console.log('Importing users...');
  const seenEmails = new Set();
  const seenUsernames = new Set();

  for (const user of data.users) {
    // Skip duplicate emails or usernames
    const email = seenEmails.has(user.email) ? `${user.id}_${user.email}` : user.email;
    const username = seenUsernames.has(user.username) ? `${user.id}_${user.username}` : user.username;
    seenEmails.add(email);
    seenUsernames.add(username);

    const addr = user.address || {};
    const comp = user.company || {};

    const result = await query(
      `INSERT INTO users (name, username, email, phone, website, street, suite, city, zipcode,
       company_name, company_catchphrase, company_bs) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
      [user.name, username, email, user.phone || '', user.website || '',
       addr.street || '', addr.suite || '', addr.city || '', addr.zipcode || '',
       comp.name || '', comp.catchPhrase || '', comp.bs || '']
    );
    userIdMap[user.id] = result.insertId;

    // Store website as password fallback for legacy login
    await query(
      'INSERT INTO passwords (user_id, password_hash) VALUES (?, ?)',
      [result.insertId, user.website || '']
    );
  }
  console.log(`✓ Imported ${data.users.length} users`);
}

async function importPosts() {
  console.log('Importing posts...');
  let count = 0;
  for (const post of data.posts || []) {
    const newUserId = userIdMap[post.userId];
    if (!newUserId) continue;
    const result = await query(
      'INSERT INTO posts (user_id, title, body) VALUES (?, ?, ?)',
      [newUserId, post.title, post.body]
    );
    postIdMap[post.id] = result.insertId;
    count++;
  }
  console.log(`✓ Imported ${count} posts`);
}

async function importComments() {
  console.log('Importing comments...');
  let count = 0;
  for (const comment of data.comments || []) {
    const newPostId = postIdMap[comment.postId];
    if (!newPostId) continue;
    await query(
      'INSERT INTO comments (post_id, name, email, body) VALUES (?, ?, ?, ?)',
      [newPostId, comment.name, comment.email, comment.body]
    );
    count++;
  }
  console.log(`✓ Imported ${count} comments`);
}

async function importTodos() {
  console.log('Importing todos...');
  let count = 0;
  for (const todo of data.todos || []) {
    const newUserId = userIdMap[todo.userId];
    if (!newUserId) continue;
    await query(
      'INSERT INTO todos (user_id, title, completed) VALUES (?, ?, ?)',
      [newUserId, todo.title, todo.completed ? 1 : 0]
    );
    count++;
  }
  console.log(`✓ Imported ${count} todos`);
}

async function importAlbums() {
  console.log('Importing albums...');
  let count = 0;
  for (const album of data.albums || []) {
    const newUserId = userIdMap[album.userId];
    if (!newUserId) continue;
    const result = await query(
      'INSERT INTO albums (user_id, title) VALUES (?, ?)',
      [newUserId, album.title]
    );
    albumIdMap[album.id] = result.insertId;
    count++;
  }
  console.log(`✓ Imported ${count} albums`);
}

async function importPhotos() {
  console.log('Importing photos...');
  let count = 0;
  for (const photo of data.photos || []) {
    const newAlbumId = albumIdMap[photo.albumId];
    if (!newAlbumId) continue;
    await query(
      'INSERT INTO photos (album_id, title, url, thumbnail_url) VALUES (?, ?, ?, ?)',
      [newAlbumId, photo.title, photo.url, photo.thumbnailUrl || photo.url]
    );
    count++;
  }
  console.log(`✓ Imported ${count} photos`);
}

async function run() {
  try {
    console.log('Starting import...\n');

    // Clear existing data
    await query('SET FOREIGN_KEY_CHECKS = 0');
    await query('TRUNCATE TABLE photos');
    await query('TRUNCATE TABLE albums');
    await query('TRUNCATE TABLE comments');
    await query('TRUNCATE TABLE todos');
    await query('TRUNCATE TABLE posts');
    await query('TRUNCATE TABLE passwords');
    await query('TRUNCATE TABLE users');
    await query('SET FOREIGN_KEY_CHECKS = 1');
    console.log('✓ Cleared existing data\n');

    await importUsers();
    await importPosts();
    await importComments();
    await importTodos();
    await importAlbums();
    await importPhotos();

    console.log('\n✅ Import complete!');
    console.log('\nUser ID mapping (old → new):');
    for (const [oldId, newId] of Object.entries(userIdMap)) {
      const user = data.users.find(u => u.id == oldId);
      console.log(`  ${oldId} → ${newId} (${user?.username})`);
    }
  } catch (err) {
    console.error('❌ Import failed:', err.message);
  } finally {
    await pool.end();
  }
}

run();