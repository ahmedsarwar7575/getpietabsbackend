import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/dbConfig"; // Adjust the path to your Sequelize instance
// Define the model
export class Tab1Form extends Model {
    id;
    businessEmail;
    businessName;
    merchantName;
    businessAddress;
    meetingTime; // Assuming meeting time is a string like '10:00 AM'
    meetingDate; // Storing the meeting date as a Date object
    // Timestamps
    createdAt;
    updatedAt;
}
// Initialize the model
Tab1Form.init({
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
}, {
    sequelize, // Pass the Sequelize instance
    tableName: "tab1Form", // Adjust table name as required
    timestamps: true, // Enable createdAt and updatedAt fields
});
