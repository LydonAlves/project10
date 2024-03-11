const deleteFile = require('../../utils/deleteFile')
const Event = require('../models/Event')

const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find()
    return res.status(200).json(events)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const getEventByID = async (req, res, next) => {
  try {
    const { id } = req.params
    const event = await Event.findById(id)
    return res.status(200).json(event)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const postEvent = async (req, res, next) => {
  console.log('working')
  console.log(req.body)
  try {
    const newEvent = new Event(req.body)
    if (req.file) {
      // console.log(req.file)
      newEvent.img = req.file.path
    }

    const event = await newEvent.save()
    return res.status(201).json(event)
  } catch (error) {
    console.error('Error in postEvent:', error)
    return res.status(400).json(error)
  }
}

//!not essential to start
const updateEvent = async (req, res, next) => {
  console.log('working')
  try {
    const { id } = req.params
    const newEvent = new Event(req.body)
    newEvent._id = id

    if (req.file) {
      //*this substitutes the file in mongodb
      newEvent.img = req.file.path
      //*this removes the file from cloudinary
      const oldEvent = await Event.findById(id)
      deleteFile(oldEvent.img)
    }
    const eventUpdated = await Event.findByIdAndUpdate(id, newEvent, {
      new: true
    })
    return res.status(200).json(eventUpdated)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params
    const eventDeleted = await Event.findById(id)
    deleteFile(eventDeleted.img)
    return res
      .status(200)
      .json({ message: 'Event deleted successfully', eventDeleted })
  } catch (error) {
    return res.status(400).json(error)
  }
}

module.exports = {
  getAllEvents,
  getEventByID,
  postEvent,
  updateEvent,
  deleteEvent
}
