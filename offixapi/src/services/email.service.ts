import {bind, BindingScope} from '@loopback/core';
import {createTransport} from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import {environment} from '../environments/environment.dev';
import {EmailTemplate, User} from '../models';

@bind({scope: BindingScope.TRANSIENT})
export class EmailService {
  /**
   * If using gmail see https://nodemailer.com/usage/using-gmail/
   */
  private static async setupTransporter() {
    return createTransport({
      host: environment.host,
      port: environment.port,
      secure: environment.secure, // upgrade later with STARTTLS
      auth: {
        user: environment.user,
        pass: environment.pass,
      },
    });
  }
  async sendResetPasswordMail(
    user: User,
    htmlTemplate: string,
    subject: string,
  ): Promise<SMTPTransport.SentMessageInfo> {
    const transporter = await EmailService.setupTransporter();

    const emailTemplate = new EmailTemplate({
      to: user.email,
      subject: subject,
      html: htmlTemplate,
    });
    return transporter.sendMail(emailTemplate);
  }

  async sendContactMessage(
    htmlTemplate: string,
    subject: string,
  ): Promise<SMTPTransport.SentMessageInfo> {
    const transporter = await EmailService.setupTransporter();
    const emailTemplate = new EmailTemplate({
      to: environment.user,
      subject: subject,
      html: htmlTemplate,
    });
    return transporter.sendMail(emailTemplate);
  }
}
