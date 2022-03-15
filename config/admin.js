module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '293c5de0d140441ac3530b8b1aefc550'),
  },
});
