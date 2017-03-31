import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login';
import Signup from '@/views/Signup';
import PasswordReset from '@/views/Password-Reset';
import NotFound from '@/views/Not-Found';
import Dashboard from '@/views/Dashboard';
import Buckets from '@/views/Buckets';
import BucketList from '@/views/Bucket-List';
import CreateBucket from '@/views/Create-Bucket';
import BucketSettings from '@/views/Bucket-Settings';
import BucketFiles from '@/views/Bucket-Files';
import Support from '@/views/Support';
import Billing from '@/views/Billing';
import Referrals from '@/views/Referrals';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    /* Open Authentication Routes */
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/password-reset',
      name: 'Password-Reset',
      component: PasswordReset
    },
    /* Dashboard - requires authenticated user */
    {
      path: '/dashboard',
      redirect: '/dashboard/buckets',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'buckets',
          component: Buckets,
          children: [
            {
              // root bucket path
              path: '/',
              name: 'Buckets',
              component: BucketList
            },
            {
              path: 'create',
              name: 'Create Bucket',
              component: CreateBucket
            },
            {
              path: ':bucketId/settings',
              name: 'Bucket Settings',
              component: BucketSettings
            },
            {
              path: ':bucketId/files',
              name: 'Bucket Files',
              component: BucketFiles
            }
          ]
        },
        {
          path: 'support',
          name: 'Support',
          component: Support
        },
        {
          path: 'billing',
          name: 'Billing',
          component: Billing
        },
        {
          path: 'referrals',
          name: 'Referrals',
          component: Referrals
        }
      ]
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/not-found',
      name: 'Not-Found',
      component: NotFound
    },
    {
      path: '*',
      redirect: '/not-found'
    }
  ]
});

export default router;
