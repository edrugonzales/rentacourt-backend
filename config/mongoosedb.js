const mongoose = require('mongoose');
require('dotenv').config()
let db;
mongoose.Promise = global.Promise;
module.exports.connectToDatabase = async (req, res) => {
    try {
        db = await mongoose.connect(process.env.MONGO_KEY, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        return ({ success: true, msg: `Database connected ::: ${db.connection.host}` });
    } catch (error) {
        console.error(`Error::: ${error.message}`);
        process.exit(1);
    }
};


module.exports.disconnectToDatabase = async () => {
    try {
        db.disconnect();
        console.log(`Database disconnected`);
    } catch (error) {
        console.error(`Error::: ${error.message}`);
        process.exit(1);
    }
};