import { Tab2Form } from "../models/tab2Form";
import { tab2FormMail } from "../utils/mails/tab2FormMail"; // Import mail service
import { Tab2 } from "../models/tab2";
// Create a new Tab1Form
export const createTab2Form = async (req, res) => {
    const { action } = req.params;
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
        // Fetch image from Tab1
        const tab2Data = await Tab2.findOne({
            attributes: ['image'],
            raw: true
        });
        console.log(tab2Data);
        if (!tab2Data) {
            return res.status(404).json({ error: "Tab2 data not found" });
        }
        // Construct full URL for the image
        const baseUrl = "http://localhost:4000/uploads/";
        const flyerImageUrl = tab2Data.image ? `${baseUrl}${tab2Data.image}` : null;
        if (!flyerImageUrl) {
            return res.status(400).json({ error: "flyerImageUrl is required and must be a valid URL" });
        }
        // Create a new form entry in DB
        const newForm = await Tab2Form.create({
            businessEmail,
            businessName,
            merchantName,
            businessAddress,
            meetingTime,
            meetingDate,
            flyerImageUrl,
        });
        // Send email with flyer
        const emailResponse = await tab2FormMail(businessEmail, merchantName, flyerImageUrl, action);
        if (!emailResponse.success) {
            return res.status(500).json({ error: "Failed to send flyer email", form: newForm });
        }
        res.status(201).json({
            message: "Form submitted successfully. Flyer sent to the provided email.",
            form: newForm,
        });
    }
    catch (error) {
        console.error("Error creating Tab2Form:", error);
        res.status(500).json({ error: "Failed to create Tab2Form" });
    }
};
// Get all Tab2Forms
export const getAllTab2Forms = async (req, res) => {
    try {
        const forms = await Tab2Form.findAll();
        res.status(200).json(forms);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch Tab2Forms" });
    }
};
// Get a single Tab2Form by ID
export const getTab2FormById = async (req, res) => {
    try {
        const { id } = req.params;
        const form = await Tab2Form.findByPk(id);
        if (!form) {
            return res.status(404).json({ error: "Tab2Form not found" });
        }
        res.status(200).json(form);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch Tab2Form" });
    }
};
// Update a Tab2Form
export const updateTab2Form = async (req, res) => {
    try {
        const { id } = req.params;
        const { businessName, merchantName, businessAddress, meetingTime, meetingDate } = req.body;
        const form = await Tab2Form.findByPk(id);
        if (!form) {
            return res.status(404).json({ error: "Tab2Form not found" });
        }
        // Partial updates: Validate only the fields provided
        const updates = {};
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
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update Tab2Form" });
    }
};
// Delete a Tab2Form
export const deleteTab2Form = async (req, res) => {
    try {
        const { id } = req.params;
        const form = await Tab2Form.findByPk(id);
        if (!form) {
            return res.status(404).json({ error: "Tab2Form not found" });
        }
        await form.destroy();
        res.status(200).json({ message: "Tab2Form deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete Tab2Form" });
    }
};
