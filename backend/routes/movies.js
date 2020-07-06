let Movie = require('../models/movies');
const cors = require('cors');
const movies = require('express').Router();

movies.use(cors())

movies.get('/', (req, res) => {

    Movie.find()
        .then(d => {
            res.json(d)
        })
        .catch(err => {
            res.send('err: ' + err)
        })
})

movies.post('/add-review-to-movie', (req, res, next) => {
    const { body } = req;
    const movieReviewData = {
        moviename,
        reviewInfo,
    } = body;

    Movie.findOne({
        moviename: moviename
    })
        .then(m => {
            console.log(m);

            if (!m) {
                Movie.create(movieReviewData)
                    .then(user => {
                        Movie.updateOne(
                            { moviename: moviename },
                            { $push: { reviews: reviewInfo } }
                        )
                            .then(
                                res.json({ success: "review added to movie" })
                            )
                            .catch(err => {
                                res.send('err1: ' + err)
                            })
                    })
                    .catch(err => {
                        res.send('err2: ' + err)
                    })
            } else {
                // CHECKING IF THE USER ALREADY REVIEWED THE MOVIE
                let reviewdata = m.reviews;
                for (const i in reviewdata) {
                    if (reviewInfo._id === reviewdata[i]._id) {
                        reviewdata.splice(reviewdata.indexOf(reviewdata[i]), 1);
                        res.json({ success: "User already reviewed this movie" })
                    }
                }
                Movie.updateOne(
                    { moviename: moviename },
                    { $push: { reviews: reviewInfo } }
                )
                    .then(
                        res.json({ success: "review added to movie" })
                    )
                    .catch(err => {
                        res.send('err3: ' + err)
                    })
            }
        })
        .catch(err => {
            res.send('err: ' + err)
        })
})

movies.post('/add-like-to-movie', (req, res, next) => {
    const { body } = req;
    const userData = {
        username,
        _id,
        moviename
    } = body;

    Movie.findOne({
        moviename: moviename
    })
        .then(m => {
            if (!m) {
                Movie.create(userData)
                    .then(user => {
                        Movie.updateOne(
                            { moviename: moviename },
                            { $push: { likes: username } }
                        )
                            .then(
                                res.json({ success: "movie liked" })
                            )
                            .catch(err => {
                                res.send(err)
                            })
                    })
                    .catch(err => {
                        res.send(err)
                    })
            } else {
                // CHECKING IF THE USER ALREADY LIKED THE MOVIE
                let likeslist = m.likes;
                for (const i in likeslist) {
                    if (userData._id === likeslist[i]._id) {
                        likeslist.splice(likeslist.indexOf(likeslist[i]), 1);
                        res.json({ success: "User already liked this movie" })
                    }
                }
                Movie.updateOne(
                    { moviename: moviename },
                    { $push: { likes: userData } }
                )
                    .then(
                        res.json({ success: "movie liked" })
                    )
                    .catch(err => {
                        res.send('err3: ' + err)
                    })
            }
        })
        .catch(err => {
            res.send('err: ' + err)
        })
})

module.exports = movies;