export const TestConfig = {
  routers: [
    {
      path: '1',
      name: 'Test01',
      component: () => import('@/views/test/pages/1/index.vue'),
    },
  ],
}
