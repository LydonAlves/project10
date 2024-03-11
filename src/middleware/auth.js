const User = require('../api/models/User')
const { verifyKey } = require('../utils/jwt')

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    // console.log(token)
    const parsedToken = token.replace('Bearer ', '')
    // console.log(parsedToken)
    const { id } = verifyKey(parsedToken)
    // console.log('----------')
    // console.log(id)

    const user = await User.findById(id)
    // console.log(user)
    user.password = null
    req.user = user
    next()
  } catch (error) {
    return res.status(400).json("You're not authorised to do this action")
  }
}

module.exports = isAuth
