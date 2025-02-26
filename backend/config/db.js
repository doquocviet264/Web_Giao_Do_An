import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://doquocviet264:26042004@cluster0.tapp3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/food-del').then(() => console.log('DB Connected'));
}