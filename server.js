// server.js
const express = require('express');
const Sequelize = require('sequelize');

const app = express();
app.use(express.json());

const sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'mysql'
});

const Profile = sequelize.define('profile', {
    name: Sequelize.STRING,
    url: Sequelize.STRING,
    about: Sequelize.TEXT,
    bio: Sequelize.TEXT,
    location: Sequelize.STRING,
    followerCount: Sequelize.INTEGER,
    connectionCount: Sequelize.INTEGER
});

app.post('/profile', async (req, res) => {
    const profile = await Profile.create(req.body);
    res.json(profile);
});

app.listen(3000, () => console.log('Server is running on port 3000'));
