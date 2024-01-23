import dotenv       from "dotenv"
import connectToDb  from './backend/config/dp.js';
import colors       from "colors";

//search is there is a way to import without writing .js
import User         from './backend/models/UserModel.js';
import users        from './backend/models/Data/users.js';
import Product      from './backend/models/ProductModel.js';
import products     from './backend/models/Data/products.js';
import Order        from './backend/models/OrderModel.js';

dotenv.config();

connectToDb();

const initializeDb = async() => {
  try{
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    const usersData = await User.insertMany(users);
    let productsWithAdmin = products.map((product)=>(
      {...product, 'user':usersData[0]._id}
    ))
    await Product.insertMany(productsWithAdmin);
    // search inverse
      console.log('Database Initialization Successfully'.green.inverse);

  }
  catch(error){
    console.log(error.message.red.inverse);
  }
}

const destroyDbData = async() => {
  try{
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log('Database Destroied Successfully'.green.inverse);
  }
  catch(error){
    console.log(error.message.red.inverse);
  }
}

if(process.argv[2] == undefined){
  initializeDb();
}
else{
  destroyDbData();
}