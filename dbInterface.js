const getUserByNumber = (userNum) => {
    return {
        id: userNum
    }
}

const storeUser = (user) => {
    console.log("USER STORED: ", user);
}

module.exports.getUserByNumber = getUserByNumber;
module.exports.storeUser = storeUser;