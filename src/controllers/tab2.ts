import { Tab2 } from "../models/tab2";
import { Request, Response } from "express";
import path from "path";

// Create API
export const createTab2 = async (req: Request, res: Response) => {
    try {
        const { description } = req.body;
        const image = req.file?.filename; // Ensure it's properly extracted

        if (!image) {
            return res.status(400).json({ error: "Image is required" });
        }

        const newTab2 = await Tab2.create({ image, description });
        res.status(201).json(newTab2);
    } catch (error) {
        res.status(500).json({ error: "Failed to create tab2" });
    }
};

// Get API - Return full image URL
export const getTab2 = async (req: Request, res: Response) => {
    try {
        const tab2 = await Tab2.findOne();

        if (!tab2) {
            return res.status(404).json({ error: "Tab2 not found" });
        }
        console.log(tab2)

        const baseUrl = "http://localhost:4000/uploads/";
        const tab2WithUrl = {
            ...tab2.toJSON(),
            image: `${baseUrl}${tab2.dataValues.image}`
        };

        res.status(200).json(tab2WithUrl);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch tab2" });
    }
};


// Patch API - Update image if provided
export const updateTab2 = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const image = req.file?.filename; // Get the new image if uploaded

        const tab2 = await Tab2.findByPk(id);
        if (!tab2) return res.status(404).json({ message: "Tab2 not found" });

        // Update fields only if new data is provided
        const updatedData: { image?: string; description?: string } = {};
        if (description) updatedData.description = description;
        if (image) updatedData.image = image; // Only update the image if a new file is uploaded

        await tab2.update(updatedData);

        res.status(200).json(tab2);
    } catch (error) {
        res.status(500).json({ error: "Failed to update tab2" });
    }
};

// Delete API
export const deleteTab2 = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const tab2 = await Tab2.findByPk(id);
        if (!tab2) return res.status(404).json({ message: "Tab2 not found" });

        await tab2.destroy();
        res.status(200).json({ message: "Tab2 deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete tab2" });
    }
};
