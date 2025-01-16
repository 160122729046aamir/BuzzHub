import mongoose from 'mongoose';


export const connectDB=async()=>{
    try{
        const connect=await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${connect.connection.host}`);
       
    }catch(err){
        console.log(`MongoDB Error: `,err)
    }
}