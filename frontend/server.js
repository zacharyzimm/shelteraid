const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./database');

const app = express();
const PORT = 3001;
const SECRET_KEY = 'your_secret_key';  // Cambia esto por una clave secreta segura

app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).json({ message: "Internal server error" });
    } else if (row && bcrypt.compareSync(password, row.password)) {
      const token = jwt.sign({ id: row.id, email: row.email }, SECRET_KEY, { expiresIn: '1h' });
      res.status(200).json({ message: "Login successful", token });
    } else {
      res.status(401).json({ message: "User or password incorrect" });
    }
  });
});

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: "Failed to authenticate token" });
    }
    req.userId = decoded.id;
    next();
  });
};

app.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ message: "This is a protected route" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});