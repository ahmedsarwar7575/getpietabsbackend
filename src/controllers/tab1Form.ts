import { Request, Response } from "express";
import { Tab1Form } from "../models/tab1Form";
import { tab1FormMail } from "../utils/mails/tab1FormMail"; // Import mail service
import { Tab1 } from "@/models/tab1";

// Create a new Tab1Form
export const createTab1Form = async (req: Request, res: Response) => {
    try {
        const { businessEmail, businessName, merchantName, businessAddress, meetingTime, meetingDate } = req.body;

        // Validation for required fields
        if (!businessEmail || typeof businessEmail !== "string") {
            return res.status(400).json({ error: "businessEmail is required and must be a string" });
        }
        if (!businessName || typeof businessName !== "string") {
            return res.status(400).json({ error: "businessName is required and must be a string" });
        }
        if (!merchantName || typeof merchantName !== "string") {
            return res.status(400).json({ error: "merchantName is required and must be a string" });
        }
        if (!businessAddress || typeof businessAddress !== "string") {
            return res.status(400).json({ error: "businessAddress is required and must be a string" });
        }
        if (!meetingTime || typeof meetingTime !== "string") {
            return res.status(400).json({ error: "meetingTime is required and must be a string" });
        }
        if (!meetingDate || isNaN(Date.parse(meetingDate))) {
            return res.status(400).json({ error: "meetingDate is required and must be a valid date" });
        }

        const tab1Data = await Tab1.findOne({
            attributes: ['image'],
            raw: true
        })
        console.log(tab1Data)
        if (!tab1Data) {
            return res.status(404).json({ error: "Tab1 data not found" });
        }

        const flyerImageUrl = tab1Data.image

        if (!flyerImageUrl || typeof flyerImageUrl !== "string") {
            return res.status(400).json({ error: "flyerImageUrl is required and must be a valid URL" });
        }

        // Create a new form entry in DB
        const newForm = await Tab1Form.create({
            businessEmail,
            businessName,
            merchantName,
            businessAddress,
            meetingTime,
            meetingDate,
            flyerImageUrl,
        });

        // Send email with flyer
        const emailResponse = await tab1FormMail(businessEmail, merchantName, flyerImageUrl);

        if (!emailResponse.success) {
            return res.status(500).json({ error: "Failed to send flyer email", form: newForm });
        }

        res.status(201).json({
            message: "Form submitted successfully. Flyer sent to the provided email.",
            form: newForm,
        });
    } catch (error) {
        console.error("Error creating Tab1Form:", error);
        res.status(500).json({ error: "Failed to create Tab1Form" });
    }
};


// Get all Tab1Forms
export const getAllTab1Forms = async (req: Request, res: Response) => {
    try {
        const forms = await Tab1Form.findAll();
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Tab1Forms" });
    }
};

// Get a single Tab1Form by ID
export const getTab1FormById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const form = await Tab1Form.findByPk(id);
        if (!form) {
            return res.status(404).json({ error: "Tab1Form not found" });
        }
        res.status(200).json(form);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Tab1Form" });
    }
};

// Update a Tab1Form
export const updateTab1Form = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { businessName, merchantName, businessAddress, meetingTime, meetingDate } = req.body;

        const form = await Tab1Form.findByPk(id);
        if (!form) {
            return res.status(404).json({ error: "Tab1Form not found" });
        }

        // Partial updates: Validate only the fields provided
        const updates: { [key: string]: any } = {};
        if (businessName !== undefined) {
            if (typeof businessName !== "string") {
                return res.status(400).json({ error: "businessName must be a string" });
            }
            updates.businessName = businessName;
        }
        if (merchantName !== undefined) {
            if (typeof merchantName !== "string") {
                return res.status(400).json({ error: "merchantName must be a string" });
            }
            updates.merchantName = merchantName;
        }
        if (businessAddress !== undefined) {
            if (typeof businessAddress !== "string") {
                return res.status(400).json({ error: "businessAddress must be a string" });
            }
            updates.businessAddress = businessAddress;
        }
        if (meetingTime !== undefined) {
            if (typeof meetingTime !== "string") {
                return res.status(400).json({ error: "meetingTime must be a string" });
            }
            updates.meetingTime = meetingTime;
        }
        if (meetingDate !== undefined) {
            if (isNaN(Date.parse(meetingDate))) {
                return res.status(400).json({ error: "meetingDate must be a valid date" });
            }
            updates.meetingDate = meetingDate;
        }

        await form.update(updates);
        res.status(200).json(form);
    } catch (error) {
        res.status(500).json({ error: "Failed to update Tab1Form" });
    }
};

// Delete a Tab1Form
export const deleteTab1Form = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const form = await Tab1Form.findByPk(id);
        if (!form) {
            return res.status(404).json({ error: "Tab1Form not found" });
        }

        await form.destroy();
        res.status(200).json({ message: "Tab1Form deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete Tab1Form" });
    }
};
