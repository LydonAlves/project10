const Attendee = require('../models/Attendee')
const Event = require('../models/Event')
const User = require('../models/User')

// const getAllAttendees = async (req, res, next) => {
//   try {
//     // console.log('function activated')
//     //!how will I send this here?
//     const { eventID } = req.params
//     const event = await Event.findById(eventID).populate('usersAttending')
//     // console.log(event)
//     if (!event) {
//       return res.status(404).json({ message: 'Event not found' })
//     }

//     const attendees = await event.usersAttending

//     return res.status(200).json(attendees)
//   } catch (error) {
//     return res.status(400).json(error)
//   }
// }

const getAllAttendees = async (req, res, next) => {
  try {
    const ids = req.query.ids.split(',')
    const attendees = await Attendee.find({ _id: { $in: ids } })
    return res.status(200).json(attendees)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const getAttendeeByID = async (req, res, next) => {
  try {
    const { userId } = req.params

    const attendee = await Attendee.findOne({ userId: userId })

    return res.status(200).json(attendee)
  } catch (error) {
    console.error('Error fetching attendee:', error)
    return res.status(400).json(error)
  }
}

const addAttendeeToEvent = async (req, res, next) => {
  try {
    console.log('Request path:', req.path)
    // console.log('Parameters:', req.params)
    //! this id must be the event ID added to the url
    const { eventID } = req.params
    // console.log(eventID)
    // console.log(req.user._id)
    const userId = req.user._id
    // console.log(userId)
    const event = await Event.findById(eventID)
    // console.log(event.usersAttending)
    if (
      event.usersAttending
        .map((id) => id.toString())
        .includes(userId.toString())
    ) {
      return res.status(400).json('User already an attendee')
    }
    console.log('made it to here')

    const updatedEvent = await Event.findByIdAndUpdate(
      eventID,
      { $addToSet: { usersAttending: userId } },
      {
        new: true
      }
    )

    //! I removed this cause I only want the attendees to have lists of events
    // const updateUsersEvents = await User.findByIdAndUpdate(
    //   userId,
    //   {
    //     $addToSet: { eventsAttending: eventID }
    //   },
    //   {
    //     new: true
    //   }
    // )

    const attendeeDuplicated = await Attendee.findOne({
      userId: userId
    })

    if (!attendeeDuplicated) {
      console.log('reached here')
      const newAttendee = new Attendee({
        userName: req.user.userName,
        email: req.user.email,
        userId: req.user._id,
        eventsAttending: eventID
      })
      const attendee = await newAttendee.save()
    } else {
      const updateAttendee = await Attendee.findByIdAndUpdate(
        attendeeDuplicated._id,
        {
          $addToSet: { eventsAttending: eventID }
        },
        {
          new: true
        }
      )
    }

    // console.log(updatedEvent)
    // return res.status(200).json('updated')
    return res.status(200).json(updatedEvent)
  } catch (error) {
    return res.status(400).json(error)
  }
}

module.exports = {
  getAllAttendees,
  getAttendeeByID,
  addAttendeeToEvent
}
