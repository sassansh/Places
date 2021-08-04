import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const connection = process.env.PLACES_DB_URI

console.log('Trying to connect to MongoDB Atlas (cloud)')
mongoose
  .connect(connection, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log('Database Connected Successfully'))
  .catch((err) => console.log(err))
