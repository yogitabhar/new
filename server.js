
// // import express from "express";
// // import sql from "msnodesqlv8";
// // const app = express();
// // const PORT = 3000;
// // import router from "./routes/routes.js"

// // const server = "Yogitab-PC-362";
// // const database = "CRUD";
// // const userName = "yogitab";
// // const password = "yogita@123";
// // const DSN = "yogita__"; 

// // const connectionString = `DSN=${DSN};UID=${userName};PWD=${password};Database=${database}`;

// // // Connect to the database
// // sql.open(connectionString, (err, conn) => {
// //     if (err) {
// //         console.error("Failed to connect to the database:", err);
// //         res.status(500).send("Internal Server Error");
// //     } else {
// //         console.log("Database connected successfully")
// //         app.use('/crud', router);
// //     }
// // });
// // app.use(express.json());


// // app.post('/create-table', (req, res) => {
// //     const tableName = req.body.tableName; 
// //     if (!tableName) {
// //         return res.status(400).send('Table name is required');
// //     }

// //     const createTableQuery = `CREATE TABLE ${tableName} (id INT PRIMARY KEY, username VARCHAR(255), email VARCHAR(255))`;

// //     sql.query(connectionString, createTableQuery, (err, result) => {
// //         if (err) {
// //             console.error("Error creating table:", err);
// //             return res.status(500).send("Error creating table");
// //         } else {
// //             console.log("Table created successfully");
// //             return res.status(200).send("Table created successfully");
// //         }
// //     });
// // });

// // // Start the server
// // app.listen(PORT, () => {
// //     console.log(`Server is running on port ${PORT}`);
// // });
// // main.js

// import express from "express";
// import sql from "msnodesqlv8";
// import router from "./routes/routes.js";
// import { databaseMiddleware } from "./config/dbMiddleware.js";
// const app = express();
// const PORT = 3000;

// const server = "Yogitab-PC-362";
// const database = "CRUD";
// const userName = "yogitab";
// const password = "yogita@123";
// const DSN = "yogita__";

// const connectionString = `DSN=${DSN};UID=${userName};PWD=${password};Database=${database}`;
// app.use(express.json());
// // Connect to the database
// sql.open(connectionString, (err, conn) => {
//     if (err) {
//         console.error("Failed to connect to the database:", err);
//     } else {
//         console.log("Database connected successfully");

//         // Pass the connection object to the router
//         app.use('/crud', router(conn));
//     }
// });


// // Pass the connection object to the router


// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
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
// Connect to the database
sql.open(connectionString, (err, conn) => {
    if (err) {
        console.error("Failed to connect to the database:", err);
    } else {
        console.log("Database connected successfully");

        // Pass the connection object to the router
        app.use('/crud', createRouter(conn));
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
