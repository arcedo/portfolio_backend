import type { Request, Response } from 'express';
import { sendEmail } from '@src/services/emailService';
import type { Message } from '@src/types/Message.type';

async function sendEmailWrapper(from: string, to: string, subject: string, body: string) {
  const response = await sendEmail(from, to, subject, body);
  if (response.error) {
    throw new Error(response.error.message);
  }
}

export async function sendMessage(req: Request, res: Response): Promise<void> {
  const message: Message = req.body;
  try {
    // email to yourself
    await sendEmailWrapper(
      `${message.sender} <noreply@${process.env.PUBLIC_DOMAIN}>`,
      String(process.env.PUBLIC_EMAIL),
      `${message.subject} - ${new Date().toLocaleDateString('en-GB')}`,
      `${message.email}<br><br>
      ${message.body}`
    );

    // email to the sender
    await sendEmailWrapper(
      `${process.env.PUBLIC_NAME} <noreply@${process.env.PUBLIC_DOMAIN}>`,
      message.email,
      `${String(process.env.PUBLIC_NAME)} - ${new Date().toLocaleDateString('en-GB')}`,
      `Hi ${message.sender},<br><br>
      Thank you for reaching out! Your message has been successfully sent, and I'll get back to you shortly.<br><br>
      Best regards,<br>
      ${process.env.PUBLIC_NAME}<br><br>
      <strong>Your message:</strong><br>
      <p><strong>Subject:</strong> ${message.subject}</p><br>
      <p><strong>Body:</strong><br>${message.body}</p><br><br>
      <p style="color:gray; font-size:0.9em;">
      Please do not reply directly to this message. Instead, feel free to contact me at <a href="mailto:arcedo.marc@gmail.com">arcedo.marc@gmail.com</a>.
      </p>`
    );

    res.status(201).json({ message: 'Messages sent successfully!' });
    
  } catch (error) {
    console.error('Error in sendMessage:', error);
    const errorMessage = (error as Error).message || 'Could not send email';
    res.status(500).json({ message: errorMessage });
  }
}
