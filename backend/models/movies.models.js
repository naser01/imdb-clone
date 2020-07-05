const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    moviename: { type: String, required: true, default: '' },
    user: { type: Object },
    likes: [],
    reviews: []
}, {
    timestamps: true,
});


const Movie = mongoose.model('Movies', MovieSchema);
module.exports = Movie;