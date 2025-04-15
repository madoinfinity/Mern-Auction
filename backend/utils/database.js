import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const data = await mongoose.connect(process.env.MONG_URI, {
    
    });
        console.log("Connected to the DATABASE");
        console.log(`listening on port ${process.env.PORT}`);
    } catch (error) {
        console.log(error);
    }
}