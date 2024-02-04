let userController = require("../controller/user")
let express = require("express")
let router = express.Router()
let verification = require("../middleware/verification")

router.post("/addUser",userController.user)
router.delete("/deleteUser",verification.verifyToken,userController.deleteUser)
router.put("/updateUser/:id",verification.verifyToken, userController.updateUser)
router.get("/getUserData",verification.verifyToken,userController.user_data)


module.exports = router;