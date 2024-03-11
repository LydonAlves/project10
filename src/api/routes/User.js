const {
  getUserById,
  getAllUsers,
  register,
  login,
  updateUser,
  deleteUser,
  getAllUsersFromEvent
} = require('../controllers/User')

const usersRouter = require('express').Router()

usersRouter.get('/:id', getUserById)
usersRouter.post('/usersAttending', getAllUsersFromEvent)
usersRouter.get('/', getAllUsers)
usersRouter.post('/register', register)
usersRouter.post('/login', login)
usersRouter.put('/:id', updateUser)
usersRouter.delete('/:id', deleteUser)

module.exports = usersRouter
