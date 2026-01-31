import mongoose from 'mongoose';

export const connectDB = async() => {
     try{

          const {MONGO_URI} = process.env;
          if(!MONGO_URI) throw new Error("MONGO_URI is not Set");
          const conn = await mongoose.connect(process.env.MONGO_URI)
          console.log("MONGODB CONNECTED WITH HOST : ", conn.connection.host)
     }
     catch(error){
          console.error("ERROR CONNECTING TO MONGO DB", error)
          process.exit(1) //1 MEANS FAILURE AND 0 MEANS SUCCESS
     }
}