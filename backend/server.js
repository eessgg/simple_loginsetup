import './config/loadenv.js';
import { database } from "./config/vars.js";
import express from 'express';
import mongoose from 'mongoose';

const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))

mongoose.connect(database.MONGO_URI, {
  useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true
}).then(() => console.log(`DB is connected.`))
.catch(err => console.log(err))


import userRoutes from './routes/user_routes.js'
// /api/users/register
app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server working on ${PORT}`))