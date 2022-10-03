const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.jwtt, (err, user) => {
      if (err){ res.status(403).json("Token is not valid!");}
      else{
      req.user = user;

      return next();
      }
        
      


    })
    ;
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
         return next();
    } else {
      res.status(403).json({msg:"You are not alowed to do that!"});
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      return next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};

// const veryfyToken = (req, res, next) => {
//     const bearerHeader = req.headers.token;
//     if (bearerHeader) {
//         const token = bearerHeader.split(' ')[1];
//         jwt.verify(token, process.env.jwtt,(err, authData) => {
//             if (err) {
//                 res.sendStatus(403).json("Forbidden");
//             } else {
//                 req.user = authData;
//                 next();
//             }
//         });
        
//     } else {

//         res.status(401).json({
//             message: 'Auth failed'
//         });
//     }
// }
// const verifyTokenandAuth = (req, res, next) => {
//     veryfyToken(req, res, ()=>{
//         if(req.user.id === req.params.id || req.user.isAdmin){
//         res.send({
//             message: 'You can not update your own account'
           
//         })
//          next();
//     }else{
//         res.send({
//             message: 'You can update other user account'
//         })
//     }
//     });
    
// }
// module.exports = veryfyToken ,verifyTokenandAuth;