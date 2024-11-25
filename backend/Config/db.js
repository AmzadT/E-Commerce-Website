require('dotenv').config();
const mongoose = require('mongoose');

const Connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = Connection;





// require('dotenv').config()
// const mongoose = require('mongoose')

// const Connection = mongoose.connect(process.env.MONGO_URL)

// module.exports = Connection;
