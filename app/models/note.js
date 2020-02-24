const mongoose = require('mongoose')

const Schema = mongoose.Schema

const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    user: {
        type: Schema.Types.ObjectId
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note