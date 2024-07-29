const mongoose = require("mongoose");
const Token = require("../model/token");
const Connection = async () => {
    const URL = process.env.MONGO_DB;
    try {

        mongoose.connect(URL)
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};

mongoose.connection.on('disconnected', () => {
    console.log("mongoDb disconnected");
});
mongoose.connection.on('connected', () => {
    console.log("mongoDb connected");
});

module.exports = Connection;