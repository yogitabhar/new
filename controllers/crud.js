// controllers/crud.js

import sql from 'msnodesqlv8';

// Create user function
export async function createUser(req, res) {
    const user = req.body;

    // Check if user object is defined
    if (!user || !user.id || !user.username || !user.gmail) {
        return res.status(400).send('ID, Username, and Gmail are required');
    }
    try {
        const { id, username, gmail } = user;
    
        // Use the database connection object attached to req
        const query = `INSERT INTO Marks_ (id, username, gmail) VALUES (${id}, '${username}', '${gmail}')`;
        req.db.request(query, (err, result) => {
            if (err) {
                console.error('Error creating user:', err);
                return res.status(500).send('Error creating user');
            }
    
            console.log('Result:', result); // Log the result object
    
            if (result ) {
                // Log the recordset if available
                res.status(201).send(result); // Send response
            } else {
                console.error('Recordset is undefined or empty');
                res.status(500).send('Recordset is undefined or empty');
            }
        });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).send('Error creating user');
    }
    
}


// Other CRUD functions remain the same

// Read all Marks// controllers/crud.js

export async function getMarks(req, res) {
    try {
        const query = `SELECT * FROM Marks_`;
        req.db.request(query, (err, result) => {
            if (err) {
                console.error('Error fetching Marks:', err);
                return res.status(500).send('Error fetching Marks');
            }
            
            console.log('Result:...', result); // Log the result object
            
            if (result) {
                 // Log the recordset if available
                res.status(200).send(result); // Send response with 200 status
            } else {
                console.error('Recordset is undefined or empty');
                res.status(500).send('Recordset is undefined or empty');
            }
        });
    } catch (err) {
        console.error('Error fetching Marks:', err);
        throw err;
    }
}


// Read single user by id
export async function getUserById(req, res) {
   
        try {
            const { id } = req.params.id;
            console.log(id) // Assuming id is passed in the URL
            const query = `SELECT * FROM Marks_ WHERE id = ${id}`;
            req.db.request(query, (err, result) => {
                if (err) {
                    console.error('Error fetching user by ID:', err);
                    return res.status(500).send('Error fetching user by ID');
                }
                if (result && result.recordset && result.recordset.length > 0) {
                    console.log('User found:', result.recordset[0]);
                    res.status(200).send(result.recordset[0]); // Send response with the user data
                } else {
                    console.log('User not found');
                    res.status(404).send('User not found'); // Send 404 if user is not found
                }
            });
        } catch (err) {
            console.error('Error fetching user by ID:', err);
            res.status(500).send('Error fetching user by ID');
        }
    }
    


// Update
export async function updateUser(req, res) {
    const { id } = req.params; // Assuming id is passed in the URL
    const newData = req.body;

    try {
        const { username, gmail } = newData;
        const query = `UPDATE Marks_ SET username = '${username}', gmail = '${gmail}' WHERE id = ${id}`;
        req.db.request(query, (err, result) => {
            if (err) {
                console.error('Error updating user:', err);
                return res.status(500).send('Error updating user');
            }
            res.status(200).send('User updated successfully:', result); // Send response
        });
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).send('Error updating user');
    }
}

// Delete
export async function deleteUser(req, res) {
    const { id } = req.params; // Assuming id is passed in the URL

    try {
        const query = `DELETE FROM Marks_ WHERE id = ${id}`;
        req.db.request(query, (err, result) => {
            if (err) {
                console.error('Error deleting user:', err);
                return res.status(500).send('Error deleting user');
            }
            res.status(200).send('User deleted successfully'); // Send response
        });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).send('Error deleting user');
    }
}
