const Note = require('../models/note')
const pick = require('lodash/pick')

module.exports.list = (req, res) => {
    Note.find({ user: req.user._id })
        .then(note => {
            res.json(note)
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.create = (req, res) => {
    console.log(req.file)
    const body = pick(req.body, ['title', "description", 'category'])
    const note = new Note(body)
    note.user = req.user._id
    note.save()
        .then(note => {
            res.json(note)
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.show = (req, res) => {
    const id = req.params.id
    Note.findOne({ _id: id, user: req.user._id })
        .then(note => {
            if (note) {
                res.json(note)
            } else {
                res.json({})
            }
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.update = (req, res) => {
    const id = req.params.id
    const body = pick(req.body, ['title', "description", 'category'])
    Note.findOneAndUpdate({ _id: id, user: req.user._id }, body, { new: true, runValidators: true })
        .then(note => {
            if (note) {
                res.json(note)
            } else {
                res.json({})
            }
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.destroy = (req, res) => {
    const id = req.params.id
    console.log(id)
    Note.findOneAndDelete({ _id: id, user: req.user._id })
        .then(note => {
            if (note) {
                res.json(note)
            } else {
                res.json({})
            }
        })
        .catch(err => {
            res.json(err)
        })
}