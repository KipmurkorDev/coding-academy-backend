import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import UserModel from './schemas/users.js'

const app = express()
dotenv.config()

// database connnection via local or mongodb atlas url
// mongoose.connect(process.env.DATABASE_URL)
//   .then(() => console.log('Connected!'));

const conn = mongoose.createConnection(process.env.DATABASE_URL);

// creating a new model
// const m = new UserModel;
// m.save();

// accessing a created model
// const MyModel = mongoose.model('User');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
