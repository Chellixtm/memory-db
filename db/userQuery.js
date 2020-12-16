const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dbCon = require('./dbConnection');
const pool = dbCon.dbConnect();

exports.signupUser = (req, res) => {
    let userInfo;
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            userInfo = [
                req.body.username,
                req.body.email,
                hash
            ];

            createNewUser(userInfo, (err, result) => {
                if (err) {
                    res.status(500).json({
                        success: false,
                        data: err
                    });
                } else {
                    res.status(200).json(result);
                }
            });
        });
}

function createNewUser(userInfo, callback) {
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

exports.loginUser = (req, res) => {
    let userDatabase;
    getUserByName(req.body.username, (err, result) => {
        if (err) {
            console.log("Error: " + err);
        } else if (!result) {
            return res.status(401).json({
                message: "User Doesn't Exist"
            });
        } else {
            userDatabase = result;
            bcrypt.compare(req.body.password, userDatabase.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({
                            user_id: userDatabase.user_id,
                            username: userDatabase.username,
                            email: userDatabase.email
                        },
                        'secret_testing_auth_for_jwt_for_project_2',
                        { expiresIn: "1h"}
                        );
                    res.status(200).json({
                        token: token
                    });
                } else {
                    res.status(401).json({
                        message: err
                    });
                }
            });
        }
    });


}

function getUserByName(username, callback) {
    console.log("Getting user " + username);
    const sql = "SELECT * FROM users WHERE username = $1::text";
    pool.query(sql, [username], (err, res) => {
        if (err) {
            console.log("Error in query: ");
            console.log(err);
            callback(err, null);
        }

        console.log("Query successful");
        callback(null, res.rows);
    });
}