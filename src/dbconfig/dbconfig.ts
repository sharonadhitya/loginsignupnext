import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Sharon:Sharon%402005@cluster0.5ul87u3.mongodb.net/myDatabase';

export default async function connect() {
    if (mongoose.connection.readyState >= 1) {
        return mongoose.connection;
    }

    return mongoose.connect(MONGODB_URI).then((connection) => {
        console.log('db connected');
        return connection;
    }).catch((error) => {
        console.error("Mongodb connection error:", error);
        process.exit();
    });
}
