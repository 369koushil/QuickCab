const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            min: [3, 'minimum length required 3char']
        },
        lastname: {
            type: String,
            min: [3, 'minimum length required 3char']
        }
    },
    email: {
        type: String,
        required: true,
        min: [3, 'minimum length required 3char']
    },
    password: {
        type: String,
        Selection:false,
        required: true,
        min: [6, 'minimum length required 6char']
    },
    sockedId: {
        type: String
    }
})


userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET)
    return token;
}

userSchema.methods.comparepassword = async function (password) {
    const res = await bcrypt.compare(password, this.password);
    return res;
}

userSchema.statics.hashpassword = async function (password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
}
const User = mongoose.model("User", userSchema);

module.exports = User;