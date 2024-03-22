import express from 'express';
import { createUser, getMarks, getUserById, updateUser, deleteUser } from '../controllers/crud.js';
import { databaseMiddleware } from '../config/dbMiddleware.js';

const router = express.Router();

// CRUD routes
export default function createRouter() {
    router.use(databaseMiddleware); // Use database middleware

    router.post('/create', (req, res) => createUser(req, res));
    router.get('/get', (req, res) => getMarks(req, res));
    router.get('/getById/:userId', (req, res) => getUserById(req, res));
    router.put('/update/:userId', (req, res) => updateUser(req, res));
    router.delete('/delete/:userId', (req, res) => deleteUser(req, res));
    
    return router;
}
