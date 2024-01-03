// what is the difference when importing with {} and without {} and if you search for jwt in 
// the jsonwebtoken you will not find it how so 
import jwt from "jsonwebtoken";

const validateToken = (req, res, err, next) => {
  const token = req.cookie('jwt');
  if(jwt.verify(token, process.env.JWT_SECRET)){
    next()
  }
  throw new Error("your api is borken");
}

export default validateToken;