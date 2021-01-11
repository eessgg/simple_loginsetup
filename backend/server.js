import './config/loadenv.js';
import { database } from "./config/vars.js";
import express from 'express';
import mongoose from 'mongoose';
import expressValidator from 'express-validator';
import morgan from 'morgan';
import cors from 'cors'
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(expressValidator());
app.use(morgan('dev'));
app.use(cors());

// connect
mongoose.connect(database.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
.then(() => console.log(`DB is connected.`))
.catch(err => console.log(err));

// routes
import authRoutes from './routes/auth_routes.js';
import userRoutes from './routes/user_routes.js';

// /api/users/register
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server working on ${PORT}`))