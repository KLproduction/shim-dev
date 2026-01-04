import { Resend } from "resend";
import { db } from "./db";
import type { ContactFormValues } from "../type";

const resend = new Resend(process.env.RESEND_API_KEY);

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_PRODUCTION_URL
    : process.env.NEXT_PUBLIC_SERVER_URL;

export const sendVerificationEmail = async (
  email: string,
  _token: string,
  _userId?: string,
) => {
  await resend.emails.send({
    from: "mail@shimgsolution.com",
    to: email,
    subject: "We received your inquiry",
    html: `<head>
        <style>
            body {
                background-color: #f4f4f4;
                font-family: Arial, sans-serif;
                line-height: 1.6;
                padding: 20px;
            }
            .container {
                background-color: #ffffff;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .button {
                display: block;
                width: 200px;
                margin: 20px auto;
                padding: 10px;
                text-align: center;
                color: #333;
                text-decoration: none;
                border-radius: 5px;
            }
            .footer {
                text-align: center;
                font-size: 12px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Thanks for reaching out</h2>
            <p>We have received your inquiry, and our team is looking into it.</p>
            <p>We will get back to you within 48 hours.</p>
            <p class="footer">Thank you!<br>Shimg Solutions Team</p>
        </div>
    </body>`,
  });
};

export const sendContactLeadEmail = async (
  payload: ContactFormValues,
) => {
  await resend.emails.send({
    from: "mail@shimgsolution.com",
    to: "kent.law.production01@gmail.com",
    subject: "New contact request",
    html: `<head>
        <style>
            body {
                background-color: #f4f4f4;
                font-family: Arial, sans-serif;
                line-height: 1.6;
                padding: 20px;
            }
            .container {
                background-color: #ffffff;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .label {
                font-weight: bold;
                color: #333;
            }
            .footer {
                text-align: center;
                font-size: 12px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>New Contact Request</h2>
            <p><span class="label">Name:</span> ${payload.name}</p>
            <p><span class="label">Email:</span> ${payload.email}</p>
            <p><span class="label">Company:</span> ${payload.company || "N/A"}</p>
            <p><span class="label">Message:</span></p>
            <p>${payload.message}</p>
            <p class="footer">Shimg Solutions Team</p>
        </div>
    </body>`,
  });
};
