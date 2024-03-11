const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    img: { type: String, trim: true, required: false },
    password: { type: String, required: true },
    email: { type: String, required: true }
    // eventsAttending: [
    //   {
    //     type: mongoose.Types.ObjectId,
    //     required: false,
    //     ref: 'event'
    //   }
    // ]
  },
  {
    timestamps: true,
    collection: 'users'
  }
)

userSchema.pre('save', function () {
  this.password = bcrypt.hashSync(this.password, 10)
})

const User = mongoose.model('users', userSchema, 'users')
module.exports = User
