const { createTransport } = require('nodemailer');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;

class MailerError extends Error {
  constructor(code = 500, ...params) {
    super(...params);
    if (Error.captureStackTrace) Error.captureStackTrace(this, MailerError);
    this.code = code;
  }
}

const {
  EMAIL_CLIENT_ID,
  EMAIL_CLIENT_SECRET,
  EMAIL_REFRESH_TOKEN,
  EMAIL_SENDER,
} = process.env;

const sendEmail = async (req, res) => {
  try {
    if (req.method !== 'POST') throw new MailerError(405, 'Method not allowed');

    const recipient = EMAIL_SENDER; // We want to prevent someone from sending mails to random addresses
    const sender = EMAIL_SENDER; // We want to prevent someone from sending mails to random addresses

    const { subject, text, html } = await req.body;

    if (!recipient) throw new MailerError(500, 'Missing recipient');
    if (!sender) throw new MailerError(500, 'Missing sender');
    if (!subject) throw new MailerError(500, 'Missing subject');
    if (!text && !html) throw new MailerError(500, 'Missing email body');

    const oauth2 = new OAuth2(
      EMAIL_CLIENT_ID,
      EMAIL_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground'
    );

    oauth2.setCredentials({
      refresh_token: EMAIL_REFRESH_TOKEN,
    });

    const accessToken = oauth2.getAccessToken();

    const transport = createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: EMAIL_SENDER,
        clientId: EMAIL_CLIENT_ID,
        clientSecret: EMAIL_CLIENT_SECRET,
        refreshToken: EMAIL_REFRESH_TOKEN,
        accessToken,
      },
    });

    await new Promise((resolve) =>
      transport.sendMail(
        {
          from: sender,
          to: recipient,
          subject,
          text,
          html,
        },
        (err, info) => {
          if (err) {
            throw err;
          }
          resolve(info);
        }
      )
    );

    res.status(200).json({ code: 200, message: 'SENT' });
  } catch (err) {
    err instanceof MailerError
      ? res.status(500).json({ code: err.code, message: err.message })
      : res.status(500).json({ code: 500, message: err.message });
  }
};

module.exports = sendEmail;
