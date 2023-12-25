import express from 'express'
import { fileURLToPath } from 'url';
import path from 'path'

import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from './database.mjs';
import { authenticateToken, secretKey } from './middlewares.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
app.use(cors());
app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'eshop.html'));
});

app.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body;
        const [user] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

        if (user.length > 0) {
            const validPassword = await bcrypt.compare(password, user[0].password);
            if (validPassword) {
                const token = jwt.sign(
                    { userId: user[0].id, username: user[0].username },
                    secretKey,
                    { expiresIn: '10d' }
                );
                await db.query('UPDATE users SET lastlogin = CURRENT_TIMESTAMP WHERE id = ?', [user[0].id]);
                res.json({ token });
            } else {
                res.status(400).send('Invalid Password');
            }
        } else {
            res.status(401).send('User not found');
        }
    } catch (error) {
        res.status(500).send('Server error' + error);
    }
});

app.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user already exists
        const [existingUser] = await db.query('SELECT id FROM users WHERE username = ?', [username]);
        if (existingUser.length > 0) {
            return res.status(400).send('Username already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Insert the new user into the database
        const [result] = await db.query('INSERT INTO users (username, password) VALUES (?, ?)',
            [username, hashedPassword]);

        res.status(201).send({ userId: result.insertId, message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.post('/lastlogin', async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.json('Last login not found');
        }

        const decodedToken = jwt.verify(token, secretKey);

        const [user] = await db.query(`
        SELECT lastlogin
        FROM users WHERE username = ?`, [decodedToken.username]);

        if (user.length > 0 && user[0].lastlogin) {
            res.json(user[0].lastlogin);
        } else {
            res.json('Last login not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.post('/username', async (req, res) => {
    try {
        const { token } = req.body;
        if (token) {
            try {
                const decodedToken = jwt.verify(token, secretKey);
                const username = decodedToken.username;
                res.json(username);
            } catch (error) {
                console.error('Invalid token:', error);
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.post('/savecart', async (req, res) => {
    try {
        const { token, ascendingCart } = req.body;
        if (token) {
            const decodedToken = jwt.verify(token, secretKey);
            const username = decodedToken.username;
            const [user] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
            if (user.length > 0) {
                const [cart] = await db.query('SELECT * FROM carts WHERE id = ?', [user[0].id]);
                if (cart.length > 0) {
                    await db.query('UPDATE carts SET `a`=?, `b`=?, `c`=?, `d`=?, `e`=?, `f`=?, `g`=?, `h`=?, `i`=?, `j`=?, `k`=? WHERE id=?', [...ascendingCart, user[0].id]);
                    res.send('Succeefully updated');
                } else {
                    await db.query('INSERT INTO carts (id, a, b, c, d, e, f, g, h, i, j, k) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [user[0].id, ...ascendingCart]);
                    res.send('Succeefully saved');
                }
            } else {
                res.status(401).send('User not found');
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// app.get('/xxx', authenticateToken, async (req, res) => { // Verify the JWT via authenticateToken function before running the rest of the code
//     try {
//     } catch (error) {
//     }
// });

app.use(express.static(__dirname));

export { app }