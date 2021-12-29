const mongoCollections = require('../config/mongoCollections');
const traffic = mongoCollections.traffic;
let addTraffic = async function (visitTime, username) {
    const trafficCollection = await traffic();
    let newTraffic = {
        visitTime: visitTime,
        username: username
    }

    await trafficCollection.insert(newTraffic);
};

let getOnlineUserList = async function () {
    const trafficCollection = await traffic();
    const onlineUsersList = await trafficCollection.find({ "visitTime": { $gt: new Date(Date.now() - 24 * 60 * 60) } }).toArray();
    return onlineUsersList;
};


module.exports = {
    getOnlineUserList: getOnlineUserList,
    addTraffic: addTraffic
};