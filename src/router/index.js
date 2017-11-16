import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login';
import Signup from '@/views/Signup';
import PasswordReset from '@/views/Password-Reset';
import NotFound from '@/views/Not-Found';
import Dashboard from '@/views/Dashboard';
import Buckets from '@/views/Buckets';
import BucketList from '@/views/Buckets/Bucket-List';
import CreateBucket from '@/views/Buckets/Create-Bucket';
// import BucketSettings from '@/views/Buckets/Bucket-Settings';
import BucketFiles from '@/views/Buckets/Bucket-Files';
import Support from '@/views/Support';
import Billing from '@/views/Billing';
import Referrals from '@/views/Referrals';
import { lStorage } from '@/utils';
// import analytics from '@/vendors/analytics';

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
      redirect: '/dashboard/billing',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
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
            // NB: No settings until updateBucketById is added to storj.js
            // {
            //   path: ':bucketId/settings',
            //   name: 'Bucket Settings',
            //   component: BucketSettings
            // },
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

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const privateKey = lStorage.retrieve('privateKey');

    if (!privateKey) {
      return next({ path: '/login' });
    }

    next();
  } else {
    next();
  }
});

export default router;
