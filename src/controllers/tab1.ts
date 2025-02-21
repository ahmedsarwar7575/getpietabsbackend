import { Tab1 } from "../models/tab1";
import { Request, Response } from "express";

// Create Api 

export const createTab1 = async (req: Request, res: Response) => {
    try {
        const { image, description } = req.body;
        const newTab1 = await Tab1.create({ image, description });
        res.status(201).json(newTab1);
    } catch (error) {
        res.status(500).json({ error: "Failed to create tab1", });
    }
};


export const getTab1 = async (req: Request, res: Response) => {
    try {
        const tab1 = await Tab1.findAll();
        res.status(200).json(tab1);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch tab1" });
    }
}

export const updatetab1 = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { image, description } = req.body;
        const tab1 = await Tab1.findByPk(id);
        if (!tab1) return res.status(404).json({ message: "Tab1 not found" });
        await tab1.update({ image, description });
        res.status(200).json(tab1);
    } catch (error) {
        res.status(500).json({ error: "Failed to update tab1" });
    }
}

export const deletetab1 = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const tab1 = await Tab1.findByPk(id);
        if (!tab1) return res.status(404).json({ message: "Tab1 not found" });
        await tab1.destroy();
        res.status(200).json({ message: "Tab1 deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete tab1" });
    }
}