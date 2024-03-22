import sql from 'msnodesqlv8';

export async function createUser(req, res) {
    const user = req.body;

    if (!user || !user.id || !user.username || !user.gmail) {
        return res.status(400).send('ID, Username, and Gmail are required');
    }

    try {
        const { id, username, gmail } = user;
        const query = `INSERT INTO Marks_ (id, username, gmail) VALUES (${id}, '${username}', '${gmail}')`;
        req.db.request(query, (err, result) => {
            if (err) {
                console.error('Error creating user:', err);

                return res.status(500).send('Error creating user');
            }
            if (result) {
                res.status(200).send(result[0]);
                console.error('User addded');
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

export async function getMarks(req, res) {
    try {
        const query = `SELECT * FROM Marks_`;
        req.db.request(query, (err, result) => {
            if (err) {
                console.error('Error fetching Marks:', err);
                return res.status(500).send('Error fetching Marks');
            }
            if (result) {
                res.status(200).send(result);
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

export async function getUserById(req, res) {
    try {
        const { userId: id } = req.params;
        const query = `SELECT * FROM Marks_ WHERE id = ${id}`;
        req.db.request(query, (err, result) => {
            if (err) {
                console.error('Error fetching user by ID:', err);
                return res.status(500).send('Error fetching user by ID');
            }
            if (result) {
                res.status(200).send(result);
            } else {
                console.log('User not found');
                res.status(404).send('User not found');
            }
        });
    } catch (err) {
        console.error('Error fetching user by ID:', err);
        res.status(500).send('Error fetching user by ID');
    }
}

export async function updateUser(req, res) {
    const { userId: id } = req.params;
    const newData = req.body;

    try {
        const { username, gmail } = newData;
        const query = `UPDATE Marks_ SET username = '${username}', gmail = '${gmail}' WHERE id = ${id}`;
        req.db.request(query, (err, result) => {
            if (err) {
                console.error('Error updating user:', err);
                return res.status(500).send('Error updating user');
            }
            if (result) {
                console.log('User updated successfully');
                res.status(200).send('User updated successfully');
            } else {
                console.log('User not found or no changes made');
                res.status(404).send('User not found or no changes made');
            }
        });
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).send('Error updating user');
    }
}

export async function deleteUser(req, res) {
    const { userId:id} = req.params;

    try {
        const query = `DELETE FROM Marks_ WHERE id = ${id}`;
        req.db.request(query, (err, result) => {
            if (err) {
                console.error('Error deleting user:', err);
                return res.status(500).send('Error deleting user');
            }
            res.status(200).send('User deleted successfully');
        });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).send('Error deleting user');
    }
}
