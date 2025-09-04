import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    // Log the environment variables to check if they are loaded
    console.log("--- SMTP Configuration ---");
    console.log("SMTP_HOST:", process.env.SMTP_HOST);
    console.log("SMTP_PORT:", process.env.SMTP_PORT);
    console.log("--------------------------");

    const body = await request.json();
    const { name, email, phone, checkin, checkout, guests, hotelName, address, price, link } = body;
    console.log("Received booking enquiry:", body);

    // console.log(hotel.maxRate, "minPrice", hotel.minPrice, "maxPrice");
    // Create a transporter object using the credentials from .env
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: `"Hotel Booking Enquiry" <${process.env.SMTP_FROM_EMAIL}>`,
      to: ['purificationevan04@gmail.com', 'info@trotamundo9.com', 'sojib0321@gmail.com'],
      // to: ['purificationevan04@gmail.com'],
      subject: `New Hotel Booking Enquiry for ${hotelName}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #007bff; color: #ffffff; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">New Hotel Booking Enquiry</h1>
          </div>
          <div style="padding: 20px;">
            <h2 style="font-size: 20px; color: #007bff; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px; margin-bottom: 20px;">Booking Details</h2>
            <div style="margin-bottom: 15px;">
              <p style="margin: 0;"><strong>Hotel:</strong> ${hotelName}</p>
            </div>
            <div style="margin-bottom: 15px;">
              <p style="margin: 0;"><strong>Address:</strong> ${address}</p>
            </div>
            <div style="margin-bottom: 15px;">
              <p style="margin: 0;"><strong>Check-in:</strong> ${checkin}</p>
            </div>
            <div style="margin-bottom: 15px;">
              <p style="margin: 0;"><strong>Check-out:</strong> ${checkout}</p>
            </div>
            <div style="margin-bottom: 20px;">
              <p style="margin: 0;"><strong>Guests:</strong> ${guests}</p>
            </div>
            <div style="margin-bottom: 20px;">
              <p style="margin: 0;"><strong>Price:</strong> ${price}</p>
            </div>
            <div style="margin-bottom: 20px;">
              <p style="margin: 0;"><strong>More Details:</strong> ${link}</p>
            </div>
            
            <hr style="border: none; border-top: 2px solid #e0e0e0; margin: 20px 0;">
            
            <h2 style="font-size: 20px; color: #007bff; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px; margin-bottom: 20px;">Customer Details</h2>
            <div style="margin-bottom: 15px;">
              <p style="margin: 0;"><strong>Name:</strong> ${name}</p>
            </div>
            <div style="margin-bottom: 15px;">
              <p style="margin: 0;"><strong>Email:</strong> ${email}</p>
            </div>
            <div>
              <p style="margin: 0;"><strong>Phone:</strong> ${phone}</p>
            </div>
          </div>
          <div style="background-color: #f8f9fa; color: #6c757d; padding: 15px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">This is an automated notification. Please do not reply directly to this email.</p>
          </div>
        </div>
      `,
    };

    // Send mail
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Enquiry sent successfully' });

  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json({ error: 'Failed to send enquiry' }, { status: 500 });
  }
}
