const express = require('express');
const cors = require('cors');
const login = require('./routes/login');
const tasks = require('./routes/tasks');
const singUp = require('./routes/signUp');
const users = require('./routes/users');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', login);
app.use('/tasks', tasks);
app.use('/singUp', singUp);
app.use('/users', users);

app.listen(process.env.PORT || 3333, () => {
    console.log(`Server listening`)
})