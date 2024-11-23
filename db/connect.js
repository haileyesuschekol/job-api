require('dotenv').config()

const mongoose = require('mongoose')

const connectDB = () => {
   mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('Db connected Successfully!')
  }).catch((error)=>console.log(error))
}

module.exports = connectDB
