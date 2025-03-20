import attributes from '@/locales/ja/attributes.json';
import zod from '@/locales/ja/zod.json';
import i18next from 'i18next';
import { z } from 'zod';
import { makeZodI18nMap } from 'zod-i18n-map';

// バリデーションメッセージを日本語化
i18next.init({
  lng: 'ja',
  resources: {
    ja: {
      zod: zod,
      attributes: attributes,
    },
  },
});

z.setErrorMap(makeZodI18nMap({ ns: ['zod', 'attributes'] }));
