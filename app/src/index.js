const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};

const connection = mysql.createConnection(config)

connection.connect(() => {
    connection.query(`
    CREATE TABLE IF NOT EXISTS people(
        id INT NOT NULL AUTO_INCREMENT, 
        name VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    )`)
})


app.get('/', (req,res) => {
    connection.query(`INSERT INTO people (name) values ("Daniel Marini")`, (err, results, _) => {
        connection.query(`SELECT name FROM people as people`, (err, results, _) => {

            const payload = `
            <h1>Full Cycle Rocks!</h1>
            <ul>
                ${results.map(({ name }) => `<li>${name}</li>`).join('')}
            </ul>
            `

            res.send(payload)
        })
    })
}) 


app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})