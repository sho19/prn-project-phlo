const express = require('express');
const router = new express.Router();
const userModule = require('../modules/users.module')
const userProfile = require("../db/models/user")
const bcrypt = require('bcryptjs');

router.post("/register-user", async (req, res) => {

    const body = req.body;
    if (body.username && body.age && body.score && body.password) {

        const alreadyExists = await userProfile.getUser({ username: body.username });

        if (!alreadyExists.result) {
            let isUserAdded = await userModule.addUser(body);
            if (isUserAdded.result) {
                res.json({ result: true })
            }
            else {
                res.json(isUserAdded)
            }
        }
        else {
            res.json({ message: "user already exists" })
        }

    }
    else {
        res.json({ message: "required body params not present" })
    }

});

router.post('/login', async (req, res) => {
    const body = req.body;
    if (body.username && body.password) {

        const userdata = await userProfile.getUser({ username: body.username });

        if (userdata.result) {
            
            if (await bcrypt.compare(body.password, userdata.value.password)) {
                const userDetails = {
                    username: userdata.value.username,
                    age: userdata.value.age,
                    score: userdata.value.score
                }
                res.cookie('userdata', userDetails);
                res.status(200);
                res.json({ result: true })
            } else {
                res.status(400)
                res.json({ message: "password was incorrect" })
            }
        }
        else {
            res.status(400)
            res.json({ message: "There is no user is registered with the specified username" })
        }
    }
    else {
        res.status(400)
        res.json({ message: "required body params not present" })
    }
});



module.exports = router;