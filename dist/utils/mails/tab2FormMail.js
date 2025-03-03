import nodemailer from "nodemailer";
// Function to send an email with a flyer attachment
export const tab2FormMail = async (recipientEmail, merchantName, flyerImageUrl, action) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail", // Use your SMTP service
            auth: {
                user: "muhammad2133730@gmail.com", // Replace with your email
                pass: "jaty bgsj tjxd qszf", // Use an App Password if using Gmail
            },
        });
        const mailOptions = {
            from: "muhammad2133730@gmail.com",
            to: recipientEmail,
            subject: "Getpie Flyer",
            html: `
            ${action === 'action1' ? 'action 1' : 'action2'}   
            `,
        };
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
        return { success: true, message: "Flyer sent successfully." };
    }
    catch (error) {
        console.error("Error sending email:", error);
        return { success: false, message: "Failed to send flyer." };
    }
};
