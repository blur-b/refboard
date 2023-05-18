const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    email: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: 'Users'
})

module.exports = mongoose.model('User', userSchema);