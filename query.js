const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'qawpzrjqnhtiaf',
    host: 'ec2-54-84-98-18.compute-1.amazonaws.com',
    database: 'd988kso6rlku9m',
    password: 'a23bf8141cd22e1349efcd30d2d7087cc2008acd3e21c34abe729a62a34c58cd',
    port: 5432
});