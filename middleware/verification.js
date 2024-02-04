// const config = require("../config/config");
// const jwt = require("jsonwebtoken");

// const verifyToken = async(req,res,next)=>{
//   try {
   
//     console.log(req.headers,"#######");
//     const { token } = req.headers.authorization;
//     console.log(token,"#############");

//     if (!token) {
//       return res.status(400).send({
//         message: "Token is required"
//       });
//     }else{

//         console.log(config.secreateKey,"-------------------------->");
//     const decoded = jwt.verify(token, config.secreateKey);
//     req.userVerify = decoded;
//     next();
//     }
//   }
//   catch (err) {
//     console.log(err,"=================>>");
//     res.status(500).send({
//       message: err.message
//     });
//   }

// };


const jwt = require("jsonwebtoken");
const SecreateKey = require("../config/config");

let verifyToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token || token === undefined || token === null) {
      // Move next() after sending the response
      return res.status(401).send({
        message: "Token is not valid",
        error: "Token is missing",
      });
    } else {
      let getToken = token.split(" ")[1];
      if (!getToken) {
        return res.status(400).send({
          message: "Provide a proper token",
        });
      }
      const decode = jwt.verify(getToken, SecreateKey.secreateKey);
      req.userId = decode;

      next();
    }
  } catch (error) {
    // Correct the status function to status(500).send
    return res.status(500).send({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { verifyToken };

