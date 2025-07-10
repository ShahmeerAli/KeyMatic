import mongoose from 'mongoose';

const connectMongodb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected");
    }catch(err){
        console.log("Error connecting", err);
    }
}

export default connectMongodb;
