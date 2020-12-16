const bcrypt = require('bcrypt');
const dbCon = require('./dbConnection');
const pool = dbCon.dbConnect(); 

exports.signupUser = (req, res) => {
    const userInfo;
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        userInfo = [
            req.body.username,
            req.body.email,
            hash
        ];
    });

    console.log(userInfo);
    

    createNewUser(userInfo, (err, result) => {
        if (err) {
            res.status(500).json({success: false, data: err});
        } else {
            res.status(200).json(result);
        }
    })
}

function createNewUser(uuserInfo, callback) {
    console.log("Creating new User...");
    const sql = "INSERT INTO users VALUES (default, $1::text, $2::text, $3::text)";
    pool.query(sql, userInfo, (err, res) => {
        if (err) {
            console.log("Error in query: ");
            console.log(err);
            callback(err, null);
        }

        console.log("New User created.");

        callback(null, res.rowCount);
    });
}