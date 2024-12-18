const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service (e.g., Gmail, Outlook, etc.)
    auth: {
        user: 'your-email@gmail.com', // Replace with your email
        pass: 'your-email-password', // Replace with your email password or app password
    },
});

app.post('/api/send-email', async (req, res) => {
    const { to, subject, text } = req.body;

    try {
        const mailOptions = {
            from: 'your-email@gmail.com', // Sender's email
            to, // Recipient's email
            subject,
            text,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
