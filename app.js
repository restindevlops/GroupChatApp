
const express = require('express');
const fs = require('fs');
const path = require ('path');
const sequelize= require('./util/database');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
app.use(cors());

const userRoutes = require('./routes/user');
const resetPasswordRoutes = require('./routes/reset-password');
const messageRoutes = require('./routes/message');

const User = require('./models/user');
const Forgotpassword = require('./models/forgot-password');
const Message = require('./models/message');

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    { flags : 'a'}
);

app.use(express.json());
// app.use(helmet());
app.use(morgan('combined',{stream: accessLogStream}));

app.use('/user', userRoutes);
app.use('/password', resetPasswordRoutes);
app.use('/message', messageRoutes);

app.use((req,res) =>{
    res.sendFile(path.join(__dirname,`public/${req.url}`))
})

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

sequelize.sync()
.then(app.listen(process.env.PORT || 3000))
.catch(err=> console.log(err));