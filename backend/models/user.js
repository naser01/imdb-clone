const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, default: '' },
    email: { type: String, required: true, default: '' },
    password: { type: String, required: true, default: '' },
    likedmovies: [],
    reviews: []
}, {
    timestamps: true,
});


const User = mongoose.model('User', UserSchema);

module.exports = User;