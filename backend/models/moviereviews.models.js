const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    moviename: { type: String, required: true },
    username: { type: String, required: true },
    likes: { type: Number, required: true },
    reviews: { type: String, required: true },
}, {
    timestamps: true,
});

const User = mongoose.model('Users', usersSchema);

module.exports = User;