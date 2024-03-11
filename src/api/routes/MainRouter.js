const attendeeRouter = require('./Attendee')
const eventsRouter = require('./Event')
const usersRouter = require('./User')

const mainRouter = require('express').Router()

mainRouter.use('/events', eventsRouter)
mainRouter.use('/attendees', attendeeRouter)
mainRouter.use('/users', usersRouter)

module.exports = mainRouter
