const User = require('../models/user');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const users = require('express').Router();
//const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const {
    validateSignupData,
    validateLoginData,
} = require('../utils/validators');

users.use(cors())

process.env.SECRET_KEY = 'secret';

users.get('/', (req, res, next) => {
    User.find()
        .then(d => {
            res.json(d)
            console.log(d);
        })
        .catch(err => {
            res.send('err: ' + err)
        })
})

// SIGNUP
users.post('/signup', (req, res, next) => {
    const { body } = req;
    const newUser = {
        username,
        email,
        password,
        confirmpassword
    } = body;

    // VALIDATE DATA
    const { valid, errors } = validateSignupData(newUser);
    if (!valid) return res.status(400).json(errors);

    //email = email.toLowerCase();

    // VERIFY EMAILS

    User.findOne({
        email: email
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(password, bcrypt.genSaltSync(8), (error, hash) => {
                    newUser.password = hash;
                    User.create(newUser)
                        .then(user => {
                            res.json({ status: user.email + 'registered' })
                        })
                        .catch(err => {
                            res.send('err: ' + err)
                        })
                })
                /**
                let token = jwt.sign(user, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })*/
            } else {
                return res
                    .status(403)
                    .json({ general: 'user already exists' });
            }
        })
        .catch(err => {
            console.log(err);

            res.send('err: ' + err)
        })
});

// LOGIN
users.post('/signin', (req, res, next) => {
    const { body } = req;
    const loggeduser = {
        email,
        password
    } = body;

    // VALIDATE LOGIN DATA
    const { valid, errors } = validateLoginData(loggeduser);
    if (!valid) return res.status(400).json(errors);

    // VERIFY EMAILS

    User.findOne({
        email: email
    })
        .then(u => {
            if (u) {
                if (bcrypt.compareSync(loggeduser.password, u.password)) {
                    const payload = {
                        _id: u._id,
                        username: u.username,
                        email: u.email,
                        likedmovies: u.likedmovies,
                        reviews: u.reviews
                    }
                    /** 
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 10000
                    })*/
                    //res.json({ token })
                    //res.send(token)
                } else {
                    res.json({ error: 'User does not exist' })
                }
            } else {
                return res
                    .status(403)
                    .json({ general: 'Wrong credentials, please try again' });
            }
        })
        .catch(err => {
            res.send('err: ' + err)
        })
});

// GET PROFILE
users.post('/profile', (req, res, next) => {
    //const decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    const { body } = req;
    const loggeduser = {
        _id
    } = body;


    User.findOne({
        _id: loggeduser._id
    })
        .then(u => {
            if (u) {
                res.json(u)
            } else {
                res.send("user doesnot exist")
            }
        })
        .catch(err => {
            res.send('err: ' + err)
        })
});


// ADDING LIKED MOVIE
users.post('/like-movie', (req, res, next) => {

    const { body } = req;
    const loggeduser = {
        _id
    } = body;

    const moviedata = {
        moviename,
        likes,
        reviews,
    } = body;


    User.findOne({
        _id: loggeduser._id
    })
        .then(u => {
            if (u) {
                let likedata = u.likedmovies;
                for (const i in likedata) {
                    if (moviedata.moviename === likedata[i].moviename) {
                        likedata.splice(likedata.indexOf(likedata[i]), 1);
                        res.json({ success: "movie already added" })
                    }
                }
                User.updateOne(
                    { $push: { likedmovies: moviedata } }
                )
                    .then(
                        res.json({ success: "movie added" })
                    )
                    .catch(err => {
                        res.send('err: ' + err)
                    })
            } else {
                res.send("user doesnot exist")
            }
        })
        .catch(err => {
            res.send('err: ' + err)
        })
});


// ADDING MOVIE REVIEW
users.post('/add-review', (req, res, next) => {
    const { body } = req;
    /**
     *         user_id,
        movie_id,
        movie_image,
     */

    const userReviewData = {
        user_id,
        moviename,
        username,
        review,
    } = body;


    User.findOne({
        _id: userReviewData._id
    })
        .then(u => {
            if (u) {
                let data = u.userReviewData;
                for (const i in data) {
                    if (userReviewData.moviename === data[i].moviename) {
                        data.splice(data.indexOf(data[i]), 1);
                        res.json({ success: "review already added" })
                    }
                }
                User.updateOne(
                    { _id: userReviewData._id },
                    { $push: { reviews: userReviewData } }
                )
                    .then(
                        res.json({ success: "review added" })
                    )
                    .catch(err => {
                        res.send('err: ' + err)
                    })
            } else {
                res.send("user doesnot exist")
            }
        })
        .catch(err => {
            res.send('err: ' + err)
        })
});



module.exports = users;


/**
 router.route('/signup').post((req, res, next) => {
    const { body } = req;
    const email = email.toLowerCase();
    const newUser = {
        username,
        email,
        password,
        confirmpassword
    } = body;

    console.log(newUser);


    // VALIDATE DATA


    //email = email.toLowerCase();

    // VERIFY EMAILS
    User.find({
        email: email
    }, (err, previousUsers) => {
        if (err) {
            return res.send({
                success: false,
                message: `Error: ${err}`
            })
        } else if (previousUsers.length > 0) {
            return res.send({
                success: false,
                message: 'Error: Account Already Exists'
            })
        }

        // SAVE USER

        const nUser = new User;

        nUser.email = email;
        nUser.password = nUser.generateHash(password);
        nUser.username = username;

        nUser.save((err, user) => {
            if (err) {
                return res.send({
                    success: false,
                    message: `Error: ${err}`
                })
            }
            return res.send({
                success: true,
                message: 'SIGNED UP'
            })
        })


    })
});
 */