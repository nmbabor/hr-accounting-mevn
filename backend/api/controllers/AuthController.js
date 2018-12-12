const User = require('../models/User')
const Session = require('../modules/acc/budget/session/Session')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthController {
    async login(req, res, next) {
        let email = req.body.email
        let password = req.body.password
        let session = await Session.findOne({active:1})
        User.findOne({email}).then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        res.status(500).json({
                            message: 'Error Occured!'
                        })
                    }
                    if (result) {
                        let token = jwt.sign({name: user.name, email: user.email, _id: user._id,role:user.role,regiment_id:user.regiment_id,session:session._id}, 'SECRET', {expiresIn: "24h"})
                        res.json({
                            message: 'Login Successfully.',
                            token
                        })
                    } else {
                        res.status(401).json({
                            message: 'Login Faild. password doesn\'t matched!'
                        })
                    }

                });
            } else {
                res.status(400).json({
                    message: 'User not found!'
                })
            }
        }).catch(err => {
            res.status(400).json({
                message: 'User not found!'
            })
        })
    }
    tokenCheck(req,res,next){
        try {
            var token = req.headers.authorization.split(' ')[1];

            if (!token) {
                return next(new Error('No token Provided'));
            }

            jwt.verify(token, 'SECRET', function (err, decoded) {
                if (err) {
                    return res.status(401).json(err);
                }

                return res.status(200);
            });
        } catch (e) {
            res.status(401).json({
                message: 'Authentication Faild!'
            })
        }

    }
    async permissionCheck(req,res,next){
        let input = req.body
        let user = req.decoded
        let data = await PermissionRole.findOne({group:user.role})

    }
}
module.exports = new AuthController;