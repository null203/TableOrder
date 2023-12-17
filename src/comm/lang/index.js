
/**
 * Created by hanshaojie-pc on 2020/2/13.
 */
//国际化
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { Locale } from 'vant';
import CommLangEn from './commLang/en-US';
import CommLangZh from './commLang/zh-CN';
import enUS from 'vant/lib/locale/lang/en-US';
import zhCN from 'vant/lib/locale/lang/zh-CN';
Vue.use(VueI18n);
Vue.locale = () => {};
const i18n = new VueI18n({
  locale: modulePath.getLanguage(),  // en 英文 zh中文
  messages:{
    en:{
      ...CommLangEn,
      ...enUS
    },
    zh:{
      ...CommLangZh,
      ...zhCN
    }
  }
});

if(modulePath.getLanguage() === "en"){
  Locale.use('en-US', enUS);
}else{
  Locale.use('zh-CN', zhCN);
}

export {VueI18n,CommLangEn,CommLangZh,i18n};



