import express from 'express';
import CRUDController from '../controllers/crud.js';
// import { createUser, getMarks, getUserById, updateUser, deleteUser } from '../controllers/crud.js';
import { databaseMiddleware } from '../config/dbMiddleware.js';

const router = express.Router();

// CRUD routes
export default function createRouter() {
    router.use(databaseMiddleware); 

    router.post('/create', (req, res) => CRUDController.createUser(req, res));
    router.get('/get', (req, res) => CRUDController.getMarks(req, res));
    router.get('/getById/:userId', (req, res) => CRUDController.getUserById(req, res));
    router.put('/update/:userId', (req, res) => CRUDController.updateUser(req, res));
    router.delete('/delete/:userId', (req, res) => CRUDController.deleteUser(req, res));
    
    return router;
}
