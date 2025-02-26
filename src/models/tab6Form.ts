import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/dbConfig"; // Adjust the path to your Sequelize instance

// Define the model
export class Tab6Form extends Model {
    public id!: number;
    public businessEmail!: string;
    public businessName!: string;
    public merchantName!: string;
    public businessAddress!: string;
    public meetingTime!: string; // Assuming meeting time is a string like '10:00 AM'
    public meetingDate!: Date; // Storing the meeting date as a Date object

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the model
Tab6Form.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        businessName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        businessEmail: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        merchantName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        businessAddress: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        meetingTime: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        meetingDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize, // Pass the Sequelize instance
        tableName: "tab6Form", // Adjust table name as required
        timestamps: true, // Enable createdAt and updatedAt fields
    }
);

