const { createTransport } = require("nodemailer");

const {
  EMAIL_PROVIDER = "Gmail",
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
  EMAIL_SENDER,
} = process.env;

class MailerError extends Error {
  constructor(code = 500, ...params) {
    super(...params);
    if (Error.captureStackTrace) Error.captureStackTrace(this, MailerError);
    this.code = code;
  }
}

const transport = createTransport({
  service: EMAIL_PROVIDER,
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD,
  },
});

const send = (options) =>
  new Promise((resolve) =>
    transport.sendMail(options, (err, info) => {
      if (err) {
        throw err;
      }
      resolve(info);
    })
  );

const sendEmail = async (req, res) => {
  try {
    if (req.method !== "POST") throw new MailerError(405, "Method not allowed");

    const recipient = EMAIL_SENDER; // We want to prevent someone from sending mails to random addresses
    const sender = EMAIL_SENDER; // We want to prevent someone from sending mails to random addresses

    const { subject, text, html } = await req.body;

    if (!a) throw new MailerError(500, "Missing recipient");
    if (!sender) throw new MailerError(500, "Missing sender");
    if (!subject) throw new MailerError(500, "Missing subject");
    if (!text && !html) throw new MailerError(500, "Missing email body");

    const data = await send({
      from: sender,
      to: recipient,
      subject,
      text,
      html,
    });

    res.status(200).json({ code: 200, message: "SENT", data });
  } catch (err) {
    err instanceof MailerError
      ? res.status(200).json({ code: err.code, message: err.message })
      : res.status(500).json({ code: 500, message: err.message });
  }
};

module.exports = sendEmail;
