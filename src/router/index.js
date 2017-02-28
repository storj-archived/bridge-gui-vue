import Vue from 'vue';
import Router from 'vue-router';
// import Hello from '@/components/Hello'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    // Open Routes
    { path: '/', component: LoginForm },
    { path: '/signup', component: SignupForm },
    { path: '/signup-success', component: SignupSuccess },
    { path: '/password-reset', component: PasswordReset },
    // Routes requiring login
    { path: '/dashboard',
      component: Dashboard,
      children: [
        {
          path: 'buckets',
          component: Buckets
        },
        {
          path: 'buckets/new',
          component: NewBucket
        },
        {
          path: 'buckets/:bucketId/edit',
          component: EditBucket
        },
        {
          path: 'bucket/:bucketId/files',
          component: FileBucket
        },
        {
          path: 'api-docs',
          component: ApiDocs
        },
        {
          path: 'support',
          component: Support
        },
        {
          path: 'billing',
          component: Billing
        }
      ]
    },
    // Redirect routes
    { path: '*', component: NotFound }
  ]
});

export default router;
