
import express from "express"
import helmet from "helmet"
import cors from 'cors'
import { errorMiddleware } from "@/middlewares/error.js"
import morgan from "morgan"
import dotenv from "dotenv"
import { sequelize } from './config/dbConfig'
import { fileURLToPath } from "url";


// Importing tab1 routes

import tab1Routes from './routes/tab1'
import tab1FromRoutes from './routes/tab1Form'
import tab6Routes from './routes/tab6'
import tab6FormRoutes from './routes/tab6Form'
import tab2Routes from './routes/tab2'
import tab2FormRoutes from './routes/tab2Form'
import tab3Routes from './routes/tab3'


import path from "path"

dotenv.config({ path: './.env', });

export const envMode = process.env.NODE_ENV?.trim() || 'DEVELOPMENT';
const PORT = process.env.PORT || 3000;


const app = express();

// make upload folder accessible for browser

// Manually define __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploads folder statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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

app.use('/api', [tab1Routes, tab1FromRoutes, tab6Routes, tab6FormRoutes, tab2Routes, tab2FormRoutes, tab3Routes])

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

module.exports = app