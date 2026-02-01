export default () => ({
  "strapi-code-editor-custom-field": {
    enabled: true,
  },
  "users-permissions": {
    config: {
      jwtSecret: process.env.JWT_SECRET,
    },
  },
});
