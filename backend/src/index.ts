import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      const mainPageUid = "api::main-page.main-page" as any;
      const headerUid = "api::header.header" as any;
      const carUid = "api::car.car" as any;

      const existingMainPage = await (strapi.documents(mainPageUid) as { findFirst?: (opts?: { status?: string }) => Promise<unknown | null> }).findFirst?.({});
      if (!existingMainPage) {
        await (strapi.documents(mainPageUid) as { create?: (opts: { data: Record<string, unknown> }) => Promise<unknown> }).create?.({
          data: {
            heroTitle: "Chevrolet в рассрочку",
            heroSubtitle: "Выгодные условия от официального партнёра",
            heroAdvantages: [
              { title: "Рассрочка", subtitle: "Годовая ставка 0%" },
              { title: "Срок", subtitle: "До 5 лет" },
              { title: "Одобрение", subtitle: "Быстрый ответ" },
            ],
            ctaButtonText: "Получить консультацию",
            ctaConsentText: "Принимаю правила обработки данных",
            ctaPhoneErrorText: "Введите корректный номер телефона.",
            ctaConsentErrorText: "Подтвердите согласие на обработку данных.",
            aboutTitle: "О компании",
            aboutText: "Мы — официальный партнёр Chevrolet. Работаем с 9:00 до 20:00 без перерывов и выходных. Будем рады видеть вас в нашем автосалоне.",
            aboutAdvantages: [
              { title: "Официальный дилер" },
              { title: "Гарантия производителя" },
              { title: "Сервисное обслуживание" },
              { title: "Трейд-ин" },
            ],
            address: "г. Самарканд, массив Чупон-ота, дом 50А",
            workHours: "9:00 – 20:00, без выходных",
            phones: [{ value: "+998 55 520 52 22" }],
            socialLinks: [],
            logoSubtitle: "Официальный дилер",
            ctaBottomTitle: "Свяжитесь с нами для консультации",
            ctaBottomSubtitle: "Всегда на связи и готовы рассказать, как оформить автомобиль в рассрочку.",
            footerDisclaimer:
              "*Сведения о ценах на продукцию бренда CHEVROLET, содержащиеся на сайте, носят исключительно информационный характер. Указанные цены могут отличаться от действительных цен дилеров CHEVROLET. Для получения подробной информации об актуальных ценах на продукцию CHEVROLET обращайтесь к дилерам CHEVROLET. Приобретение любой продукции бренда CHEVROLET осуществляется в соответствии с условиями индивидуального договора купли-продажи. Представленные изображения автомобиля могут отличаться от реализуемого.",
          },
        });
        strapi.log.info("Seed: main-page created");
      }

      const existingHeader = await (strapi.documents(headerUid) as { findFirst?: (opts?: { status?: string }) => Promise<unknown | null> }).findFirst?.({});
      if (!existingHeader) {
        await (strapi.documents(headerUid) as { create?: (opts: { data: Record<string, unknown> }) => Promise<unknown> }).create?.({
          data: {
            companyName: "Chevrolet",
            docTitle: "Инструкция к онлайн контракту",
            ctaLabel: "Позвоните нам",
            ctaPhone: "+998 55 520 52 22",
          },
        });
        strapi.log.info("Seed: header created");
      }

      const carCount = await (strapi.documents(carUid) as { count?: (opts?: object) => Promise<number> }).count?.({}) ?? 0;
      if (carCount === 0) {
        const carService = strapi.documents(carUid) as { create?: (opts: { data: Record<string, unknown> }) => Promise<unknown> };
        const mockCars = [
          {
            title: "Chevrolet Onix",
            shortDescription: "Городской седан с отличной экономией топлива",
            discountAmount: 15000000,
            price: 185000000,
            discountedPrice: 170000000,
            advantages: [
              { title: "Экономичный", text: "Низкий расход топлива" },
              { title: "Компактный", text: "Удобен для города" },
            ],
            documentLinks: [
              { title: "Условия рассрочки", link: "#" },
              { title: "Список документов", link: "#" },
            ],
            order: 1,
            publishedAt: new Date(),
          },
          {
            title: "Chevrolet Tracker",
            shortDescription: "Практичный кроссовер для города и трассы",
            discountAmount: 20000000,
            price: 265000000,
            discountedPrice: 245000000,
            advantages: [
              { title: "SUV", text: "Повышенный клиренс" },
              { title: "Безопасность", text: "Надёжные системы ассистентов" },
            ],
            documentLinks: [
              { title: "Пакет документов", link: "#" },
            ],
            order: 2,
            publishedAt: new Date(),
          },
        ];
        for (const data of mockCars) {
          await carService.create?.({ data });
        }
        strapi.log.info("Seed: mock cars created");
      }
    } catch (e) {
      strapi.log.warn("Seed skipped:", (e as Error).message);
    }
  },
};
