const express = require("express")
const routes = express.Router()

const userController = require('../../controller/user/userController')

module.exports.userRoutes = () => {
    routes.post('/newuser', userController.saveUser)
    routes.get('/allUsers', userController.getUserdetails)
    routes.delete('/deleteuser/:_id', userController.deleteUser)
    routes.put('/editUser/:_id', userController.editUser)
    return routes
}


