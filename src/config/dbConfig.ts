import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from "sequelize";

// Validate environment variables
const DB_NAME = process.env.DB_NAME || (() => { throw new Error("DB_NAME is not defined in .env"); })();
const DB_USER = process.env.DB_USER || (() => { throw new Error("DB_USER is not defined in .env"); })();
const DB_PASSWORD = process.env.DB_PASSWORD || (() => { throw new Error("DB_PASSWORD is not defined in .env"); })();
const DB_HOST = process.env.DB_HOST || (() => { throw new Error("DB_HOST is not defined in .env"); })();
const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306; // Default to 3306 if not provided

// Define database connection parameters
export const sequelize = new Sequelize(
    DB_NAME, // Database name
    DB_USER, // Database username
    DB_PASSWORD, // Database password
    {
        host: DB_HOST, // Database host
        port: DB_PORT, // Database port
        dialect: 'mysql', // Explicitly specify the database dialect
        dialectOptions: {
            connectTimeout: 60000, // Increase the timeout
            ssl: {
                require: true, // Use SSL
                rejectUnauthorized: false, // Allow self-signed certificates
            },
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000, // Default acquire timeout
            idle: 10000, // Default idle timeout
        },
    }
);

// Test the connection
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

// Call the testConnection function to establish the connection
testConnection();
