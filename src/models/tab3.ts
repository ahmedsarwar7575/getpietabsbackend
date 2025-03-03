import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/dbConfig"; // Adjust the path to your Sequelize instance

// Define the model
export class Tab3 extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public businessName!: string;
    public phone!: string;
    public yearsInBusiness!: string;
    public marketingNow!: string;
    public effectiveMarketing!: string;
    public monthlyMarketingBudget!: string;
    public targetAudience!: string;
    public idealLead!: string;
    public customersIncrease!: string;
    public primaryProduct!: string;
    public frontBusinessPicture!: string;
    public businessLogo!: string;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the model
Tab3.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true, // Ensure the email is valid
            },
        },
        businessName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        yearsInBusiness: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        marketingNow: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        effectiveMarketing: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        monthlyMarketingBudget: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        targetAudience: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idealLead: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        customersIncrease: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        primaryProduct: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        frontBusinessPicture: {
            type: DataTypes.STRING,
            allowNull: true, // Set to `false` if this field is mandatory
        },
        businessLogo: {
            type: DataTypes.STRING,
            allowNull: true, // Set to `false` if this field is mandatory
        },
    },
    {
        sequelize, // Pass the Sequelize instance
        tableName: "tab3", // Adjust table name as required
        timestamps: true, // Enable createdAt and updatedAt fields
    }
);

