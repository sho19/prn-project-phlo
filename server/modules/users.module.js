var bcrypt = require('bcryptjs');
const userProfile = require("../db/models/user")

module.exports.addUser = function ({ username, age, score, password }) {
    return new Promise(async function (resolve, reject) {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            let userData = {
                username: username,
                age: age,
                score: score,
                password: hashedPassword
            }
            console.log(userData)
            let addUserData = await userProfile.addUser(userData)
            if (addUserData.result) {
                resolve({ "result": true });
            }
            else {
                resolve({"message": 'failed to add userdata into the user profile table' })
            }
        }
        catch (e) {
            console.log(e)
            resolve({ "message": 'error occured while adding the user' })
        }
    })
};


// module.exports.verifyUser = function ({ username, age, score, password }, submittedPassword) {
//     try {
//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(password, salt)
//         let userData = {
//             username: username,
//             age: age,
//             score: score,
//             password: password
//         }
//         console.log(userData)
//         let addUserData = await userProfile.addUser(userData)
//         if (addUserData.result) {
//             resolve({ "result": true });
//         }
//         else {
//             resolve({ "result": false, "message": 'failed to add userdata into the user profile table' })
//         }
//     }
//     catch (e) {
//         console.log(e)
//         resolve({ "result": false, "message": 'error occured while adding the user' })
//     }

// };  