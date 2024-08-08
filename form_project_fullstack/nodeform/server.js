import { db, connectToDb } from './db.js';
import express from 'express';
import { ObjectId } from 'mongodb';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const collectionName = 'users';

app.get('/api/users/:id', async (req,res) => {
    const { id } = req.params;

    try {
        const user = await db.collection(collectionName).findOne({ _id: new ObjectId(id) });
        if (user) {
            res.json(user);
            console.log(user);
        } else {
            res.sendStatus(404);
        }
    }
    catch (error) {
        res.status(500).json({ message: "failed to retireve user", error})
        console.log(error);   
    }
})

app.post('/api/users', async (req, res) => {
    const { firstname, lastname, email, contact, gender,resume, url, selectChoice, about } = req.body;
    const user = { firstname, lastname, email, contact, gender, resume, url, selectChoice, about };

    try {
        const result = await db.collection(collectionName).insertOne(user);
        res.status(201).json(result);
        console.log(result);
    } catch (error) {
        res.status(500).json({ message: "failed to add user",error });
        console.error(error);
    }
});

connectToDb((error) => {
    console.log('successfully connected to database');
    app.listen(8000, () => {
        console.log('Server is running on port 8000');
    })
    console.error(error);
})
