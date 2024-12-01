const userModel = require("../models/user.model")
const blackListTokens=require("../models/blacklisttokens.model")


module.exports.createUser = async function ({ firstname, lastname, email, password }) {
    if (!firstname || !email || !password) {
        throw new Error("All feilds required");
    }
    const user = await userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    })
    return user;
}

module.exports.blackListToken=async (token)=>{
  await blackListTokens.create({token});
}