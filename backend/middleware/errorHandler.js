
const errorHanddler = (err, req, res, next)=>{
  let errorMessage;
  if(err.name == 'CastError' && err.type == 'objectId')
    errorMessage = "NOT FOUNT";
  else
    errorMessage = process.env.NODE_ENV === "development" ? err.stack : "Error Happened";
  res.json({'message' : errorMessage});
}

export default errorHanddler;