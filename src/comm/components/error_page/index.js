export const Error = [
  {
    path: '*',
    name: 'error_404',
    meta: {
      title: '404-'+i18n.t('notFound')
    },
    component: (resolve) => require(['./404.vue'], resolve)
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      title: '401-'+i18n.t('notPermission')
    },
    component: (resolve) => require(['./401.vue'], resolve)
  },
];

