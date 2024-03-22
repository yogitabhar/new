// dbMiddleware.js

import sql from 'msnodesqlv8';
import dbConfig from './dbConfig.js';

let conn; // Initialize database connection variable

// Middleware function to establish and manage database connection
export function databaseMiddleware(req, res, next) {
    if (!conn) {
        const connectionString = `DSN=${dbConfig.DSN};UID=${dbConfig.userName};PWD=${dbConfig.password};Database=${dbConfig.database}`;
        sql.open(connectionString, (err, connection) => {
            if (err) {
                console.error("Failed to connect to the database:", err);
                res.status(500).send("Internal Server Error");
            } else {
                console.log("Database connected successfully");
                conn = connection;
                req.db = {
                    connection: conn,
                    request: connection.query.bind(connection) // Use query method to execute queries
                }; // Attach database connection and request object to request object
                next(); // Move to the next middleware or route handler
            }
        });
    } else {
        req.db = {
            connection: conn,
            request: conn.query.bind(conn) // Use query method to execute queries
        }; // Attach existing database connection and request object to request object
        next(); // Move to the next middleware or route handler
    }

}
