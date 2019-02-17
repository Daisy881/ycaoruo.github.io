export default {
	path: '/test',
	name: 'test',
	component: () => import('@/views/test'),
  meta: {
    requireAuth: false
  }
}