import nodemailer from "nodemailer";

// Function to send an email with a flyer attachment
export const tab1FormMail = async (recipientEmail: string, merchantName: string, flyerImageUrl: string) => {
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
                <h3>Dear ${merchantName},</h3>
                <p>Thank you for submitting your details.</p>
                <p>Your flyer has been successfully sent to your email address.</p>
                <p><strong>Flyer Preview:</strong></p>
                <img src="${flyerImageUrl}" alt="Flyer Image" style="width:300px; height:auto;"/>
                <p>Best Regards,<br>Your Company Name</p>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
        return { success: true, message: "Flyer sent successfully." };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, message: "Failed to send flyer." };
    }
};
