const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
// const mariadb = require('mariadb');
/* const mariadb = require('mysql'); // mariadb connection 연결안됨. 그래서 대체 함.

const connection = mariadb.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database,
});

connection.connect();

app.get('/api/customers', (req, res) => {
    connection.query('SELECT * FROM CUSTOMER', (err, rows, field) => {
        res.send(rows);
    });
}); */

const mysql = require('mysql');
// 커넥션 풀 생성
const pool = mysql.createPool({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database,
    connectionLimit: conf.connectionLimit,
    waitForConnections: true,
});

// // 풀에서 커넥션 획득
// pool.getConnection();
pool.on('acquire', function (connection) {
    console.log('Connection %d acquired', connection.threadId);
});
pool.on('release', function (connection) {
    console.log('Connection %d released', connection.threadId);
});

// app.get('/api/customers', (req, res) => {
//     pool.query('SELECT * FROM CUSTOMER', (err, rows, field) => {
//         if (err) {
//             throw err;
//         } else {
//             console.log(rows);
//             res.send(rows);
//         }
//     });
//     // connection.release();
// });

const multer = require('multer');
const upload = multer({ dest: './upload' });
app.use('/image', express.static('./upload'));

pool.getConnection(function (err, connection) {
    if (err) {
        throw err;
    } else {
        // 커넥션 사용
        app.get('/api/customers', (req, res) => {
            connection.query('SELECT * FROM CUSTOMER WHERE isDeleted = 0', (err, rows, field) => {
                res.send(rows);
            });
        });

        app.post('/api/customers', upload.single('image'), (req, res) => {
            let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)';
            let image = '/image/' + req.file.filename;
            let name = req.body.name;
            let birthday = req.body.birthday;
            let gender = req.body.gender;
            let job = req.body.job;
            let params = [image, name, birthday, gender, job];
            connection.query(sql, params, (err, rows, fields) => {
                res.send(rows);
                console.log(err);
            });
        });

        app.delete('/api/customers/:id', (req, res) => {
            let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?';
            let params = [req.params.id];
            connection.query(sql, params, (err, rows, fields) => {
                res.send(rows);
            });
        });
    }
    // 커넥션 반환 ( 커넥션 종료 메소드가 커넥션과 다르다 )
    connection.release();
});

app.listen(port, () => console.log(`Listening on port ${port}`));
