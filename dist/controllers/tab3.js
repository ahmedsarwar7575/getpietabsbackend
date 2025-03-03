import { Tab3 } from "../models/tab3";
export const createTab3 = async (req, res) => {
    try {
        const { name, email, businessName, phone, yearsInBusiness, marketingNow, effectiveMarketing, monthlyMarketingBudget, targetAudience, idealLead, customersIncrease, primaryProduct, } = req.body;
        // Cast req.files to the correct type
        const files = req.files;
        // Extract file paths from uploaded files
        const frontBusinessPicture = files.frontBusinessPicture?.[0]?.filename;
        const businessLogo = files.businessLogo?.[0]?.filename;
        // Validate required fields
        if (!name || !email || !businessName || !phone) {
            return res.status(400).json({ error: "Required fields are missing" });
        }
        // Create new Tab3 entry
        const newTab3 = await Tab3.create({
            name,
            email,
            businessName,
            phone,
            yearsInBusiness,
            marketingNow,
            effectiveMarketing,
            monthlyMarketingBudget,
            targetAudience,
            idealLead,
            customersIncrease,
            primaryProduct,
            frontBusinessPicture,
            businessLogo,
        });
        res.status(201).json(newTab3);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create tab3" });
    }
};
// Get API - Return full image URL
export const getTab3 = async (req, res) => {
    try {
        // Fetch all records from the Tab3 model
        const tab3Records = await Tab3.findAll();
        // If no records are found, return a 404 error
        if (!tab3Records || tab3Records.length === 0) {
            return res.status(404).json({ error: "No Tab3 records found" });
        }
        // Define the base URL for the images
        const baseUrl = "http://localhost:4000/uploads/";
        // Map over the records to add the full image URL to each record
        const tab3WithUrls = tab3Records.map((record) => {
            return {
                ...record.toJSON(), // Convert the Sequelize instance to a plain object
                image: `${baseUrl}${record.dataValues.image}` // Add the full image URL
            };
        });
        // Log the modified records (optional)
        console.log(tab3WithUrls);
        // Return the modified records as a JSON response
        res.status(200).json(tab3WithUrls);
    }
    catch (error) {
        // Handle any errors that occur during the process
        console.error("Error fetching Tab3 records:", error);
        res.status(500).json({ error: "Failed to fetch Tab3 records" });
    }
};
// GET API - by id 
export const getTab3ById = async (req, res) => {
    const { id } = req.params;
    try {
        const tab3 = await Tab3.findOne({
            where: { id }
        });
        if (!tab3) {
            return res.status(404).json({ error: "Tab3 not found" });
        }
        console.log(tab3);
        const baseUrl = "http://localhost:4000/uploads/";
        const tab3WithUrl = {
            ...tab3.toJSON(),
            image: `${baseUrl}${tab3.dataValues.image}`
        };
        res.status(200).json(tab3WithUrl);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch tab3" });
    }
};
// Patch API - Update image if provided
export const updateTab3 = async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const image = req.file?.filename; // Get the new image if uploaded
        const tab3 = await Tab3.findByPk(id);
        if (!tab3)
            return res.status(404).json({ message: "Tab3 not found" });
        // Update fields only if new data is provided
        const updatedData = {};
        if (description)
            updatedData.description = description;
        if (image)
            updatedData.image = image; // Only update the image if a new file is uploaded
        await tab3.update(updatedData);
        res.status(200).json(tab3);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update tab3" });
    }
};
// Delete API
export const deleteTab3 = async (req, res) => {
    try {
        const { id } = req.params;
        const tab3 = await Tab3.findByPk(id);
        if (!tab3)
            return res.status(404).json({ message: "Tab3 not found" });
        await tab3.destroy();
        res.status(200).json({ message: "Tab3 deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete tab3" });
    }
};
