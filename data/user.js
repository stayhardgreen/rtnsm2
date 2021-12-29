const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;

let userExits = async function (user, password) {
    const usersCollection = await users();
    const user_exists_check = await usersCollection.findOne({ username: user, password: password });
    if (user_exists_check)
        return true;
    else
        return false;
};

let userExitsByUserName = async function (user) {
    const usersCollection = await users();
    const user_exists_check = await usersCollection.findOne({ username: user });
    if (user_exists_check)
        return true;
    else
        return false;
};


let addUser = async function (user, password) {
    const usersCollection = await users();
    const result = await usersCollection.insert({ username: user, password: password });
    return result;
};

let getUserList = async function () {
    const usersCollection = await users();
    const usersList = await usersCollection.find().toArray();
    return usersList;
};





module.exports = {
    userExits: userExits,
    userExitsByUserName: userExitsByUserName,
    addUser: addUser,
    getUserList: getUserList
};