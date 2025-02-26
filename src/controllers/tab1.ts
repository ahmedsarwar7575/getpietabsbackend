import { Tab1 } from "../models/tab1";
import { Request, Response } from "express";
import path from "path";

// Create API
export const createTab1 = async (req: Request, res: Response) => {
    try {
        const { description } = req.body;
        const image = req.file?.filename; // Ensure it's properly extracted

        if (!image) {
            return res.status(400).json({ error: "Image is required" });
        }

        const newTab1 = await Tab1.create({ image, description });
        res.status(201).json(newTab1);
    } catch (error) {
        res.status(500).json({ error: "Failed to create tab1" });
    }
};

// Get API - Return full image URL
export const getTab1 = async (req: Request, res: Response) => {
    try {
        const tab1 = await Tab1.findOne();

        if (!tab1) {
            return res.status(404).json({ error: "Tab1 not found" });
        }
        console.log(tab1)

        const baseUrl = "http://localhost:4000/uploads/";
        const tab1WithUrl = {
            ...tab1.toJSON(),
            image: `${baseUrl}${tab1.dataValues.image}`
        };

        res.status(200).json(tab1WithUrl);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch tab1" });
    }
};


// Patch API - Update image if provided
export const updateTab1 = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const image = req.file?.filename; // Get the new image if uploaded

        const tab1 = await Tab1.findByPk(id);
        if (!tab1) return res.status(404).json({ message: "Tab1 not found" });

        // Update fields only if new data is provided
        const updatedData: { image?: string; description?: string } = {};
        if (description) updatedData.description = description;
        if (image) updatedData.image = image; // Only update the image if a new file is uploaded

        await tab1.update(updatedData);

        res.status(200).json(tab1);
    } catch (error) {
        res.status(500).json({ error: "Failed to update tab1" });
    }
};

// Delete API
export const deleteTab1 = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const tab1 = await Tab1.findByPk(id);
        if (!tab1) return res.status(404).json({ message: "Tab1 not found" });

        await tab1.destroy();
        res.status(200).json({ message: "Tab1 deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete tab1" });
    }
};
