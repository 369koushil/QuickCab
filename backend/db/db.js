const mongoose = require("mongoose");
const db_string = process.env.DB_String
function connectToDb() {
    mongoose.connect(db_string).then(c => {
        console.log(`connected sucessfully ${c.connection.host}`);
    }).catch(err => console.log(err))
}

module.exports = connectToDb;