const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createJWT } = require("../utils/authentication");

const emailRegex = /^(?!.*\.{2})[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

exports.signup = (req, res, next) => {
    let { username, email, password, password_confirmation } = req.body;

    let errors = [];
    // validation
    if (!username) {
        errors.push({ username: "required" });
    }
    if (email && !emailRegex.test(email)) {
        errors.push({ email: "invalid" });
    }
    if (!password) {
        errors.push({ password: "required" });
    }
    if (!password_confirmation) {
        errors.push({ password_confirmation: "required" });
    }
    if (password !== password_confirmation) {
        errors.push({ password: "mismatch" });
    }
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    } 
    
    User.findOne({username: username})
    .then(user => {
        if (user) {
            return res.status(400).json({ errors: [{ user: "username already exists" }] });
        }
        else {
            const user = new User({
                username: username,
                email: email,
                password: password,
            })
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    if (err) throw err;
                    user.password = hash;
                    user.save()
                    .then(response => {
                        res.status(200).json({
                            success: true,
                            result: response
                        })
                    })
                    .catch(err => {
                        res.status(500).json({ errors: [{ error: err }] });
                    });
                });
            });
        }
    })
    .catch(err => {
        res.status(500).json({ errors: [{ error: err }] });
    });
}

exports.login = (req, res) => {
    let { username, password } = req.body;

    User.findOne({ username: username })
    .then(user => {
        if (!user) {
            return res.status(404).json({
                errors: [{ user: "not found" }]
            });
        }
        else {
            bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (!isMatch) {
                    return res.status(400).json({ errors: [{ password: "incorrect" }] });
                }
                
                let access_token = createJWT(user.username, user._id, 3600); // 1hr expiration
                jwt.verify(access_token, process.env.TOKEN_SECRET, (err, decoded) => {
                    if (err) {
                        res.status(500).json({ errors: err });
                    }
                    if (decoded) {
                        return res.status(200).json({
                            success: true,
                            token: access_token,
                            message: user
                        });
                    }
                });
            })
            .catch(err => {
                res.status(500).json({ errors: err });
            });
        }
    })
    .catch(err => {
        res.status(500).json({ errors: err });
    });
}