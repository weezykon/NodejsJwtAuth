const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateSignup, validateLogin } = require('../validation');

router.post('/register', async (req, res) => {
    // Validate form
    const { error } = validateSignup(req.body);
    if (error) return res.status(400).send(error.details[0].message); 

    // Check if user exist
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('User Already Exists');

    // Secure password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Process user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone,
    });
    try {
        const newUser = await user.save();
        res.send(newUser);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post('/login', async (req, res) => {
    // Validate form
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message); 

    // Check if user exist
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('User Already Exists');

    // Check Password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Password is Invalid');

    // Json Web Token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth_token', token).send(token);
});

module.exports = router;