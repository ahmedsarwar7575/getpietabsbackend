import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/dbConfig"; // Adjust the path to your Sequelize instance

// Define the model
export class Tab6 extends Model {
    public id!: number;
    public image!: string;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the model
Tab6.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize, // Pass the Sequelize instance
        tableName: "tab6", // Ensure this matches your actual DB table
        timestamps: true,
    }
);

