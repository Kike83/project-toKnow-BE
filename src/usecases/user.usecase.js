const User = require ("../models/user.model")

const getAll = () => {
    return User.find({})
}

const getById = (id) => {
    return User.findById(id)
}

module.exports = { getAll, getById}