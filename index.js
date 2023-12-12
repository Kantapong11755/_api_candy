const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection(process.env.DATABASE_URL);

app.get('/product-forklifts', (req, res) => {
    db.query("SELECT * FROM forklifts", (err, result) => {
        if (err) {
            console.log(err);
        }else {
            res.send(result);
        }
    })
})


app.get('/', (req, res) => {
    db.query('SELECT * FROM product_gp', (err, result) => {
        if (err) {
            console.log(err);
        }else {
            res.send(result);
        }
    })
})


app.get('/product-all/:model', async (req, res) => {
    const model = req.params.model;
    console.log(model);
    db.query('SELECT * FROM product WHERE MODEL = ?', [model], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(result);
        }
    });
});




app.listen(process.env.PORT || 3000)
