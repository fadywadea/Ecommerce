"use strict";

import nodemailer from "nodemailer";
import { emailTemplate } from "./emailTemplate.js";
import jwt from "jsonwebtoken";

export const sendEmail = async (email, name) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let token = jwt.sign({ email }, process.env.JWT_KEY);

  const info = await transporter.sendMail({
    from: `"E-commerce" <${process.env.EMAIL_ADDRESS}>`,
    to: email,
    subject: "Hello ✔",
    html: emailTemplate(token, name),
  });

  console.log("Message sent: %s", info.messageId);
};
