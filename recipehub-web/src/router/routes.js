
const routes = [
  {
    path: '/',
    redirect: '/recipes'
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },
  {
    path: '/recipes',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', props: false, component: () => import('src/pages/Recipes.vue') },
      { path: 'new', props: true, component: () => import('src/pages/CreateRecipe.vue') },
      { path: ':id', props: true, component: () => import('src/pages/Recipe.vue') },
      { path: ':id/edit', props: true, component: () => import('src/pages/EditRecipe.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      { path: '', props: false, component: () => import('src/pages/Login.vue') }
    ]
  }
]

export default routes
