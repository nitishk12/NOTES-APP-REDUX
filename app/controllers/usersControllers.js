const User = require('../models/user')
const pick = require('lodash/pick')

module.exports.register = (req, res) => {
    const body = req.body
    body.ip = { register: [req.ip] }
    const user = new User(body)
    user.save()
        .then(user => {
            res.json(user)
        })
        .catch((err => {
            res.json(err)
        }))
}

module.exports.login = (req, res) => {
    const body = req.body
    let user
    User.findByCredentials(body.email, body.password)
        .then(userData => {
            user = pick(userData, ['_id', "username", "email", "mobile"])
            console.log(user)
            return userData.generateToken(req.ip)
        })
        .then(token => {
            res.send({ 'user': user, 'token': token })
        })
        .catch((err => {
            res.send(err)
        }))
        .catch((err => {
            res.send(err)
        }))
}

module.exports.account = (req, res) => {
    res.send(req.user)
}

module.exports.logout = (req, res) => {
    const { user, token } = req
    User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token } } })
        .then(() => {
            res.send({ notice: 'user successfully logout' })
        })
        .catch((err => {
            res.send(err)
        }))
}

module.exports.destroy = (req, res) => {
    const id = req.params.id
    User.findByIdAndDelete(id)
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.json({})
            }
        })
        .catch((err => {
            res.json(err)
        }))
}