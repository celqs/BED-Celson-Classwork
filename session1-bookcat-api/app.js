const express = require('express');
const sql = require('mssql');
const dbConfig = require("./dbConfig");
const app = express();
app.get('/', (req, res) => {
res.send('Welcome to the Book Category API');
});

let categories = [
    { id: 1, name: 'Fiction' },
    { id: 2, name: 'Non-Fiction' },
    { id: 3, name: 'Biography' }
];
app.get('/categories', (req, res) => {
    categories.push({ id: 4, name: 'Poetry' });
    res.json(categories);
});
app.get('/db-test', async (req, res) => {
try {
const pool = await sql.connect({
server: 'localhost',
port: 1433,
database: 'NPBookstore',
user: 'npbookstore_user',
password: 'Pl4tinum',
options: { trustServerCertificate: true },
});

app.get("/authors", async (req, res) => {
    let connection;
    try {
        connection = await sql.connect(dbConfig);
        const result = await connection
            .request()
            .query("SELECT AuthorID, Name FROM Author");
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (closeErr) {
                console.error("Error closing connection:", closeErr);
            }
        }
    }
})
const result = await pool.request()
.query('SELECT COUNT(*) AS Total FROM Author');
await pool.close();
res.json({ connected: true, authors: result.recordset[0].Total });
} catch (err) {
res.status(500).json({ connected: false, error: err.message });
}
});
app.listen(3000, () => {
console.log('Listening on port 3000');
});
