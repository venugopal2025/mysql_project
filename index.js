const express = require('express')
const bodyparse = require("body-parser")
const app = express()
const userModel = require("./models/user")

const userController = require("./router/user")
let port = 4000


app.use(bodyparse.json())
app.use(userController)


userModel.sync({force: false})
app.listen(port,()=>{
    console.log("server run on port number ..................");
})