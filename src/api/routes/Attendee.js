const isAuth = require('../../middleware/auth')
const {
  getAllAttendees,
  getAttendeeByID,
  addAttendeeToEvent
} = require('../controllers/Attendee')

const attendeeRouter = require('express').Router()

attendeeRouter.get('/:userId', getAttendeeByID)
attendeeRouter.get('/getAll/:eventID', getAllAttendees)
attendeeRouter.post('/:eventID', isAuth, addAttendeeToEvent)

module.exports = attendeeRouter
