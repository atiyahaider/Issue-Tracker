const mongoose = require('mongoose');
const express = require('express');
const app = express();

let _db;

module.exports = {
    initDb: (callback) => {
        if (_db) {
            console.warn("Trying to init DB again!");
            return callback(null, _db);
        }

        // Connect to the database
        mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true}, connected);

        function connected(err, db) {
            if (err) 
                return callback(err);
            
            console.log("DB initialized");
            mongoose.Promise = global.Promise;
            db = mongoose.connection;
            db.on('error', console.error.bind(console, 'MongoDB connection error:'));
            
            _db = db;
            return callback(null, _db);
        }   
    },

    getDb: () => {
        console.log(_db, "DB has not been initialized. Please called init first.");
        return _db;
    }
}