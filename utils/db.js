import mongoose from 'mongoose'

const connectDb = async function (dbURI) {
  try {
    await mongoose.connect(dbURI)
    console.log('DB connected')
  } catch (err) {
    console.log(err)
  }
}

export default connectDb
