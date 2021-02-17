const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/config');

const register = async (email, password) => {
    const user = new User({ email, password });
    return await user.save();
}

const login = async (email, password) => {
    let user = await User.findOne({ email });

    if (!user) {
        return Promise.reject({ message: 'Incorrect email or password', status: 404 });
    }

    let isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
        return Promise.reject({ message: 'Incorrect email or password', status: 404 });
    }

    let token = jwt.sign({ _id: user._id, email: user.email }, SECRET);
    return token;
}

module.exports = {
    register,
    login
}