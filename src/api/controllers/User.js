const { generateKey } = require('../../utils/jwt')
const User = require('../models/User')
const bcrypt = require('bcrypt')

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const getAllUsersFromEvent = async (req, res, next) => {
  console.log(req.body)
  try {
    const ids = req.body.ids
    console.log(ids)
    const usersAttending = await User.find({ _id: { $in: ids } })
    console.log(usersAttending)
    return res.status(200).json(usersAttending)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const register = async (req, res, next) => {
  try {
    const userDuplicated = await User.findOne({ userName: req.body.userName })

    if (userDuplicated) {
      return res
        .status(409)
        .json('User already exists, choose a different name.')
    }

    const newUser = new User({
      userName: req.body.userName,
      password: req.body.password,
      email: req.body.password
    })
    // console.log('check 3')
    const user = await newUser.save()
    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { userName, password } = req.body
    const user = await User.findOne({ userName })

    if (!user) {
      return res.status(400).json('User or password are incorrect')
    }

    if (bcrypt.compareSync(password, user.password)) {
      const token = generateKey(user._id)
      return res.status(200).json({ token, user })
    }

    return res.status(400).json('User or password are incorrect')
  } catch (error) {
    return res.status(400).json(error)
  }
}

const updateUser = async (req, res, next) => {
  console.log('check 1')

  try {
    const { id } = req.params

    //!this must be added when auth is added
    // if (req.user._id.toString() !== id.toString()) {
    //   return res.status(400).json("You can't modify someone else's user")
    // }

    // const oldUser = await User.findById(id)
    const newUser = new User(req.body)
    newUser._id = id

    const userUpdated = await User.findByIdAndUpdate(id, newUser, {
      new: true
    })

    return res.status(200).json(userUpdated)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const userDeleted = await User.findByIdAndUpdate(id)
    return res.status(200).json(userDeleted)
  } catch (error) {
    return res.status(400).json(error)
  }
}

module.exports = {
  getAllUsers,
  getAllUsersFromEvent,
  getUserById,
  register,
  login,
  updateUser,
  deleteUser
}
