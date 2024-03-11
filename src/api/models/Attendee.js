const mongoose = require('mongoose')

const attendeeSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    img: { type: String, trim: true, required: false },
    email: { type: String, required: true },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'user'
    },
    eventsAttending: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'event'
      }
    ]
  },
  {
    timestamps: true,
    collection: 'attendees'
  }
)

const Attendee = mongoose.model('attendees', attendeeSchema, 'attendees')
module.exports = Attendee
