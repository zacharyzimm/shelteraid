const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT)");

  const users = [
    { email: 'test@mail.com', password: 'password123' },
    { email: 'user1@mail.com', password: 'password456' },
    { email: 'user2@mail.com', password: 'password789' },
  ];

  const insertUser = db.prepare("INSERT INTO users (email, password) VALUES (?, ?)");
  
  users.forEach(user => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    insertUser.run(user.email, hash);
  });
  
  insertUser.finalize();
});

module.exports = db;