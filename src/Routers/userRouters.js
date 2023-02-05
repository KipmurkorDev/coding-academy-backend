const express = require('express');
const userRouter = express.Router();
const {registeUser, loginUser}=require('../Controllers/userController')


userRouter.post('/register', registeUser);
userRouter.post('/login', loginUser);

module.exports = userRouter; 