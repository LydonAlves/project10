const isAuth = require('../../middleware/auth')
const upload = require('../../middleware/file')
const {
  getEventByID,
  getAllEvents,
  postEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/Event')

const eventsRouter = require('express').Router()

eventsRouter.get('/:id', getEventByID)
eventsRouter.get('/', getAllEvents)

//!to test I use the one without isAuth
// eventsRouter.post('/', [isAuth],upload.single('img'), postEvent)
eventsRouter.post('/', upload.single('img'), postEvent)
eventsRouter.put('/:id', upload.single('img'), updateEvent)
eventsRouter.delete('/:id', deleteEvent)

module.exports = eventsRouter
