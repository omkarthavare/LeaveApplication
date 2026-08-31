require("dotenv").config();

const app = require('./app');
const db = require("./config/db.js")

const port = process.env.port || 5000;

async function startServer() {
    try {
        await db.query("select 1")
        console.log("Mysql connected Successfully")

        app.listen(port, () => {
            console.log(`server is running on port  ${port}`);
            console.log(`Local URL: http://localhost:${port}`);
        })

    } catch (error) {
        console.error("Database connection failed", error.message)
    }

}

startServer()