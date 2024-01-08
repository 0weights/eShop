import bcrypt from 'bcrypt';

const hashPassword = async(plainPassword) => {
  // what is salt the 10 value is salt
  try{
    let salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(plainPassword, salt);
  }
  catch(error){
    throw new Error("something wrong with hashing password");
  }
}

export {hashPassword};