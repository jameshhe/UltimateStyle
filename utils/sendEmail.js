import nodemailer from 'nodemailer';

const sendEmail = async options => {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    console.log(`${process.env.SMTP_EMAIL}`);

    // send mail with defined transport object
    const message = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`, // sender address
        to: options.email, // list of receivers
        subject: options.subject, // Subject line
        text: options.message, // plain text body
        html: `<h1> Uh-Oh! You've forgotten your Password! </h1>
        <p>Don't worry, we got you covered! </p>
        <a href=localhost:3000/changePassword/${options.token}> Linke </a>`,
    };

    const info = await transporter.sendMail(message);

    console.log('Message sent: %s', info.messageId);
};

export default sendEmail;
