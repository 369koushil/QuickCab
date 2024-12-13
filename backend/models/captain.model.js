const mongoose=require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const captainSchema=new mongoose.Schema({
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
    socketId: {
        type: String
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            min:[3,'minimum 3 char color']
        },
        vehicleType:{
           type:String,
           require:true,
           enum:['car','auto','motocycle']
        },
        vehicleNo:{
            type:String,
            require:true,
            min:[3,'req 3 char plateNo']
        },
        vehicleCapacity:{
            type:Number,
            require:true,
            min:[1,'atleast one capacity req']
        }
    },
    location:{
        latitude:{
            type:String,
        },
        longitude:{
            type:String,
        }
    }
})


captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}

captainSchema.methods.comparepassword = async function (password) {
    const res = await bcrypt.compare(password, this.password);
    return res;
}

captainSchema.statics.hashpassword = async function (password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
}


const Captain=mongoose.model('Captain',captainSchema);

module.exports=Captain;