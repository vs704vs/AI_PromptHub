import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async function(){
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log("Already connected to database");
        return;
    }

    else{
        try {
            await mongoose.connect(process.env.MONGODB_URI, {
                dbName:  "share_prompt",
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })

            isConnected = true;
            console.log("Connected to MongoDB");

        } catch (error) {
            console.log(error);
        }
    }
}