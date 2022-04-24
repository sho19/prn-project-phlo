const { Sequelize } = require("sequelize");
const db = require("../config");

const usersTable = db.define('userstable', {
  username: {
    type: Sequelize.STRING,
  },
  age: {
    type: Sequelize.STRING
  },
  score: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});

usersTable.sync().then(() => {
  console.log('table created');
});

async function getUser(condition) {
  return new Promise(async function (resolve, reject) {
    try {
      const userData = await usersTable.findOne({ where: condition });
      if (userData === null) {
        console.log('Not found!');
        resolve({ result: false })
      } else {
        console.log('data found!');
        resolve({ result: true, value: userData })
      }
    }
    catch (e) {
      console.log(e)
      resolve({ result: false })
    }
  })
}

async function getAllUsers(condition) {
  return new Promise(async function (resolve, reject) {
    try {
      var usersData = null
      usersData = await usersTable.findAll({
        where: condition,
      });

      if (usersData === null || usersData.length == 0) {
        console.log('Not found!');
        resolve({ result: false })
      } else {
        let users = []
        usersData.forEach((element, index) => {
          users.push(element.dataValues)
        });
        console.log("array", users)

        resolve({ result: true, value: users })
      }
    }
    catch (e) {
      console.log(e)
      resolve({ result: false })
    }
  })
}

async function addUser(obj) {
  return new Promise(async function (resolve, reject) {
    try {
      await usersTable.create(obj);
      resolve({ result: true })
    }
    catch (e) {
      console.log(e)
      resolve({ result: false })
    }
  })
}

module.exports = { getUser, getAllUsers, addUser };