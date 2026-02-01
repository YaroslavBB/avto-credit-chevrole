import type { Schema, Struct } from '@strapi/strapi';

export interface SharedAboutAdvantage extends Struct.ComponentSchema {
  collectionName: 'components_shared_about_advantages';
  info: {
    description: '\u041F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u043E \u0432 \u0431\u043B\u043E\u043A\u0435 \u041E \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438: \u0442\u043E\u043B\u044C\u043A\u043E \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A';
    displayName: 'About Advantage';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedAdvantage extends Struct.ComponentSchema {
  collectionName: 'components_shared_advantages';
  info: {
    description: '\u041F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u043E: \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u0438 \u0442\u0435\u043A\u0441\u0442';
    displayName: 'Advantage';
  };
  attributes: {
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedCtaButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_cta_buttons';
  info: {
    description: '\u041A\u043D\u043E\u043F\u043A\u0430 \u0441 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435\u043C \u0438 \u0441\u0441\u044B\u043B\u043A\u043E\u0439';
    displayName: 'CTA Button';
  };
  attributes: {
    link: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedDocumentLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_document_links';
  info: {
    description: '\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442';
    displayName: 'Document Link';
  };
  attributes: {
    link: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedHeroAdvantage extends Struct.ComponentSchema {
  collectionName: 'components_shared_hero_advantages';
  info: {
    description: '\u041F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u043E \u0432 hero: \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u0438 \u043F\u043E\u0434\u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A';
    displayName: 'Hero Advantage';
  };
  attributes: {
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedPhone extends Struct.ComponentSchema {
  collectionName: 'components_shared_phones';
  info: {
    description: '\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430 \u0434\u043B\u044F \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043E\u0432';
    displayName: 'Phone';
  };
  attributes: {
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    description: '\u0421\u043E\u0446\u0441\u0435\u0442\u044C: \u0438\u043A\u043E\u043D\u043A\u0430, \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435, \u0441\u0441\u044B\u043B\u043A\u0430';
    displayName: 'Social Link';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.about-advantage': SharedAboutAdvantage;
      'shared.advantage': SharedAdvantage;
      'shared.cta-button': SharedCtaButton;
      'shared.document-link': SharedDocumentLink;
      'shared.hero-advantage': SharedHeroAdvantage;
      'shared.phone': SharedPhone;
      'shared.social-link': SharedSocialLink;
    }
  }
}
