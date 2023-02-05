require('dotenv').config();
const express=require('express')
const mongoose=require('mongoose')
const cors = require("cors");
const app = express()
app.use(express.json())
app.use(cors());
// applying middleware to connect to user router
const userRouter=require('./Routers/userRouters')

// database connnection via local or mongodb atlas url or local 
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected!'));

app.use('/api/users/', userRouter)

// creating server
app.listen(process.env.PORT, () => {
  console.log(` App is listening on port ${process.env.PORT}`)
})
