import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/dbConfig"; // Adjust the path to your Sequelize instance
// Define the model
export class Tab6 extends Model {
    id;
    image;
    // Timestamps
    createdAt;
    updatedAt;
}
// Initialize the model
Tab6.init({
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
}, {
    sequelize, // Pass the Sequelize instance
    tableName: "tab6", // Ensure this matches your actual DB table
    timestamps: true,
});
