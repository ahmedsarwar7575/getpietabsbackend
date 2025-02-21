
import express from "express"
import helmet from "helmet"
import cors from 'cors'
import { errorMiddleware } from "@/middlewares/error.js"
import morgan from "morgan"
import dotenv from "dotenv"
import { sequelize } from './config/dbConfig'

// Importing tab1 routes

import tab1Routes from './routes/tab1'
import tab1FromRoutes from './routes/tab1Form'


dotenv.config({ path: './.env', });

export const envMode = process.env.NODE_ENV?.trim() || 'DEVELOPMENT';
const PORT = process.env.PORT || 3000;


const app = express();


app.use(
  helmet({
    contentSecurityPolicy: envMode !== "DEVELOPMENT",
    crossOriginEmbedderPolicy: envMode !== "DEVELOPMENT",
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ' * ', credentials: true }));
app.use(morgan('dev'))


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Routes

app.use('/api', [tab1Routes, tab1FromRoutes])

app.get("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
  });
});

app.use(errorMiddleware);

sequelize.sync(
  // { alter: true }
).then(async () => {
  // await syncAssociations();
  app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
  });


});