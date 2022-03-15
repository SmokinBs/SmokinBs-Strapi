module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        service: "gmail",
        auth: {
          user: env("SMTP_USERNAME"),
          pass: env("SMTP_PASSWORD"),
          clientId: env("GOOGLE_CLIENT_ID"),
          clientSecret: env("GOOGLE_SECRET"),
          refreshToken: env("GOOGLE_REFRESH_TOKEN"),
        },
      },
      settings: {
        defaultFrom: "smokinbsinvoice@gmail.com",
        defaultReplyTo: "smokinbsinvoice@gmail.com",
      },
    },
  },
  email: {
    config: {
      provider: "sendgrid",
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
      settings: {
        defaultFrom: "smokinbsinvoice@gmail.com",
        defaultReplyTo: "smokinbsinvoice@gmail.com",
      },
    },
  },
});
