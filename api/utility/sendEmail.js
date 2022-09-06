import nodemailer from 'nodemailer';
//create email
export const sendEmail = async (to, subject, text) => {
    try {
        let transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
              user: "developersufian.me@gmail.com",
              pass: "jawylcthurirtblk"
            }
          });
          await transport.sendMail({
            from : 'sufian.jnu@gmail.com',
            to  : to,
            subject : subject,
            text : text
          });
    } catch (error) {
        console.log(error);
    }
}