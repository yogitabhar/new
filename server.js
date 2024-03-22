
import express from "express";
import sql from "msnodesqlv8";
import createRouter from "./routes/routes.js";
import { databaseMiddleware } from "./config/dbMiddleware.js";
import dbConfig from "./config/dbConfig.js";

const app = express();
const PORT = 3000;

const { DSN, userName, password, database } = dbConfig;
const connectionString = `DSN=${DSN};UID=${userName};PWD=${password};Database=${database}`;

app.use(express.json());

sql.open(connectionString, (err, conn) => {
    if (err) {
        console.error("Failed to connect to the database:", err);
    } else {
        console.log("Database connected successfully");

      
        app.use('/crud', createRouter(conn));
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
