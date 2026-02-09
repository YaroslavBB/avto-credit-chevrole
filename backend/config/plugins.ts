export default () => ({
  "strapi-code-editor-custom-field": {
    enabled: true,
  },
  "users-permissions": {
    config: {
      jwtSecret: process.env.JWT_SECRET,
    },
  },
  i18n: {
    config: {
      locales: ["uz", "ru"],
      defaultLocale: "uz",
    },
  },
});
