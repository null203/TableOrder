import Vue from 'vue'
import {VueI18n,CommLangZh,CommLangEn} from '../index'
import EN from './en-US';
import ZH from './zh-CN';
Vue.use(VueI18n);
Vue.locale = () => {};
const i18n = new VueI18n({
  locale: modulePath.getLanguage(),  // en 英文 zh中文
  messages:{
    en:{
      ...CommLangEn,
      ...EN ,
    },
    zh:{
      ...CommLangZh,
      ...ZH ,
    }
  }
});
export default i18n;
