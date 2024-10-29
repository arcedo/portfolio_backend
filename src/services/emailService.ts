import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(from: string, to: string, subject: string, body: string) {
  try {
    const response = await resend.emails.send({
      from: from,
      to: [to],
      subject: subject,
      html: body,
    });

    if (response.error) {
      return { error: response.error };
    }
    return { data: response.data };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Could not send email');
  }
};
