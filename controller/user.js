let userModel = require("../models/user")
let {Sequelize} = require("sequelize")

let config = require("../config/config")
const jwt = require("jsonwebtoken")



let user = async(req,res)=>{
    try {
        
        let{id,name} = req.body;
        let payload = {
            userId: id
        }
        let user_Token = jwt.sign(payload,config.secreateKey)
        let newUser = await userModel.build({
            id:id,
            name:name,
            token:user_Token
        })
        await newUser.save()

        res.status(200).send({
            newUser: newUser
        })
    } catch (error) {
        res.status(500).send({
            message:error
        })
    }
}

let deleteUser = async(req,res)=>{
    try {
        let data = await userModel.destroy({where:{id:req.userId.userId}
        })
        console.log(data,"-------------------->>");
        res.status(200).send({
            message: "user deleted sucessfuly",
         })
    } catch (error) {
        console.log(error,"----------------------->");
        res.status(500).send({
                message:error
        })
    }
}

let updateUser = async(req,res)=>{
    try {
         
        let {updateData} = req.body;
        console.log(updateData);
        let findUser = await userModel.findByPk(req.params.id)
        if(!findUser){
            res.status(400).send({
                message: "user not found with this id"
            })
        }else{
        let newUser = await userModel.update(updateData,{
            where:{id:req.params.id}
        })
       
        res.status(200).send({
            updatedUser: newUser
        })
    }
    }
     catch (error) {
        console.log(error,"------------------------------>>");
        res.status(500).send({
            message:error
        })
    }
}

let user_data = async(req,res)=>{
    try {    
       
        let newUser = await userModel.findByPk(req.userId.userId)
        if(newUser){
        res.status(200).send({
            newUser: newUser
        })
    }else{
        res.status(400).send({
            message: "give proper token"
        }) 
    }
    }
     catch (error) {
        console.log(error,"-------------->");
        res.status(500).send({
            message:error
        })
    }
}


module.exports = {
    user,
    deleteUser,
    updateUser,
    user_data
}